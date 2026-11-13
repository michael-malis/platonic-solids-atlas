type CubeMarkProps = {
  size?: number;
};

/** Wireframe cube brand mark - mint edges, gold vertices (same drawing as public/favicon.svg). */
export function CubeMark({ size = 19 }: CubeMarkProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="10 7 44 50"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M32 11 L50.2 21.5 V42.5 L32 53 L13.8 42.5 V21.5 Z" />
        <path d="M13.8 21.5 L32 32 L50.2 21.5 M32 32 V53" />
      </g>
      <g fill="#d8b04a">
        <circle cx="32" cy="11" r="3.4" />
        <circle cx="50.2" cy="21.5" r="3.4" />
        <circle cx="50.2" cy="42.5" r="3.4" />
        <circle cx="32" cy="53" r="3.4" />
        <circle cx="13.8" cy="42.5" r="3.4" />
        <circle cx="13.8" cy="21.5" r="3.4" />
        <circle cx="32" cy="32" r="3.4" />
      </g>
    </svg>
  );
}
