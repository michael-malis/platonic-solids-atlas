import { InlineMath, MathText } from "../math";
import { ArrowLeftRight, Check } from "lucide-react";
import type { Locale, ProofStepCopy, SiteCopy } from "../content";
import { counts, SOLID_ORDER, SOLID_INFO } from "../lib/solid-data";

type ProofVisualProps = {
  step: number;
  locale: Locale;
  copy: SiteCopy;
  stepCopy: ProofStepCopy;
};

function DefinitionsDiagram() {
  return (
    <svg viewBox="0 0 440 330" className="proof-svg" aria-hidden="true">
      <g className="diagram-grid-lines">
        <path d="M28 74H412M28 138H412M28 202H412M28 266H412" />
        <path d="M92 28V302M156 28V302M220 28V302M284 28V302M348 28V302" />
      </g>
      <g className="diagram-muted-graph">
        <path d="M100 120L175 60H325V210L250 270M250 120L325 60" />
        <path strokeDasharray="5 6" d="M175 60V210H325M175 210L100 270" />
      </g>
      <polygon className="diagram-face" points="100,120 250,120 250,270 100,270" />
      <path className="diagram-vertex-rays" d="M250 120H100M250 120V270M250 120L325 60" />
      <circle className="diagram-vertex" cx="250" cy="120" r="10" />
      <g className="diagram-label">
        <rect x="54" y="46" width="105" height="36" rx="18" />
        <text x="106" y="69" textAnchor="middle">p = 4</text>
      </g>
      <path className="diagram-callout" d="M106 82L143 169" />
      <g className="diagram-label accent">
        <rect x="293" y="244" width="116" height="36" rx="18" />
        <text x="351" y="267" textAnchor="middle">q = 3</text>
      </g>
      <path className="diagram-callout accent" d="M323 244L258 132" />
      <g className="diagram-counts">
        <text x="80" y="312">V = 8</text><text x="190" y="312">E = 12</text><text x="310" y="312">F = 6</text>
      </g>
    </svg>
  );
}

function DoubleCountDiagram({ locale }: { locale: Locale }) {
  const faces = locale === "ru" ? "грани" : "faces";
  const vertices = locale === "ru" ? "вершины" : "vertices";
  const oneEdge = locale === "ru" ? "одно ребро" : "one edge";
  return (
    <svg viewBox="0 0 440 330" className="proof-svg" aria-hidden="true">
      <g className="count-panel">
        <rect x="24" y="36" width="188" height="250" rx="20" />
        <text className="panel-title" x="118" y="68" textAnchor="middle">pF · {faces}</text>
        <polygon className="count-face a" points="52,106 118,106 118,174 52,174" />
        <polygon className="count-face b" points="118,106 184,106 184,174 118,174" />
        <line className="count-edge" x1="118" y1="106" x2="118" y2="174" />
        <path className="count-arrow" d="M76 207C94 229 102 229 116 240M166 207C148 229 140 229 126 240" />
        <line className="result-edge" x1="88" y1="252" x2="153" y2="252" />
        <text className="times-two" x="120" y="222" textAnchor="middle">×2</text>
        <text className="small-label" x="120" y="277" textAnchor="middle">{oneEdge}</text>
      </g>
      <g className="count-panel right">
        <rect x="228" y="36" width="188" height="250" rx="20" />
        <text className="panel-title" x="322" y="68" textAnchor="middle">qV · {vertices}</text>
        <circle className="endpoint a" cx="273" cy="137" r="13" />
        <circle className="endpoint b" cx="371" cy="137" r="13" />
        <line className="count-edge" x1="273" y1="137" x2="371" y2="137" />
        <path className="endpoint-rays" d="M273 137L249 99M273 137L239 158M273 137L259 183M371 137L395 99M371 137L405 158M371 137L385 183" />
        <path className="count-arrow" d="M273 177C286 214 300 222 312 239M371 177C358 214 344 222 332 239" />
        <line className="result-edge" x1="289" y1="252" x2="355" y2="252" />
        <circle className="result-node" cx="289" cy="252" r="6" /><circle className="result-node" cx="355" cy="252" r="6" />
        <text className="times-two" x="322" y="222" textAnchor="middle">×2</text>
        <text className="small-label" x="322" y="277" textAnchor="middle">{oneEdge}</text>
      </g>
    </svg>
  );
}

