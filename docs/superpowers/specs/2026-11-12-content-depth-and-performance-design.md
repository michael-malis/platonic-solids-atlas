# Content depth and performance refinement

## Intent

Make the published bilingual site feel mathematically substantial without changing its identity as an interactive atlas. The visitor should encounter a short, connected narrative, but the models, diagrams, controls, and comparisons remain the primary way to learn.

The selected presentation is a hybrid of two earlier approaches: more visible connective prose than a purely layered atlas, plus optional detail where a full explanation would otherwise interrupt exploration. The existing proof composition is already successful and will be changed conservatively.

## Source use

The folder `D:\Платоновы тела` contains a 2005 Russian mini-site spanning several loosely related topics. Only material directly relevant to regular convex polyhedra will be used, especially:

- the contrast between infinitely many regular polygons and only five regular convex polyhedra;
- rotational symmetry when it describes a specific Platonic solid;
- the geometric relationship of the dodecahedron and icosahedron with the golden ratio, kept to one concise profile fact;
- Euler's relation and the combinatorial data of the five solids.

General symmetry essays, mathematician biographies, the Archimedean-solid catalogue, and unrelated golden-ratio material are out of scope. The legacy text will not be copied verbatim. Its mathematical claims will be independently checked, and its outdated or inconsistent terminology will not be carried into the atlas.

## Goals

- Increase visible mathematical substance by roughly 25–35%, without creating long uninterrupted reading blocks.
- Give every section a clear conceptual job in one continuous route: definition, inspection, duality, classification, experiment, conclusion.
- Make each solid more than a count table by adding a compact mathematical profile.
- Explain the laboratory result geometrically through angle defect, not only by a green or red inequality verdict.
- Preserve the current proof card, five-step navigation, diagrams, and overall visual rhythm.
- Improve initial loading and off-screen behavior of the two Three.js scenes without weakening interaction quality.
- Keep English and Russian structurally and mathematically equivalent.

## Non-goals and anti-goals

- No new long theorem-proof chapter, history essay, glossary page, exercise set, or excursion into other polyhedron families.
- No copying of extended legacy prose or decorative facts unrelated to the current visual.
- No redesign of the proof section merely for novelty.
- No extra WebGL decoration or animated background.
- No loss of rotation, zoom, material modes, construction playback, or language-state preservation.
- No claim that the Euler inequality alone constructs a polyhedron.

## Approaches considered

1. **Layered atlas.** Keep almost all extra material behind disclosure controls. This protects the visual density, but leaves the default page feeling nearly as sparse as it does now.
2. **Guided narrative.** Add a fuller introduction before every interactive section. This improves continuity, but risks turning the atlas into a scrolling textbook.
3. **Guided atlas with selective depth - selected.** Add one compact definition band, richer figure profiles, short connective explanations, and one optional detail layer only where useful. The page becomes more coherent on first reading while still rewarding direct manipulation.

## Content architecture

### 1. Definition band after the hero

A compact light section answers “what counts as a Platonic solid?” before the user meets the models. It states three conditions in plain language:

- every face is the same regular polygon;
- the same number of faces meet at every vertex;
- the polyhedron is convex.

It then introduces the Schläfli symbol `{p,q}` in one sentence: `p` is the number of sides of a face and `q` is the number meeting at a vertex. This is visible content, not an accordion, because every later section uses the notation.

### 2. Explorer as a set of mathematical profiles

The existing 3D model and controls stay unchanged. Beneath the canvas, a profile strip updates with the selected solid and gives three small pieces of information:

- **Local structure:** the face type and vertex figure, phrased through `{p,q}`.
- **Dual relation:** which solid is obtained from face centers and what changes under duality.
- **Geometric signature:** one distinctive, verified fact, such as self-duality, a rotational-symmetry axis, or the appearance of the golden ratio.

The control-panel note remains short. The new profile carries the additional content so controls do not become cramped.

### 3. Duality with an incidence explanation

The current animation and three-step story remain visually intact. One concise paragraph is added below the correspondence counts: an original edge lies between two original faces, so their centers become two dual vertices joined by one dual edge; the face centers surrounding an original vertex close into one dual face. This explains the construction rather than merely restating `V*=F`, `E*=E`, `F*=V`.

