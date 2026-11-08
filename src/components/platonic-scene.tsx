import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  dualOf,
  geometryForEdges,
  geometryForFaces,
  type PolyhedronData,
} from "../lib/platonic";

type DisplayMode = "solid" | "glass" | "wire";

type PolyhedronProps = {
  data: PolyhedronData;
  showFaces?: boolean;
  showEdges?: boolean;
  showVertices?: boolean;
  mode?: DisplayMode;
  color?: string;
  faceOpacity?: number;
  edgeOpacity?: number;
  vertexOpacity?: number;
  animateIn?: boolean;
};

function Polyhedron({
  data,
  showFaces = true,
  showEdges = true,
  showVertices = true,
  mode = "solid",
  color = data.color,
  faceOpacity,
  edgeOpacity = 1,
  vertexOpacity = 1,
  animateIn = false,
}: PolyhedronProps) {
  const group = useRef<THREE.Group>(null);
  const faceGeometry = useMemo(() => geometryForFaces(data), [data]);
  const edgeGeometry = useMemo(() => geometryForEdges(data), [data]);
  const opacity = faceOpacity ?? (mode === "glass" ? 0.2 : mode === "wire" ? 0 : 0.76);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (animateIn) {
      const target = 1;
      const next = THREE.MathUtils.damp(group.current.scale.x, target, 7, delta);
      group.current.scale.setScalar(next);
    }
  });

  return (
    <group ref={group} scale={animateIn ? 0.72 : 1}>
      {showFaces && opacity > 0 && (
        <mesh geometry={faceGeometry}>
          <meshPhysicalMaterial
            color={color}
            roughness={0.28}
            metalness={0.08}
            transmission={mode === "glass" ? 0.15 : 0}
            thickness={0.35}
            transparent
            opacity={opacity}
            side={THREE.DoubleSide}
            flatShading
            depthWrite={opacity > 0.45}
          />
        </mesh>
      )}
      {showEdges && edgeOpacity > 0 && (
        <lineSegments geometry={edgeGeometry}>
          <lineBasicMaterial color="#eafdfb" transparent opacity={edgeOpacity} />
        </lineSegments>
      )}
      {showVertices &&
        data.vertices.map((vertex, index) => (
          <mesh key={index} position={vertex} scale={0.085}>
            <sphereGeometry args={[1, 20, 20]} />
            <meshStandardMaterial color="#fff8df" transparent opacity={vertexOpacity} emissive={color} emissiveIntensity={0.22} />
          </mesh>
        ))}
    </group>
  );
}

function FloatingSolid(props: PolyhedronProps) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!group.current) return;
    // The scene stays still until the learner rotates it. This avoids motion
    // that competes with the explanation and keeps the model comfortable to study.
    group.current.rotation.set(0, 0, 0);
  });
  return (
    <group ref={group}>
      <Polyhedron {...props} animateIn />
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ambientLight intensity={0.58} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#d9fff8" />
      <pointLight position={[-4, -1, 2]} intensity={18} color="#6559ff" distance={10} />
      <pointLight position={[3, -2, -3]} intensity={10} color="#ffbd66" distance={9} />
      {children}
      <ContactShadows position={[0, -2.05, 0]} opacity={0.22} scale={8} blur={2.8} far={4} color="#020817" />
      <Stars radius={18} depth={8} count={420} factor={1.4} saturation={0.35} fade speed={0.3} />
    </>
  );
}

export function SolidCanvas({
  data,
  mode,
  showFaces,
  showEdges,
  showVertices,
}: {
  data: PolyhedronData;
  mode: DisplayMode;
  showFaces: boolean;
  showEdges: boolean;
  showVertices: boolean;
}) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.15, 5.4], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <Rig>
        <FloatingSolid key={data.key} data={data} mode={mode} showFaces={showFaces} showEdges={showEdges} showVertices={showVertices} />
      </Rig>
      <OrbitControls makeDefault enableDamping dampingFactor={0.06} minDistance={3.2} maxDistance={8} enablePan={false} />
    </Canvas>
  );
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function GrowingEdge({ a, b, fraction, color }: { a: THREE.Vector3; b: THREE.Vector3; fraction: number; color: string }) {
  const direction = useMemo(() => new THREE.Vector3().subVectors(b, a), [a, b]);
  const length = direction.length();
  const quaternion = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize()),
    [direction],
  );
  const center = a.clone().add(direction.clone().multiplyScalar(fraction / 2));
  if (fraction <= 0.002) return null;
  return (
    <mesh position={center} quaternion={quaternion} scale={[1, fraction, 1]}>
      <cylinderGeometry args={[0.018, 0.018, length, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

function DualConstruction({ source, progress }: { source: PolyhedronData; progress: number }) {
  const dual = useMemo(() => dualOf(source), [source]);
  const faceAlpha = clamp01((progress - 0.74) / 0.23) * 0.68;

  return (
    <group>
      <Polyhedron
        data={source}
        mode="glass"
        showVertices={false}
        faceOpacity={THREE.MathUtils.lerp(0.62, 0.12, progress)}
        edgeOpacity={THREE.MathUtils.lerp(0.9, 0.28, progress)}
      />
      {dual.vertices.map((vertex, index) => {
        const local = clamp01((progress * 1.45 - index / Math.max(1, dual.vertices.length - 1) * 0.32) / 0.32);
        return (
          <mesh key={index} position={vertex} scale={0.115 * local}>
            <sphereGeometry args={[1, 20, 20]} />
            <meshStandardMaterial color="#ffd178" emissive="#f2a93d" emissiveIntensity={0.75} />
          </mesh>
        );
      })}
      {dual.edges.map(([a, b], index) => {
        const start = 0.26 + (index / Math.max(1, dual.edges.length - 1)) * 0.34;
        const fraction = clamp01((progress - start) / 0.2);
        return <GrowingEdge key={`${a}-${b}`} a={dual.vertices[a]} b={dual.vertices[b]} fraction={fraction} color="#ffc85d" />;
      })}
      {faceAlpha > 0 && (
        <Polyhedron data={dual} color="#f5b94f" showVertices={false} showEdges={false} faceOpacity={faceAlpha} />
      )}
    </group>
  );
}

export function DualCanvas({ source, progress }: { source: PolyhedronData; progress: number }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.1, 5.5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <Rig>
        <DualConstruction source={source} progress={progress} />
      </Rig>
      <OrbitControls makeDefault enableDamping dampingFactor={0.06} minDistance={3.2} maxDistance={8} enablePan={false} />
    </Canvas>
  );
}
