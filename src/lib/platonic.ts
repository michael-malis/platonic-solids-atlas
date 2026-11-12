import * as THREE from "three";

import { SOLID_INFO, DUAL_KEY, type SolidInfo, type SolidKey } from "./solid-data";

export type PolyhedronData = SolidInfo & {
  vertices: THREE.Vector3[];
  faces: number[][];
  edges: [number, number][];
};

const PHI = (1 + Math.sqrt(5)) / 2;
const EPS = 1e-5;

function corners(a = 1, b = 1, c = 1) {
  const out: number[][] = [];
  for (const x of [-a, a]) {
    for (const y of [-b, b]) {
      for (const z of [-c, c]) out.push([x, y, z]);
    }
  }
  return out;
}

function normalizeVertices(input: number[][], radius = 1.6) {
  const vectors = input.map(([x, y, z]) => new THREE.Vector3(x, y, z));
  const maxRadius = Math.max(...vectors.map((v) => v.length()));
  return vectors.map((v) => v.multiplyScalar(radius / maxRadius));
}

function computeFaces(vertices: THREE.Vector3[]) {
  const faceSets = new Map<string, { indices: number[]; normal: THREE.Vector3 }>();

  for (let i = 0; i < vertices.length - 2; i += 1) {
    for (let j = i + 1; j < vertices.length - 1; j += 1) {
      for (let k = j + 1; k < vertices.length; k += 1) {
        const normal = new THREE.Vector3()
          .subVectors(vertices[j], vertices[i])
          .cross(new THREE.Vector3().subVectors(vertices[k], vertices[i]));
        if (normal.lengthSq() < EPS) continue;
        normal.normalize();
        const plane = normal.dot(vertices[i]);
        const distances = vertices.map((v) => normal.dot(v) - plane);
        const hasPositive = distances.some((d) => d > EPS);
        const hasNegative = distances.some((d) => d < -EPS);
        if (hasPositive && hasNegative) continue;

        const indices = distances
          .map((d, index) => (Math.abs(d) <= EPS ? index : -1))
          .filter((index) => index >= 0);
        if (indices.length < 3) continue;
        const key = [...indices].sort((a, b) => a - b).join("-");
        if (!faceSets.has(key)) faceSets.set(key, { indices, normal });
      }
    }
  }

  return [...faceSets.values()].map(({ indices, normal }) => {
    const center = indices
      .reduce((sum, index) => sum.add(vertices[index]), new THREE.Vector3())
      .multiplyScalar(1 / indices.length);
    if (normal.dot(center) < 0) normal.negate();
    const u = new THREE.Vector3().subVectors(vertices[indices[0]], center).normalize();
    const v = new THREE.Vector3().crossVectors(normal, u).normalize();
    return [...indices].sort((a, b) => {
      const av = new THREE.Vector3().subVectors(vertices[a], center);
      const bv = new THREE.Vector3().subVectors(vertices[b], center);
      return Math.atan2(av.dot(v), av.dot(u)) - Math.atan2(bv.dot(v), bv.dot(u));
    });
  });
}

function computeEdges(faces: number[][]) {
  const map = new Map<string, [number, number]>();
  faces.forEach((face) => {
    face.forEach((a, index) => {
      const b = face[(index + 1) % face.length];
      const edge: [number, number] = a < b ? [a, b] : [b, a];
      map.set(edge.join("-"), edge);
    });
  });
  return [...map.values()];
}

function makeSolid(key: SolidKey, rawVertices: number[][]): PolyhedronData {
  const vertices = normalizeVertices(rawVertices);
  const faces = computeFaces(vertices);
  return { ...SOLID_INFO[key], vertices, faces, edges: computeEdges(faces) };
}

const tetraVertices = [
  [1, 1, 1],
  [1, -1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
];

const cubeVertices = corners();
const octaVertices = [
  [1, 0, 0], [-1, 0, 0], [0, 1, 0],
  [0, -1, 0], [0, 0, 1], [0, 0, -1],
];

const icosaVertices: number[][] = [];
for (const a of [-1, 1]) {
  for (const b of [-1, 1]) {
    icosaVertices.push([0, a, b * PHI], [a, b * PHI, 0], [b * PHI, 0, a]);
  }
}

const dodecaVertices: number[][] = [...corners()];
for (const a of [-1, 1]) {
  for (const b of [-1, 1]) {
    dodecaVertices.push(
      [0, a / PHI, b * PHI],
      [a / PHI, b * PHI, 0],
      [b * PHI, 0, a / PHI],
    );
  }
}

export const SOLIDS: Record<SolidKey, PolyhedronData> = {
  tetra: makeSolid("tetra", tetraVertices),
  cube: makeSolid("cube", cubeVertices),
  octa: makeSolid("octa", octaVertices),
  dodeca: makeSolid("dodeca", dodecaVertices),
  icosa: makeSolid("icosa", icosaVertices),
};

export function counts(data: PolyhedronData) {
  return { V: data.vertices.length, E: data.edges.length, F: data.faces.length };
}

export function dualOf(data: PolyhedronData): PolyhedronData {
  const vertices = data.faces.map((face) =>
    face
      .reduce((center, index) => center.add(data.vertices[index]), new THREE.Vector3())
      .multiplyScalar(1 / face.length),
  );
  const faces = computeFaces(vertices);
  const canonical = SOLIDS[DUAL_KEY[data.key]];
  return {
    ...canonical,
    key: DUAL_KEY[data.key],
    vertices,
    faces,
    edges: computeEdges(faces),
    color: "#f5b94f",
    accent: "#fff0c7",
  };
}

export function geometryForFaces(data: PolyhedronData) {
  const positions: number[] = [];
  data.faces.forEach((face) => {
    for (let i = 1; i < face.length - 1; i += 1) {
      [face[0], face[i], face[i + 1]].forEach((index) => {
        const point = data.vertices[index];
        positions.push(point.x, point.y, point.z);
      });
    }
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}

export function geometryForEdges(data: PolyhedronData) {
  const positions: number[] = [];
  data.edges.forEach(([a, b]) => {
    positions.push(...data.vertices[a].toArray(), ...data.vertices[b].toArray());
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}
