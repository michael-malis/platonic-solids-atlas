# Atlas refinement — verification

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
