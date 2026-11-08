# Platonic Solids Atlas

Interactive 3D educational mini-site about the five Platonic solids, geometric duality, Euler's formula, and the proof that there are exactly five regular convex polyhedra.

**Live site:** https://michael-malis.github.io/platonic-solids-atlas/

## Features

- Interactive Three.js models of all five Platonic solids.
- Vertex, edge, face, material, and Euler-characteristic controls.
- Animated construction of dual polyhedra.
- Step-by-step proof using Euler's formula.
- A `{p, q}` laboratory for exploring the admissible pairs.

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

## Deployment

GitHub Actions automatically builds and deploys the site to GitHub Pages after every push to `main`. The Vite base path is configured for `/platonic-solids-atlas/` during the Pages build.
