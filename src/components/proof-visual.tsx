import { ArrowLeftRight, Check } from "lucide-react";
import type { Locale, ProofStepCopy, SiteCopy } from "../content";
import { counts, SOLID_ORDER, SOLIDS } from "../lib/platonic";

type ProofVisualProps = {
  step: number;
  locale: Locale;
  copy: SiteCopy;
  stepCopy: ProofStepCopy;
};

function DefinitionsDiagram({ locale }: { locale: Locale }) {
  const face = locale === "ru" ? "грань" : "face";
  const vertex = locale === "ru" ? "вершина" : "vertex";
  return (
    <svg viewBox="0 0 440 330" className="proof-svg" aria-hidden="true">
      <g className="diagram-grid-lines">
        <path d="M28 74H412M28 138H412M28 202H412M28 266H412" />
        <path d="M92 28V302M156 28V302M220 28V302M284 28V302M348 28V302" />
      </g>
      <g className="diagram-muted-graph">
        <path d="M50 238L121 181L188 229L252 169L329 216L391 151" />
        <path d="M121 181L136 94L211 67L252 169L188 229L136 94" />
        <path d="M211 67L302 85L329 216M302 85L391 151" />
      </g>
      <polygon className="diagram-face" points="121,181 136,94 211,67 252,169 188,229" />
      <path className="diagram-vertex-rays" d="M329 216L252 169M329 216L302 85M329 216L391 151M329 216L381 270" />
      <circle className="diagram-vertex" cx="329" cy="216" r="11" />
      <g className="diagram-label">
        <rect x="54" y="46" width="105" height="36" rx="18" />
        <text x="106" y="69" textAnchor="middle">p · {face}</text>
      </g>
      <path className="diagram-callout" d="M158 75L180 103" />
      <g className="diagram-label accent">
        <rect x="302" y="244" width="116" height="36" rx="18" />
        <text x="360" y="267" textAnchor="middle">q · {vertex}</text>
      </g>
      <path className="diagram-callout accent" d="M339 244L330 226" />
      <g className="diagram-counts">
        <text x="45" y="312">V</text><text x="77" y="312">E</text><text x="109" y="312">F</text>
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
        <polygon className="count-face a" points="52,126 92,90 132,126 116,174 68,174" />
        <polygon className="count-face b" points="104,126 144,90 184,126 168,174 120,174" />
        <line className="count-edge" x1="116" y1="174" x2="120" y2="174" />
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

function CurvatureDiagram({ locale }: { locale: Locale }) {
  const spherical = locale === "ru" ? "сфера" : "sphere";
  const flat = locale === "ru" ? "плоскость" : "flat";
  const hyperbolic = locale === "ru" ? "гиперболическая" : "hyperbolic";
  return (
    <svg viewBox="0 0 440 330" className="proof-svg curvature-svg" aria-hidden="true">
      <defs>
        <linearGradient id="curvatureFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2dd4bf" stopOpacity=".32" />
          <stop offset="1" stopColor="#2dd4bf" stopOpacity=".03" />
        </linearGradient>
      </defs>
      <path className="axis" d="M56 278V42M56 278H404" />
      <path className="sphere-region" d="M56 42H404V110C329 125 247 159 177 205C124 240 86 263 56 278Z" />
      <path className="flat-line" d="M56 278C103 249 139 224 177 205C247 159 329 125 404 110" />
      <g className="lattice-points">
        <circle cx="174" cy="111" r="8" /><circle cx="231" cy="137" r="8" /><circle cx="282" cy="153" r="8" />
        <circle cx="149" cy="153" r="8" /><circle cx="130" cy="188" r="8" />
      </g>
      <text className="zone-title positive" x="265" y="70">{spherical} · &gt; 1/2</text>
      <text className="zone-title boundary" x="285" y="199">{flat} · = 1/2</text>
      <text className="zone-title negative" x="254" y="259">{hyperbolic} · &lt; 1/2</text>
      <text className="axis-label" x="28" y="48">1/q</text><text className="axis-label" x="382" y="306">1/p</text>
      <g className="positive-chip">
        <rect x="76" y="52" width="102" height="38" rx="19" />
        <text x="127" y="76" textAnchor="middle">1/E &gt; 0</text>
      </g>
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
        const solid = SOLIDS[key];
        const c = counts(solid);
        return (
          <div className={`existence-card solid-${key}`} key={key}>
            <div className="mini-solid"><span /><span /><span /></div>
            <strong>{copy.solids[key].name}</strong>
            <small>{solid.symbol}</small>
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
        {step === 0 && <DefinitionsDiagram locale={locale} />}
        {step === 1 && <DoubleCountDiagram locale={locale} />}
        {step === 2 && <CurvatureDiagram locale={locale} />}
        {step === 3 && <EnumerationDiagram locale={locale} />}
        {step === 4 && <ExistenceDiagram copy={copy} />}
      </div>
      <div className="proof-caption">{stepCopy.visualCaption}</div>
    </div>
  );
}
