# Platonic Solids Atlas

Interactive 3D educational mini-site about the five Platonic solids, geometric duality, Euler's formula, and the proof that there are exactly five regular convex polyhedra.

**Live site (English):** https://michael-malis.github.io/platonic-solids-atlas/

**Русская версия:** https://michael-malis.github.io/platonic-solids-atlas/ru/

## Features

- Interactive Three.js models of all five Platonic solids.
- Vertex, edge, face, material, and Euler-characteristic controls.
- Animated construction of dual polyhedra.
- Five synchronized visual proof steps using Euler's formula.
- A `{p, q}` laboratory for exploring the admissible pairs.
- English and Russian routes with localized metadata.
- Demand-driven 3D rendering for lower idle CPU/GPU usage.
- Mathematical profiles for each solid and a live angle-defect explanation.
- Lazy-loaded 3D scenes; construction pauses outside the viewport or in a hidden tab.

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

To make a production build:

```bash
npm run build
npm run preview
```

Verify all five geometries, dual correspondences, the 36 laboratory pairs and proof formulas:

```bash
npm run verify
```

The mathematical argument enumerates possible Schläfli pairs and exhibits all five models. The classical uniqueness of a regular convex type for each pair is identified separately.

Task status and rollback notes: [MASTER_PLAN.md](MASTER_PLAN.md). Editorial review: [docs/content-review.md](docs/content-review.md).

## Deployment

GitHub Actions automatically builds and deploys the site to GitHub Pages after every push to `main`. The Vite base path is configured for `/platonic-solids-atlas/` during the Pages build.
