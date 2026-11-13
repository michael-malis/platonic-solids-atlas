# Atlas refinement - verification

## Editorial

Full bilingual draft preceded integration. Independent reviewer audited math, audience fit, EN/RU parity and diagram consistency; the primary agent adjudicated every finding. A second audit checked the integrated result. See [content-review.md](content-review.md).

## Automated mathematics

`npm run verify` passes:

- Five computed convex hulls match V/E/F metadata and Euler's formula.
- All original faces are planar, regular, oriented outward and supporting the hull.
- Vertex degree q, face length p and exactly two incident faces per edge hold.
- Dual edges match adjacent original faces, have equal lengths, and satisfy exchanged counts.
- Double dual has the original edge graph after matching radial vertex directions.
- All 36 slider pairs (3…8) agree between angle-defect sign and Euler inequality.
- Reference defects: 60°, 0°, −72°; total defect of each Platonic solid is 720°.
- All ten localized proof formulas compile with KaTeX throwOnError enabled.

The workflow runs this check on future deployments too.

## Browser and responsive checks

Chrome headless CLI, without remote debugging. A same-origin test iframe exercises the app; a 390 px iframe gives the exact CSS viewport despite Chrome's minimum outer-window width. These are desktop-browser simulations, not physical-device tests. Temporary harnesses and screenshots remain outside tracked source / in ignored build output and are excluded from deployment.

Verified widths: 390, 768, 1024, 1440, 1920 and 2560 px (the last at 1440 px viewport height). Document width equals viewport at each size. EN/RU screenshots reviewed, including selected-solid profiles, cube definition, double count, reciprocal plot, existence step, large 3D scene and angle laboratory.

Checks passed: five solid selectors, material modes and visibility toggles; synthetic pointer rotation and wheel zoom trigger WebGL draws; Next changes proof step; all five steps display; laboratory {4,4} gives 0°; dual pairs, reset and playback; locale switching, Back/Forward; same Canvas DOM node survives language changes; no captured JavaScript or KaTeX errors. On mobile/tablet proof panels stack to keep figures legible. Step 3 derivation uses two lines to avoid unnecessary horizontal scrolling.

## Performance

Baseline production JavaScript: 1,420.19 kB / gzip 402.44 kB in one initial bundle.

After: initial interface about 520.4 kB / gzip 159.6 kB; deferred scene about 917.2 kB / gzip 248.8 kB. Initial compressed JS is about 60% smaller. The 3D bundle remains substantial; splitting delays its download rather than eliminating it. Browser resource records show only the interface at the hero before approaching a scene.

Wide-screen baseline exposed a Canvas resize feedback loop: CSS zoom caused measured/scaled sizes to feed back into layout, reaching a canvas height near 40,924 px. Fixed with offset-based measurement and an absolutely positioned scene host. Large-screen render surface now stays bounded by the intended panel.

Idle observation: zero new WebGL draw calls. Rotation and zoom produce frames. Offscreen construction progress remains identical during the observation interval and increases after returning. Simulated hidden-document visibility also pauses progress. These observations establish the targeted behavior, not a universal performance score across hardware.

## Build and release

`npm run build` and `npm run verify` pass. Vite retains a size warning for large chunks; this is recorded, not suppressed. The existing GitHub Pages base-path build and live deployment are checked separately before closing task D4.

## Rollback

Use `git log` for the three independent content, starfield and performance changes. Revert the unwanted change with a new commit and deploy through the existing workflow. Do not reset main or move pre-bilingual-redesign-2026-11-09.

### Final responsive and deep-link checks

Additional 390/500 px checks found a long Russian hero word clipping despite no document-level overflow. Scoped mobile Russian heading sizing and normal-flow hero illustration fix clipping and button overlap; heading scrollWidth now equals clientWidth at both sizes. Direct section fragments are scrolled during layout after React creates their targets. Pages-base local EN/RU routes and interactions pass.

### Publication result

Published source 6d3eb08: successful workflow https://github.com/michael-malis/platonic-solids-atlas/actions/runs/43288288908. EN and RU HTML, current JS, deferred scene JS, CSS and star SVG return HTTP 200. Public Chrome DOM includes new profiles, angle explanations and rendered KaTeX; 3D mounts near the scene. Local Pages-base direct-fragment tests start at scrollY 2809 (EN duality, 2560×1440) and 7982 (RU laboratory, 390 px), with no captured errors. Public headless screenshots are used to check rendering, while the same-origin harness checks precise scroll behavior and interactions.

### Follow-up: wide-screen scale and inline KaTeX

Production build and mathematics verification pass, including 140 inline expressions in EN/RU. Copy marks inline mathematics explicitly; surrounding prose remains ordinary text. Schläfli symbols, dual counts, fractions, angle values and proof notation use KaTeX. UI span selectors are scoped to direct children so they do not apply layout, padding or font overrides to KaTeX's nested spans.

Chrome rechecked 390, 768, 1024, 1440, 1920 and 2560×1440. All reports have no captured JS errors, KaTeX errors, unrendered dollar delimiters or document overflow. Root scaling is unchanged below 1600 px, 1.2 at 1920 and 1.5 at 2560. At 2560, explorer/proof/lab each measure 1920 px instead of the former 1510/1392/1392 px; at 390 all remain 358 px. Reviewed screenshots cover mobile angle typography, selected-solid profile, reciprocal plot, existence step and the enlarged 2K scene.

All six interaction reports pass rotation, wheel zoom, solid/material/visibility selectors, Next and all five proof steps, laboratory flat-angle calculation, dual playback/reset, language/history and persistent Canvas checks. Idle draw delta is zero; offscreen and hidden-document construction pause and resume correctly. These remain simulated viewport and pointer checks, not physical-device tests. Initial JS is 522.46 kB / gzip 159.97 kB; the 917.15 kB scene remains deferred.

Published source 7e9473e passed [build and deployment](https://github.com/michael-malis/platonic-solids-atlas/actions/runs/43309230383). Both public routes return 200. Public entry JS, deferred scene JS, CSS and stars return 200 and match SHA-256 of the CI Pages artifact. Local Windows and Linux CI produce different asset names, so artifact comparison establishes the deployed version. Public Chrome renders EN/RU profiles, angle content and 59 inline KaTeX instances per tested page without KaTeX errors; the scene mounts near duality. Follow-up complete. To reverse only this iteration, revert 7e9473e and let main redeploy.


## Title and punctuation update (2026-11-13)

- Full EN title: Platonic Solids Atlas with 3D Duality and Euler's Formula.
- Browser tabs use Platonic Solids Atlas / Атлас платоновых тел, including after language switches.
- Static and runtime Open Graph, Twitter, and JSON-LD titles use the full localized title.
- Removed U+2014 punctuation from tracked project text and documentation.
- Passed production build, geometry/formula verification, and Chromium checks of both localized routes, metadata, schema, visible text, and RU/EN tab-title switching.
