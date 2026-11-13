# Bilingual visual redesign

## Intent

Refine the published Platonic-solids atlas into a clearer bilingual learning experience. English becomes the default language and Russian remains fully available. The theorem section must teach the proof through synchronized text and diagrams: the right-hand visual is never an independent decoration, but a direct visualisation of the exact claim currently stated on the left.

The target reader is a curious secondary-school or early undergraduate learner who knows basic algebra but may not know graph terminology or Schläfli symbols. The experience remains a visual atlas first: mathematical text supports direct exploration instead of imitating a formal lecture note.

## Goals

- Increase every displayed font size by approximately one CSS pixel while preserving the existing hierarchy and responsive layout.
- Make interactive proof-step controls visibly clickable through card-like shape, hover, focus, active, and completed states.
- Continue the subtle grid pattern across light sections and add a lightweight star-field pattern to dark sections.
- Replace the generic proof glyph with five step-specific mathematical diagrams synchronized with the adjacent explanation.
- Add only slightly more mathematical explanation (roughly 15–25% over the current copy) without turning the page into lecture notes.
- Make English the root/default experience and provide a complete Russian version through a persistent `EN / RU` control and `?lang=ru` deep link.
- Localize visible copy, accessible names, document language, title, description, social metadata, and structured data.
- Remove the main causes of jank and reduce unnecessary GPU and main-thread work.
- Preserve a simple, documented rollback path to the currently published version.

## Non-goals

- No new account, database, analytics, or server component.
- No change to the mathematical classification theorem or the computed polyhedron geometry.
- No decorative animation that competes with reading.
- No replacement of Three.js or the existing React/Vite deployment architecture.
- No translation into languages other than English and Russian.

## Anti-goals

- The proof diagrams must not become generic decorative geometry.
- The extra text must not duplicate the same statement in multiple places.
- The theorem section must not adopt a dense theorem-proof format or require sustained reading before interaction.
- The English and Russian versions must not drift mathematically or structurally.
- Performance improvements must not remove rotation, zoom, dual construction, or other core interactions.

## Approaches considered

1. **Five synchronized, step-specific diagrams - selected.** Each diagram directly maps the current paragraph and formula to visible objects. This gives each proof step its own explanatory job and best matches the educational purpose.
2. **One morphing abstract diagram.** Visually cohesive, but it forces unrelated arguments into one visual grammar and recreates the current problem of insufficient meaning.
3. **A compact formula board.** Fast and rigorous, but too text-heavy for an interactive geometry atlas.

## Proof-section teaching contract

Every state uses the same left/right structure:

- **Left:** strategy label, one concise explanatory paragraph, the central formula or short derivation, and a one-sentence takeaway.
- **Right:** only objects that correspond to the current left-hand claim, using the same symbols and colors.
- Hovering or focusing a meaningful visual element may highlight the matching expression on the left, but comprehension must not depend on hover.
- A small legend defines the recurring colors: face contribution, vertex contribution, edge count, admissible pair, excluded pair.
- Changing a step updates text, formula, diagram, caption, and accessible description together.

### Step 1 - Definitions and the graph on a sphere

**Left content:** introduce a regular convex polyhedron, its graph, `p`, `q`, `V`, `E`, and `F` in plain language; add one short explanation of why `p,q >= 3`.

**Right diagram:** a clean spherical/planar graph patch containing one highlighted `p`-gonal face and one highlighted vertex with `q` incident edges. Labels point from `p` to the boundary of the selected face and from `q` to the star of the selected vertex. A small boundary-case comparison shows why a two-sided face or a degree-two vertex does not make a three-dimensional convex polyhedron.

### Step 2 - Double-counting incidences

**Left content:** explain edge-face incidences and edge-endpoint incidences in one compact paragraph before displaying `pF=2E` and `qV=2E`.

**Right diagram:** a split view. On the face side, the sides contributed by all faces flow into edge tokens, with each actual edge receiving two contributions. On the vertex side, half-edges contributed by all vertices pair into full edges, again two per edge. The two visible `×2` groupings provide the reason for the coefficient rather than merely displaying it.

### Step 3 - Euler's formula produces positive curvature

**Left content:** show the intermediate substitution

`2E/q - E + 2E/p = 2`

and, after division by `2E`,

`1/p + 1/q - 1/2 = 1/E > 0`.

Then conclude `1/p + 1/q > 1/2` and distinguish spherical, Euclidean, and hyperbolic regimes as interpretation, not as a replacement for proof.

**Right diagram:** a compact curvature map with the boundary `1/p + 1/q = 1/2`. The current admissible region is visibly separated from the equality and subcritical regions. The expression `1/E > 0` is the bridge between the algebra on the left and the spherical region on the right.

### Step 4 - Exhaustive integer enumeration

**Left content:** state that duality allows the temporary assumption `p <= q`; if `p >= 4`, then `1/p + 1/q <= 1/2`, a contradiction. Hence `p=3`, and then `q<6`, so `q` is `3`, `4`, or `5`. Restore the swapped pairs.