### 4. Proof changed only where it earns its place

The five cards, layout, formulas, and visuals stay as they are. Copy edits are limited to:

- making the strategy-to-formula transition explicit where it is currently abrupt;
- naming `{4,4}` and `{3,6}` as equality examples of flat tilings;
- retaining the strict separation between “no other pairs” and “all five models exist”.

No new nested proof panels or long formal derivation will be added.

### 5. Laboratory explains angle defect

Alongside the current Euler test, the laboratory computes the interior face angle

`alpha = (p-2)pi/p`

and the angle defect at a vertex

`delta = 2pi - q alpha`.

The display translates this into degrees: for example, five equilateral-triangle angles use `5 x 60° = 300°`, leaving a positive `60°` defect. Positive defect means the corner can bend into a convex surface; zero is flat; negative means too much angle accumulates around the vertex. The text explicitly notes that passing this local test is necessary, while the five realised pairs still require actual models.

### 6. A short conclusion

Before the footer, a compact conclusion reconnects the three ideas already explored:

- local regularity is encoded by `{p,q}`;
- duality swaps `p` and `q` together with vertices and faces;
- Euler's formula restricts the integer possibilities to the five realised models.

This closes the atlas without introducing another family of polyhedra or a new chapter.

## Writing and localization contract

- Visible paragraphs are normally two to four sentences and no section begins with more than one continuous prose block.
- Symbols are defined before use; intuition and proof claims are not blurred together.
- Every extra fact must explain the model currently visible, its dual, or the five-solid classification.
- Russian terminology is the canonical editorial baseline; the English text must match it structurally and mathematically.
- Legacy material is treated as user-supplied secondary material and is not cited as an authority for unverified claims.

## Visual contract

- Reuse the existing grid, star field, type pairing, colors, section headings, and rounded-card language.
- The definition band and final conclusion band are shallow, wide compositions rather than new full-height sections.
- The selected-solid profile changes with the tabs and uses the current solid color only as a restrained accent.
- Extra prose must not reduce the 3D model size or push its controls below an internal scroll area.
- At narrow widths, profile cards stack and preserve the existing horizontal solid-tab behavior.

## Technical refinement

The current code already uses `frameloop="demand"`, one-frame contact shadows, capped DPR, and reduced sphere detail. Preserve those wins and add the next safe layer:

- split the Three.js scene module from the initial interface bundle with `React.lazy` and `Suspense`;
- start loading/mounting a scene only when its section approaches the viewport;
- stop the dual-construction timer when its section is off-screen or the document is hidden, resuming only when the user returns;
- use shared or instanced vertex geometry/materials to reduce repeated draw calls;
- keep off-screen canvases idle and avoid recreating geometries on ordinary copy or language updates;
- provide a lightweight, styled loading state with the same dimensions to prevent layout shift;
- verify that reduced-motion users do not receive forced smooth animation.

Camera and exploration state remain React-owned and survive language switching. No change will introduce continuous idle rendering.

## Validation

- TypeScript/Vite production build passes with the GitHub Pages base path.
- English `/` and Russian `/ru/` have matching structure and complete copy.
- All added formulas render through KaTeX with no raw commands or console errors.
- The five solid profiles agree with the computed `{p,q}`, `V,E,F`, and dual relations.
- Laboratory angle values agree numerically with the Euler inequality for every slider pair from 3 to 8.
- Existing proof navigation, diagrams, dual animation, 3D rotation/zoom, material modes, visibility toggles, and language switching still work.
- Desktop, wide 2K, and 390-pixel mobile layouts are visually checked.
- Initial production chunks are inspected, off-screen dual animation is tested, and idle canvases are checked for continuous work.
- After implementation, publish through the existing GitHub Actions workflow and verify the live English and Russian routes.

## Rollback

Keep the existing `pre-bilingual-redesign-2026-11-09` tag untouched. Deliver this refinement as a separate commit so the content/performance pass can be reverted independently without disturbing the earlier bilingual redesign.
