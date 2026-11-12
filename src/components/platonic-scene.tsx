import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { memo, useEffect, useMemo } from "react";
import * as THREE from "three";
import {
  dualOf,
  geometryForEdges,
  geometryForFaces,
  SOLIDS,
  type PolyhedronData,
} from "../lib/platonic";
import type { SceneProps } from "./deferred-scene";

type DisplayMode = "solid" | "glass" | "wire";

// Measure unscaled layout dimensions: #root's wide-screen CSS zoom otherwise
// feeds scaled bounds back into Canvas and repeatedly enlarges its render surface.
const canvasResize = { offsetSize: true };

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
};

const Polyhedron = memo(function Polyhedron({
  data,
  showFaces = true,
  showEdges = true,
  showVertices = true,
  mode = "solid",
  color = data.color,
  faceOpacity,
  edgeOpacity = 1,
  vertexOpacity = 1,
}: PolyhedronProps) {
  const faceGeometry = useMemo(() => geometryForFaces(data), [data]);
  const edgeGeometry = useMemo(() => geometryForEdges(data), [data]);
  const vertexGeometry = useMemo(() => new THREE.SphereGeometry(1, 12, 12), []);
  const vertexMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#fff8df", transparent: true, opacity: vertexOpacity, emissive: color, emissiveIntensity: 0.22 }), [color, vertexOpacity]);
  useEffect(() => () => { faceGeometry.dispose(); edgeGeometry.dispose(); }, [faceGeometry, edgeGeometry]);
  useEffect(() => () => vertexGeometry.dispose(), [vertexGeometry]);
  useEffect(() => () => vertexMaterial.dispose(), [vertexMaterial]);
  const opacity = faceOpacity ?? (mode === "glass" ? 0.2 : mode === "wire" ? 0 : 0.76);

  return (
    <group>
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
          <mesh key={index} position={vertex} scale={0.085} geometry={vertexGeometry} material={vertexMaterial} dispose={null} />
        ))}
    </group>
  );
});

function ResumeFrame({ active }: { active: boolean }) {
  const invalidate = useThree(state => state.invalidate);
  useEffect(() => { if (active) invalidate(); }, [active, invalidate]);
  return null;
}

function Rig({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ambientLight intensity={0.58} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#d9fff8" />
      <pointLight position={[-4, -1, 2]} intensity={18} color="#6559ff" distance={10} />
      <pointLight position={[3, -2, -3]} intensity={10} color="#ffbd66" distance={9} />
      {children}
      <ContactShadows frames={1} position={[0, -2.05, 0]} opacity={0.22} scale={8} blur={2.8} far={4} color="#020817" />
    </>
  );
}

export function SolidCanvas({
  data,
  mode,
  showFaces,
  showEdges,
  showVertices,
  active,
}: {
  data: PolyhedronData;
  mode: DisplayMode;
  showFaces: boolean;
  showEdges: boolean;
  showVertices: boolean;
  active: boolean;
}) {
  return (
    <Canvas frameloop={active ? "demand" : "never"} resize={canvasResize} dpr={[1, 1.5]} camera={{ position: [0, 0.15, 5.4], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ResumeFrame active={active} />
      <Rig>
        <Polyhedron key={data.key} data={data} mode={mode} showFaces={showFaces} showEdges={showEdges} showVertices={showVertices} />
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
      <cylinderGeometry args={[0.018, 0.018, length, 6]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

function DualConstruction({ source, progress }: { source: PolyhedronData; progress: number }) {
  const dual = useMemo(() => dualOf(source), [source]);
  const vertexGeometry = useMemo(() => new THREE.SphereGeometry(1, 12, 12), []);
  const vertexMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffd178", emissive: "#f2a93d", emissiveIntensity: 0.75 }), []);
  useEffect(() => () => { vertexGeometry.dispose(); vertexMaterial.dispose(); }, [vertexGeometry, vertexMaterial]);
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
          <mesh key={index} position={vertex} scale={0.115 * local} geometry={vertexGeometry} material={vertexMaterial} dispose={null} />
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

export function DualCanvas({ source, progress, active }: { source: PolyhedronData; progress: number; active: boolean }) {
  return (
    <Canvas frameloop={active ? "demand" : "never"} resize={canvasResize} dpr={[1, 1.5]} camera={{ position: [0, 0.1, 5.5], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ResumeFrame active={active} />
      <Rig>
        <DualConstruction source={source} progress={progress} />
      </Rig>
      <OrbitControls makeDefault enableDamping dampingFactor={0.06} minDistance={3.2} maxDistance={8} enablePan={false} />
    </Canvas>
  );
}

export default function SceneCanvas({ kind, solidKey, active, mode = "solid", showFaces = true, showEdges = true, showVertices = true, progress = 0 }: SceneProps) {
  return kind === "solid"
    ? <SolidCanvas data={SOLIDS[solidKey]} mode={mode} showFaces={showFaces} showEdges={showEdges} showVertices={showVertices} active={active} />
    : <DualCanvas source={SOLIDS[solidKey]} progress={progress} active={active} />;
}
