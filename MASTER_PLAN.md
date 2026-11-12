# Atlas refinement — master plan

## Goal and guardrails

More mathematical substance in an interactive atlas, written like an accessible, thoughtful web article. School geometry is enough to start; first-year depth where useful. LinkedIn is a sharing channel, not a reason to dilute the mathematics. Keep the existing design, fonts, palette, grid, controls and large models. Only refine the static star background. English default, Russian equivalent.

Draft both languages before integration; independent subagent review with full context; primary agent adjudicates corrections. Apply frontend-design, math-lecture-notes and math-figures selectively. Relevant legacy source: D:\Платоновы тела; do not copy its terminology errors or unrelated material.

## Checklist

- [x] A1 Inspect implementation, geometry, translations and deployment.
- [x] A2 Inspect legacy material; restrict scope to regular convex polyhedra.
- [x] A3 Read design and mathematics skills; agree restrained application.
- [x] A4 Confirm audience, preserve design, independent editorial review.
- [x] A5 Create this tracker and HANDOFF.md.
- [x] A6 Capture baseline build, screenshots and performance.
- [x] B1 Write Russian content draft tied to visuals.
- [x] B2 Write corresponding English content.
- [x] B3 Independent subagent critique of both languages and mathematical claims.
- [x] B4 Adjudicate review and finalize copy.
- [x] B5 Integrate bilingual content: definition, five profiles, duality, proof, angle laboratory.
- [x] C1 Correct definition diagram and reciprocal-coordinate boundary; preserve integer grid.
- [x] C2 Replace star gradients with subtle irregular static local SVG; preserve light grid.
- [x] C3 Separate lightweight data from Three.js and lazy-load scenes near viewport.
- [x] C4 Measure and remove unnecessary animation/render work; preserve camera state.
- [x] C5 Review layouts at 390, 768, 1024, 1440, 1920 and 2560 px, including 2560×1440.
- [x] D1 Verify geometry, duality, angle calculations, KaTeX and interactions.
- [x] D2 Review screenshots and EN/RU parity, navigation and state preservation.
- [x] D3 Compare production chunks and idle/offscreen work with baseline.
- [x] D4 Publish via existing GitHub Actions; verify live EN and RU.
- [x] D5 Record outcome, remaining limits and rollback instructions.

## Acceptance and implementation

Definition plus example {4,3}; three-part selected-solid profile (structure, duality, distinctive fact); incidence explanation; five-step proof with necessary conditions separate from existence; angle defect α=(p−2)π/p, δ=2π−qα with local-test caveat and optional Euler identity. No extra chapters, biographies or unrelated polyhedra. Keep prose blocks short and derive metrics from common data.

SVG star tile 1536×1024, about 100 irregular dim points, no motion/network. Shared geometry/materials, demand rendering, persistent mounted canvases, pause construction offscreen/hidden. Loading placeholders preserve dimensions and allow retry.

Validate all five V/E/F and dual correspondences, all p,q=3..8; δ(3,5)=60°, δ(4,4)=0°, δ(5,4)=−72°. No forced motion for reduced-motion users. Confirm no document overflow, readable text/controls and large models on phone and 2K. Successful Pages build/deployment and live route checks required before claiming publication.

Separate reversible commits for content, stars and performance; do not move existing rollback tag pre-bilingual-redesign-2026-11-09.

## Evidence / current action

Baseline HEAD: ba35e45. No application changes at start; prior untracked design spec retained as historical context. Preparation complete; see evidence and final outcome below. Checkboxes close only with evidence below or linked reports.

### Content evidence

B1–B4: docs/content-draft.md and docs/content-review.md; independent editorial_review completed, all findings adjudicated. B5/C1: bilingual integration and diagram corrections compile with npm run build. Visual acceptance remains open.

