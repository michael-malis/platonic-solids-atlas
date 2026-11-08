import * as THREE from "three";

export type SolidKey = "tetra" | "cube" | "octa" | "dodeca" | "icosa";

export type PolyhedronData = {
  key: SolidKey;
  name: string;
  symbol: string;
  p: number;
  q: number;
  vertices: THREE.Vector3[];
  faces: number[][];
  edges: [number, number][];
  color: string;
  accent: string;
  note: string;
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

function makeSolid(
  key: SolidKey,
  name: string,
  symbol: string,
  p: number,
  q: number,
  rawVertices: number[][],
  color: string,
  accent: string,
  note: string,
): PolyhedronData {
  const vertices = normalizeVertices(rawVertices);
  const faces = computeFaces(vertices);
  return { key, name, symbol, p, q, vertices, faces, edges: computeEdges(faces), color, accent, note };
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
  tetra: makeSolid("tetra", "Тетраэдр", "{ 3, 3 }", 3, 3, tetraVertices, "#48d7c5", "#d9fff8", "Четыре равносторонних треугольника. Самодвойственен."),
  cube: makeSolid("cube", "Куб", "{ 4, 3 }", 4, 3, cubeVertices, "#64a8ff", "#dcecff", "Шесть квадратов; в каждой вершине встречаются три грани."),
  octa: makeSolid("octa", "Октаэдр", "{ 3, 4 }", 3, 4, octaVertices, "#a78bfa", "#eee8ff", "Восемь треугольников; двойственен кубу."),
  dodeca: makeSolid("dodeca", "Додекаэдр", "{ 5, 3 }", 5, 3, dodecaVertices, "#f2b84b", "#fff0c9", "Двенадцать правильных пятиугольников."),
  icosa: makeSolid("icosa", "Икосаэдр", "{ 3, 5 }", 3, 5, icosaVertices, "#ff7a90", "#ffe0e6", "Двадцать треугольников; двойственен додекаэдру."),
};

export const SOLID_ORDER: SolidKey[] = ["tetra", "cube", "octa", "dodeca", "icosa"];

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
  const dualKey: Record<SolidKey, SolidKey> = {
    tetra: "tetra", cube: "octa", octa: "cube", dodeca: "icosa", icosa: "dodeca",
  };
  const canonical = SOLIDS[dualKey[data.key]];
  return {
    ...canonical,
    key: dualKey[data.key],
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

export const PAIR_TO_SOLID: Record<string, SolidKey> = {
  "3-3": "tetra",
  "4-3": "cube",
  "3-4": "octa",
  "5-3": "dodeca",
  "3-5": "icosa",
};

export function valuesForPair(p: number, q: number) {
  const denominator = 2 * p + 2 * q - p * q;
  if (denominator <= 0) return null;
  const E = (2 * p * q) / denominator;
  return { V: (2 * E) / q, E, F: (2 * E) / p };
}