function CurvatureDiagram() {
  const point = (p: number, q: number) => ({ x: 56 + 960 / p, y: 278 - 660 / q });
  return (
    <svg viewBox="0 0 440 330" className="proof-svg curvature-svg" aria-hidden="true">
      <path className="sphere-region" d="M216 58H376V168Z" />
      <path className="axis" d="M56 48V278H400" />
      <path className="diagram-grid-lines" d="M56 58H376V278" />
      <path className="flat-line" d="M216 58L376 168" />
      <g className="lattice-points">
        {[[3,3],[4,3],[5,3],[3,4],[3,5]].map(([p,q]) => <circle key={`${p}-${q}`} cx={point(p,q).x} cy={point(p,q).y} r="6"><title>{`{${p},${q}}`}</title></circle>)}
      </g>
      {[[3,6],[4,4],[6,3]].map(([p,q]) => <circle key={`${p}-${q}`} cx={point(p,q).x} cy={point(p,q).y} r="5" fill="#f2b84b"><title>{`{${p},${q}}`}</title></circle>)}
      <text className="axis-label" x="16" y="41">1/q</text>
      <text className="axis-label" x="393" y="301">1/p</text>
      <text className="small-label" x="22" y="63">1/3</text>
      <text className="small-label" x="364" y="298">1/3</text>
      <text className="small-label" x="41" y="296">0</text>
      <text className="zone-title positive" x="278" y="30">δ &gt; 0</text>
      <text className="zone-title negative" x="126" y="225">δ &lt; 0</text>
      <text className="zone-title boundary" x="234" y="199">x + y = 1/2</text>
      <text className="small-label" x="274" y="140">{`{4,4}`}</text>
    </svg>
  );
}

function EnumerationDiagram({ locale }: { locale: Locale }) {
  const values = [3, 4, 5, 6];
  const valid = new Set(["3-3", "3-4", "3-5", "4-3", "5-3"]);
  const admissible = locale === "ru" ? "допустимо" : "admissible";
  const excluded = locale === "ru" ? "исключено" : "excluded";
  return (
    <div className="integer-grid-wrap" aria-hidden="true">
      <div className="grid-axis q-axis">q</div>
      <div className="integer-grid">
        <span className="corner-cell" />
        {values.map((p) => <span key={`p-${p}`} className="grid-number">p={p}</span>)}
        {values.flatMap((q) => [
          <span key={`q-${q}`} className="grid-number">q={q}</span>,
          ...values.map((p) => {
            const key = `${p}-${q}`;
            return (
              <span key={key} className={`lattice-cell ${valid.has(key) ? "valid" : "invalid"} ${p === q ? "self-dual" : ""}`}>
                {valid.has(key) ? <Check size={17} /> : <span>×</span>}
              </span>
            );
          }),
        ])}
      </div>
      <div className="grid-legend"><span><i className="valid-dot" />{admissible}</span><span><i className="invalid-dot" />{excluded}</span><span><ArrowLeftRight size={14} />p ↔ q</span></div>
    </div>
  );
}

function ExistenceDiagram({ copy }: { copy: SiteCopy }) {
  return (
    <div className="existence-grid" aria-hidden="true">
      {SOLID_ORDER.map((key) => {
        const solid = SOLID_INFO[key];
        const c = counts(solid);
        return (
          <div className={`existence-card solid-${key}`} key={key}>
            <div className="mini-solid"><span /><span /><span /></div>
            <strong>{copy.solids[key].name}</strong>
            <small><InlineMath math={`\\{${solid.p},${solid.q}\\}`} /></small>
            <div><span>V {c.V}</span><span>E {c.E}</span><span>F {c.F}</span></div>
          </div>
        );
      })}
      <div className="proof-complete"><Check size={18} /><span>{copy.proof.steps[4].takeaway}</span></div>
    </div>
  );
}

export function ProofVisual({ step, locale, copy, stepCopy }: ProofVisualProps) {
  return (
    <div className={`proof-visual visual-step-${step + 1}`} role="img" aria-label={stepCopy.visualDescription}>
      <div className="proof-visual-inner">
        {step === 0 && <DefinitionsDiagram />}
        {step === 1 && <DoubleCountDiagram locale={locale} />}
        {step === 2 && <CurvatureDiagram />}
        {step === 3 && <EnumerationDiagram locale={locale} />}
        {step === 4 && <ExistenceDiagram copy={copy} />}
      </div>
      <div className="proof-caption"><MathText text={stepCopy.visualCaption} /></div>
    </div>
  );
}
