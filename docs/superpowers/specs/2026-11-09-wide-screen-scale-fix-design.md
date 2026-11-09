# Wide-screen scale and solid selector fix

## Intent

Make the atlas comfortable to read on 2K displays without redesigning the existing layout, while repairing the solid selector on narrow screens and removing document-width overflow from decorative circles.

## Approach

- At viewports at least `112rem` wide, apply a modest `1.18` CSS zoom to the application root. This uniformly enlarges typography, controls, diagrams, and WebGL panels while preserving their proportions.
- Clip the decorative overflow inside the duality and laboratory sections so pseudo-elements cannot widen full-page screenshots.
- Below `760px`, turn the five-solid selector into a single-row, snap-scrolling rail with fixed-width tabs and non-wrapping labels. Hide only the visual scrollbar; keyboard and touch scrolling remain available.

## Alternatives considered

- Replacing every fixed size with fluid `clamp()` values is more flexible but disproportionately large for this correction.
- `transform: scale()` does not participate in layout and would create new overflow problems.
- A mobile dropdown is compact but hides the useful side-by-side comparison of all five solids.

## Validation

Check CSS viewports at 2560×1440, 1920×1080, and 412×924; confirm readable scale, no horizontal document overflow, single-line solid labels, working 3D controls, and a clean production build.