Baseline: production JS 1,420.19 kB / gzip 402.44 kB. Headless CLI works without remote debugging; browser connectors unavailable. Baseline wide-screen screenshot/DOM in workspace atlas-qa/baseline (outside repository). At viewport ~2K, Canvas height grew to 40,924 px: CSS zoom plus measured Canvas sizing feedback identified; must fix and remeasure. Original idle rendering was already demand-driven.

### Integration and validation evidence

See docs/verification.md. Geometry/KaTeX command: npm run verify (pass). Production build passes. Chrome responsive/interactions reports and screenshots are stored in the workspace atlas-qa folder outside the repository. All six widths pass no-overflow checks; EN/RU, synthetic drag/zoom, navigation, idle/offscreen/hidden behavior verified. Initial gzip JS falls from 402.44 to about 159.6 kB. C4 fixes CSS-zoom/Canvas feedback and pauses animation; no claim of universal hardware performance.

Pages-base build and publication completed; see final outcome below.

### Final outcome

All tasks complete. Published EN / and RU /ru/ return HTTP 200; the current entry, deferred scene, CSS and star SVG return 200. Real public pages render the new content and KaTeX; Chrome opens both published routes. Source release 6d3eb08 passed Actions: https://github.com/michael-malis/platonic-solids-atlas/actions/runs/43288288908.

Final Pages-base browser tests (390 px RU and 2560×1440 EN): no captured errors, no KaTeX errors, zero idle draws, responsive layout without overflow; rotation/zoom work, Canvas survives locale switches, offscreen/hidden progress pauses, direct section fragments start at the intended nonzero scroll position. Synthetic pointer tests account for the lack of native pointer capture in dispatched events. Additional 500 px hero check passes.

Live: https://michael-malis.github.io/platonic-solids-atlas/ and https://michael-malis.github.io/platonic-solids-atlas/ru/. Auto-deploy remains enabled for main. Rollback: revert the relevant content, starfield, performance or responsive-fix commit and let the workflow redeploy; retain the historical rollback tag. Browser checks simulate mobile viewports, not physical devices. Large 3D bundle remains deferred rather than eliminated. No active implementation tasks remain.

## Follow-up: wide-screen scale and inline math

User confirms scale is still too small on the full-page view, and requests formulas in LaTeX. Preserve visual identity and phone sizing. Baseline at 2560×1440: root zoom 1.18, explorer 1510 px, proof/lab 1392 px. Target: root scale 1.5 at 2560, explorer/proof/lab about 1920 px; fluid growth from 1600 px, unchanged below that. Existing offset-based Canvas sizing remains mandatory. Render inline notation/fractions/angles with KaTeX, not only display formulas.

- [x] S1 Measure current scale and choose a scoped responsive correction.
- [x] S2 Implement fluid wide-screen scale and aligned section widths.
- [x] S3 Mark and render inline mathematical notation in both languages.
- [x] S4 Verify all formulas, responsive widths, Canvas stability and interactions.
- [x] S5 Publish, verify live EN/RU and record evidence.

S2–S4 evidence: Pages-base production build and `npm run verify` pass, including 140 inline formulas. Chrome checks at 390, 768, 1024, 1440, 1920 and 2560×1440 report no overflow, captured JS/KaTeX errors or raw math delimiters. At 2560, all three main shells measure 1920 px; at 390 they remain 358 px. Screenshot review confirms angle values render on one line after limiting UI span selectors to direct children. Rotation, zoom, materials, five steps, Next, laboratory, locale/history, persistent Canvas, zero idle draws and offscreen/hidden pause pass. See docs/verification.md.

S5: published source 7e9473e; build and deployment succeeded: https://github.com/michael-malis/platonic-solids-atlas/actions/runs/43309230383. Public EN/RU return 200 and render 59 inline math instances per tested page without KaTeX errors. Entry, scene, CSS and star resources return 200 and match SHA-256 of the actual CI deployment artifact (build hashes differ between local Windows and CI Linux). Main auto-deploy remains enabled. Follow-up complete.
