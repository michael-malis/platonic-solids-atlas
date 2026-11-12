import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const nativeRequire = createRequire(import.meta.url);
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  const source = fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  cache.set(file, exports);
  new Function("require", "exports", code)(name => name === "./solid-data" ? load("src/lib/solid-data.ts") : name === "./atlas-copy" ? load("src/atlas-copy.ts") : nativeRequire(name), exports);
  return exports;
}
const { SOLID_INFO, SOLID_ORDER, DUAL_KEY, angleData, valuesForPair, PAIR_TO_SOLID } = load("src/lib/solid-data.ts");
const { SOLIDS, dualOf, counts } = load("src/lib/platonic.ts");
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-7, `${a} != ${b}`);
for (const key of SOLID_ORDER) {
  const solid = SOLIDS[key], info = SOLID_INFO[key], c = counts(solid);
  assert.deepEqual(c, { V: info.V, E: info.E, F: info.F });
  assert.equal(c.V - c.E + c.F, 2);
  assert.equal(info.p * c.F, 2 * c.E);
  assert.equal(info.q * c.V, 2 * c.E);
  const lengths = solid.edges.map(([a,b]) => solid.vertices[a].distanceTo(solid.vertices[b]));
  lengths.forEach(x => near(x, lengths[0]));
  const incidence = new Map();
  for (const face of solid.faces) {
    assert.equal(face.length, info.p);
    const a = solid.vertices[face[0]], b = solid.vertices[face[1]], c = solid.vertices[face[2]];
    const normal = b.clone().sub(a).cross(c.clone().sub(b)).normalize();
    assert.ok(normal.dot(a) > 0, "face points outward");
    solid.vertices.forEach(v => assert.ok(normal.dot(v.clone().sub(a)) < 1e-7, "convex supporting plane"));
    face.forEach((index,i) => {
      near(normal.dot(solid.vertices[index].clone().sub(a)), 0);
      const previous = solid.vertices[face[(i + face.length - 1) % face.length]].clone().sub(solid.vertices[index]);
      const next = solid.vertices[face[(i + 1) % face.length]].clone().sub(solid.vertices[index]);
      near(previous.angleTo(next) * 180 / Math.PI, angleData(info.p,info.q).faceAngle);
      const edge = [index,face[(i+1)%face.length]].sort((x,y)=>x-y).join("-");
      incidence.set(edge,(incidence.get(edge)||0)+1);
    });
  }
  incidence.forEach(value => assert.equal(value, 2));
  solid.vertices.forEach((_, i) => assert.equal(solid.edges.filter(edge=>edge.includes(i)).length, info.q));
  const dual = dualOf(solid), dc = counts(dual);
  assert.equal(dual.key, DUAL_KEY[key]);
  assert.deepEqual(dc, { V:c.F, E:c.E, F:c.V });
  const dualEdges = new Set(dual.edges.map(edge => [...edge].sort((a,b)=>a-b).join("-")));
  for (const [a,b] of solid.edges) {
    const neighboringFaces = solid.faces.flatMap((face,index) => face.includes(a) && face.includes(b) ? [index] : []);
    assert.equal(neighboringFaces.length,2);
    assert.ok(dualEdges.has(neighboringFaces.sort((a,b)=>a-b).join("-")));
  }
  const dualLengths = dual.edges.map(([a,b])=>dual.vertices[a].distanceTo(dual.vertices[b]));
  dualLengths.forEach(length=>near(length,dualLengths[0]));
  const twice = dualOf(dual);
  assert.deepEqual(counts(twice), c);
  const originalIndices = twice.vertices.map(vertex=>solid.vertices.findIndex(original=>original.clone().normalize().distanceTo(vertex.clone().normalize())<1e-7));
  assert.equal(new Set(originalIndices).size,c.V);
  assert.ok(originalIndices.every(index=>index>=0));
  assert.deepEqual(new Set(twice.edges.map(edge=>edge.map(i=>originalIndices[i]).sort((a,b)=>a-b).join("-"))), new Set(solid.edges.map(edge=>edge.join("-"))));
  near(info.V * angleData(info.p,info.q).defect, 720);
  assert.deepEqual(valuesForPair(info.p,info.q), c);
}
let accepted = 0;
for (let p=3;p<=8;p++) for (let q=3;q<=8;q++) {
  const angle = angleData(p,q), margin = 1/p + 1/q - .5;
  const sign = n => Math.abs(n)<1e-9?0:Math.sign(n);
  assert.equal(sign(angle.defect),sign(margin));
  near(angle.defect,360*q*margin);
  assert.equal(Boolean(PAIR_TO_SOLID[`${p}-${q}`]), angle.defect>0);
  if (angle.defect>0) accepted++;
}
assert.equal(accepted, 5);
near(angleData(3,5).defect,60);near(angleData(4,4).defect,0);near(angleData(5,4).defect,-72);
const { COPY } = load("src/content.ts");
const katex = nativeRequire("katex");
for (const locale of ["en","ru"]) for (const step of COPY[locale].proof.steps) katex.renderToString(step.formula,{throwOnError:true});
assert.deepEqual(Object.keys(COPY.en.atlas.profiles), Object.keys(COPY.ru.atlas.profiles));
console.log("PASS: five hulls, regular faces, outward orientation, convexity, degrees, edge incidences, Euler, duals/double duals; 36 angle pairs; EN/RU proof KaTeX.");