**Right diagram:** an integer `(p,q)` lattice. Cells failing the inequality are muted/crossed. The three cells with `p=3` and `q=3,4,5` light up first; then the reflection across `p=q` reveals `(4,3)` and `(5,3)`. The diagram explicitly presents the enumeration as exhaustive.

### Step 5 - Existence is a separate obligation

**Left content:** state that the preceding argument supplied necessary possibilities and excluded all other integer pairs, but did not construct a polyhedron. Present the five concrete models and close the theorem by combining exhaustiveness with existence.

**Right diagram:** five small solid cards, paired by duality, with Schläfli symbol and `(V,E,F)`. A checklist indicates regular faces, constant vertex degree, and convexity. Two final badges - “no other pairs” and “all five realised” - join into a proof-complete mark.

## Amount and style of mathematical text

Each step should contain roughly 60–90 words per language, one central formula or compact derivation, and one short takeaway. This is only about 15–25% more text than the current version. The tone remains that of an interactive atlas: plain language first, mathematical precision where it prevents misunderstanding, and no formal theorem-proof scaffolding. Symbols are introduced before they appear in formulas, each important transition receives a brief reason, and the necessary-condition argument remains distinct from the existence demonstration.

## Bilingual architecture

- Store all interface and mathematical copy in one typed translation model with matching English and Russian keys.
- English is always selected at the root URL and remains the canonical/default experience.
- Russian is available at the static `/ru/` path. The build emits a Russian HTML entry with crawler-visible Russian title, description, Open Graph/Twitter fields, structured data, canonical reference, and language alternates.
- The language control uses the History API to switch between `/` and `/ru/` without remounting the React application. Selected solid, material mode, visibility toggles, proof step, laboratory values, dual pair, animation progress, and current camera state remain intact during this in-page switch.
- A full reload restores the language from the path but resets exploratory state to the normal defaults. Browser Back/Forward updates the language from the path while the page remains mounted.
- No local-storage language preference overrides the English root URL.
- Mathematical notation, numerical values, and the order of proof steps are canonical and shared across languages.

## Visual system

- Increase current CSS font sizes by one pixel, including values inside `clamp()`, while preserving relative hierarchy.
- Light sections reuse a subtle fixed-size grid derived from the hero pattern.
- Dark sections use layered CSS radial gradients as a static star field; no additional WebGL or animated particle layer.
- Proof-step controls become raised cards with a number, concise label, hover/focus lift, active fill, completed check state, and a visible `Choose a step / Выберите шаг` cue. Mobile layout scrolls horizontally rather than compressing labels into illegibility.
- A step is visually marked as passed when its index is lower than the currently active step. This is session navigation feedback, not a claim that the learner completed an assessment, and it does not persist across reloads.
- All interactive controls keep keyboard focus styles and minimum touch targets.

## Performance plan

- Change both React Three Fiber canvases from continuous rendering to demand rendering.
- Render contact shadows once and keep the star field static.
- Remove no-op per-frame hooks and avoid frame updates when the scene is idle or off-screen.
- Reduce unnecessary device-pixel ratio and sphere tessellation while preserving visual quality.
- Memoize reusable vertex geometry/materials where practical.
- Keep the dual-construction animation explicit and bounded; stopping or completing it returns the scene to an idle state.
- Measure the production build, confirm that idle canvases no longer produce continuous frames, and inspect the live page for console errors and interaction regressions.
- Cap production DPR at 1.5, test desktop and a 390-pixel mobile viewport in Chromium, verify that idle canvases request no continuous animation frames, and confirm that controls remain responsive during rotation and the bounded dual animation.

## Metadata

- English default title and description in the root static HTML.
- Crawler-visible Russian title and description in the `/ru/` static HTML entry; runtime localization alone is not considered sufficient for social cards.
- Canonical URL, `hreflang` alternates, Open Graph locale/alternate locale, Twitter-card tags, theme color, and WebSite/EducationalApplication JSON-LD in both entries.
- English visible headings and navigation become the default content.
- The existing Russian copy is retained as the terminology baseline and lightly expanded; English is translated from the same canonical mathematical content and audited step-by-step for structural and notational parity.

## Rollback and delivery

- Tag the currently deployed commit before implementation.
- Implement the redesign in a dedicated commit or small, clearly grouped commit series.
- Do not alter unrelated repositories or the earlier private publication.
- If the redesign is rejected, restore the tagged commit and redeploy GitHub Pages.

## Validation

- Production TypeScript/Vite build passes with the GitHub Pages base path.
- Both languages are complete and switching preserves interaction state.
- Each proof step's diagram, text, formula, caption, and accessible description agree.
- KaTeX reports no rendering errors or raw commands.
- Proof-step controls, Back/Next navigation, sliders, mode controls, dual animation, rotation, and zoom work by mouse and keyboard where applicable.
- Desktop and mobile layouts are visually inspected.
- The live GitHub Pages deployment, JS/CSS assets, metadata, console, and core interactions are verified after Actions succeeds.

## Builder-owned details

- Exact SVG drawing primitives and micro-animation timings.
- Exact English phrasing, provided it remains mathematically equivalent to the canonical statements above.
- Internal component/file boundaries.
- Minor spacing and breakpoint adjustments needed for responsive polish.
