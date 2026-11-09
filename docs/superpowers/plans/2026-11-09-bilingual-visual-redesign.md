# Bilingual visual redesign implementation plan

1. Add a typed English/Russian content model and pathname-driven locale state.
2. Add an English root HTML entry and a Russian `/ru/` entry with complete localized metadata and structured data.
3. Refactor visible application copy, accessible labels, solid names, notes, proof steps, and verdicts to use the locale model without resetting interactive state.
4. Build five lightweight SVG/CSS proof diagrams whose objects and captions mirror the selected proof text and notation.
5. Restyle proof-step navigation as clearly interactive cards; add the light grid and dark static star field; raise all CSS font sizes by one pixel.
6. Convert Three.js canvases to demand rendering, render shadows once, reduce DPR/tessellation, and remove idle frame hooks.
7. Run TypeScript/Vite builds for the GitHub Pages base, inspect both generated HTML entries and metadata, and browser-test English/Russian, diagrams, math, 3D controls, dual animation, proof navigation, and mobile layout.
8. Commit and push the redesign, wait for GitHub Actions, and verify the live Pages site. Preserve the pre-redesign tag for rollback.
