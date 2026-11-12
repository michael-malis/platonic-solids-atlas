import { useMemo } from "react";
import katex from "katex";

type MathProps = { math: string };

function render(math: string, displayMode: boolean) {
  return katex.renderToString(math, {
    displayMode,
    throwOnError: false,
    strict: "ignore",
  });
}

export function BlockMath({ math }: MathProps) {
  const html = useMemo(() => render(math, true), [math]);
  return <div data-testid="katex-block" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function InlineMath({ math }: MathProps) {
  const html = useMemo(() => render(math, false), [math]);
  return <span data-testid="katex-inline" dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Inline formulas are explicitly delimited in copy; the surrounding text stays ordinary prose. */
export function MathText({ text }: { text: string }) {
  const parts = useMemo(() => text.split(/(\$[^$]+\$)/g), [text]);
  return <>{parts.map((part, index) => part.startsWith("$") && part.endsWith("$")
    ? <InlineMath key={index} math={part.slice(1, -1)} />
    : part)}</>;
}
