// UI-safe metadata: importing this module must never load Three.js.
export type SolidKey = "tetra" | "cube" | "octa" | "dodeca" | "icosa";
export type SolidInfo = { key: SolidKey; symbol: string; p: number; q: number; V: number; E: number; F: number; color: string; accent: string };

export const SOLID_INFO: Record<SolidKey, SolidInfo> = {
  tetra: { key: "tetra", symbol: "{ 3, 3 }", p: 3, q: 3, V: 4, E: 6, F: 4, color: "#42c7b6", accent: "#d4f3ee" },
  cube: { key: "cube", symbol: "{ 4, 3 }", p: 4, q: 3, V: 8, E: 12, F: 6, color: "#5f9be1", accent: "#d9e6f3" },
  octa: { key: "octa", symbol: "{ 3, 4 }", p: 3, q: 4, V: 6, E: 12, F: 8, color: "#9987e1", accent: "#e6e3f5" },
  dodeca: { key: "dodeca", symbol: "{ 5, 3 }", p: 5, q: 3, V: 20, E: 30, F: 12, color: "#e0ad4a", accent: "#f4e7c8" },
  icosa: { key: "icosa", symbol: "{ 3, 5 }", p: 3, q: 5, V: 12, E: 30, F: 20, color: "#e77c8b", accent: "#f5dfe1" },
};
export const SOLID_ORDER: SolidKey[] = ["tetra", "cube", "octa", "dodeca", "icosa"];
export const DUAL_KEY: Record<SolidKey, SolidKey> = { tetra: "tetra", cube: "octa", octa: "cube", dodeca: "icosa", icosa: "dodeca" };
export const PAIR_TO_SOLID: Record<string, SolidKey> = Object.fromEntries(SOLID_ORDER.map(key => [`${SOLID_INFO[key].p}-${SOLID_INFO[key].q}`, key]));
export function counts(data: SolidInfo) { return { V: data.V, E: data.E, F: data.F }; }
export function valuesForPair(p: number, q: number) {
  const denominator = 2 * p + 2 * q - p * q;
  if (denominator <= 0) return null;
  const E = 2 * p * q / denominator;
  return { V: 2 * E / q, E, F: 2 * E / p };
}
export function angleData(p: number, q: number) {
  const faceAngle = 180 * (p - 2) / p;
  const total = q * faceAngle;
  const rawDefect = 360 - total;
  const defect = Math.abs(rawDefect) < 1e-9 ? 0 : rawDefect;
  return { faceAngle, total, defect };
}
