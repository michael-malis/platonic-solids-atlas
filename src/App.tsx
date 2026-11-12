import { useEffect, useMemo, useState } from "react";
import { BlockMath } from "./math";
import {
  ArrowDown, ArrowLeftRight, Check, ChevronRight, CircleDot, Eye, EyeOff,
  Pause, Play, Rotate3D, RotateCcw, Shapes, Sparkles, X, ZoomIn,
} from "lucide-react";
import { DeferredScene } from "./components/deferred-scene";
import { scrollBehavior, useDocumentVisible, useSceneVisibility } from "./lib/visibility";
import { ProofVisual } from "./components/proof-visual";
import { COPY, localeFromPath, type Locale } from "./content";
import { angleData, counts, DUAL_KEY, PAIR_TO_SOLID, SOLID_ORDER, SOLID_INFO, valuesForPair, type SolidKey } from "./lib/solid-data";

type DisplayMode = "solid" | "glass" | "wire";

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button className={`toggle ${active ? "is-active" : ""}`} type="button" onClick={onClick} aria-pressed={active}>
      {active ? <Eye size={15} /> : <EyeOff size={15} />}{children}
    </button>
  );
}

function Metric({ label, value, color }: { label: string; value: number; color: string }) {
  return <div className="metric"><span className="metric-dot" style={{ background: color }} /><span>{label}</span><strong>{value}</strong></div>;
}

function languagePath(locale: Locale) {
  const base = import.meta.env.BASE_URL;
  return locale === "ru" ? `${base}ru/` : base;
}

function applyRuntimeMetadata(locale: Locale) {
  const copy = COPY[locale];
  const pageUrl = new URL(languagePath(locale), window.location.origin).href;
  const setMeta = (selector: string, value: string) => document.querySelector(selector)?.setAttribute("content", value);
  document.documentElement.lang = locale;
  document.title = copy.meta.title;
  setMeta('meta[name="description"]', copy.meta.description);
  setMeta('meta[property="og:title"]', copy.meta.title);
  setMeta('meta[property="og:description"]', copy.meta.description);
  setMeta('meta[property="og:url"]', pageUrl);
  setMeta('meta[property="og:locale"]', locale === "ru" ? "ru_RU" : "en_US");
  setMeta('meta[property="og:locale:alternate"]', locale === "ru" ? "en_US" : "ru_RU");
  setMeta('meta[name="twitter:title"]', copy.meta.title);
  setMeta('meta[name="twitter:description"]', copy.meta.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", pageUrl);
  const schema = document.getElementById("site-schema");
  if (schema) schema.textContent = JSON.stringify({
    "@context": "https://schema.org", "@type": "EducationalApplication", name: copy.meta.title,
    description: copy.meta.description, url: pageUrl, applicationCategory: "EducationalApplication",
    educationalLevel: "Secondary education, undergraduate", inLanguage: locale, isAccessibleForFree: true,
  });
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>(() => localeFromPath());
  const [solidKey, setSolidKey] = useState<SolidKey>("cube");
  const [mode, setMode] = useState<DisplayMode>("solid");
  const [parts, setParts] = useState({ faces: true, edges: true, vertices: true });
  const [dualSource, setDualSource] = useState<SolidKey>("cube");
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [proofStep, setProofStep] = useState(0);
  const [p, setP] = useState(3);
  const [q, setQ] = useState(5);
  const explorerScene = useSceneVisibility();
  const dualScene = useSceneVisibility();
  const documentVisible = useDocumentVisible();
  const dualActive = dualScene.visible && documentVisible;

  const copy = COPY[locale];
  const solid = SOLID_INFO[solidKey];
  const c = counts(solid);
  const source = SOLID_INFO[dualSource];
  const target = SOLID_INFO[DUAL_KEY[dualSource]];
  const sourceCounts = counts(source);
  const targetCounts = counts(target);

  useEffect(() => { applyRuntimeMetadata(locale); }, [locale]);
  useEffect(() => {
    const syncLocale = () => setLocale(localeFromPath());
    window.addEventListener("popstate", syncLocale);
    return () => window.removeEventListener("popstate", syncLocale);
  }, []);
  useEffect(() => {
    if (!playing || !dualActive) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const delta = (now - previous) / 1000;
      previous = now;
      setProgress((value) => {
        const next = value + delta / 4.8;
        if (next >= 1) { setPlaying(false); return 1; }
        return next;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, dualActive]);

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    window.history.pushState({ locale: next }, "", `${languagePath(next)}${window.location.hash}`);
    setLocale(next);
  };
  const match = PAIR_TO_SOLID[`${p}-${q}`];
  const pairValues = valuesForPair(p, q);
  const lhs = 1 / p + 1 / q;
  const eulerPass = lhs > 0.5;
  const selectedStep = copy.proof.steps[proofStep];
  const profile = copy.atlas.profiles[solidKey];
  const angles = angleData(p, q);
  const formatAngle = (value: number) => new Intl.NumberFormat(locale === "ru" ? "ru-RU" : "en-US", { maximumFractionDigits: 1 }).format(value);
  const pairCards = useMemo(() => SOLID_ORDER.map((key) => ({ data: SOLID_INFO[key], counts: counts(SOLID_INFO[key]) })), []);

  return (
    <>
      <a className="skip-link" href="#main-content">{copy.skip}</a>
      <nav className="topbar" aria-label={copy.nav.aria}>
        <a className="brand" href="#top"><span className="brand-mark"><Shapes aria-hidden="true" size={19} /></span><span>{copy.brand}</span></a>
        <div className="nav-links"><a href="#explore">{copy.nav.explore}</a><a href="#duality">{copy.nav.duality}</a><a href="#proof">{copy.nav.proof}</a><a href="#lab">{copy.nav.lab}</a></div>
        <div className="nav-actions">
          <div className="language-switch" role="group" aria-label={copy.language.label}>
            <button type="button" className={locale === "en" ? "active" : ""} aria-pressed={locale === "en"} aria-label={copy.language.english} onClick={() => switchLocale("en")}>EN</button>
            <button type="button" className={locale === "ru" ? "active" : ""} aria-pressed={locale === "ru"} aria-label={copy.language.russian} onClick={() => switchLocale("ru")}>RU</button>
          </div>
          <a className="nav-cta" href="#explore">{copy.nav.start} <ChevronRight size={15} /></a>
        </div>
      </nav>

      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> {copy.hero.eyebrow}</div>
            <h1>{copy.hero.line1}<br /><em>{copy.hero.line2}</em></h1><p>{copy.hero.text}</p>
            <div className="hero-actions"><a className="button primary" href="#explore">{copy.hero.explore} <ArrowDown size={17} /></a><a className="button ghost" href="#proof">{copy.hero.proof}</a></div>
          </div>
          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="hero-symbol">V − E + F</div><div className="hero-equals">= 2</div>
            <span className="floating-tag tag-one">{`{ p, q }`}</span><span className="floating-tag tag-two">{copy.hero.duality}</span><span className="floating-tag tag-three">{copy.hero.euler}</span>
          </div>
          <div className="scroll-cue"><span>{copy.hero.scroll}</span><ArrowDown size={14} /></div>
        </section>

        <section className="section explore-section light-grid" id="explore">
          <header className="section-heading"><div><span className="section-index">01</span><div className="eyebrow">{copy.explore.eyebrow}</div></div><h2>{copy.explore.title1}<br /><em>{copy.explore.title2}</em></h2><p>{copy.explore.text}</p></header>
          <div className="explorer-shell">
            <div className="atlas-intro"><h3>{copy.atlas.intro.title}</h3><p>{copy.atlas.intro.text}</p><p>{copy.atlas.intro.notation}</p></div>
            <div className="solid-tabs" role="tablist" aria-label={copy.explore.choose}>{SOLID_ORDER.map((key) => (
              <button key={key} type="button" role="tab" aria-selected={solidKey === key} className={solidKey === key ? "active" : ""} onClick={(event) => { setSolidKey(key); event.currentTarget.scrollIntoView({ behavior: scrollBehavior(), block: "nearest", inline: "center" }); }}><span>{SOLID_INFO[key].symbol}</span>{copy.solids[key].short}</button>
            ))}</div>
            <div className="canvas-panel">
              <div className="canvas-wrap dark-stars" ref={explorerScene.ref}><DeferredScene kind="solid" solidKey={solidKey} mode={mode} showFaces={parts.faces} showEdges={parts.edges} showVertices={parts.vertices} active={explorerScene.visible && documentVisible} ready={explorerScene.ready} copy={copy.atlas.scene} /><div className="canvas-hint"><Rotate3D size={16} /> {copy.explore.hintDrag} <span>·</span><ZoomIn size={16} /> {copy.explore.hintZoom}</div><div className="solid-title"><span>{solid.symbol}</span><h3>{copy.solids[solidKey].name}</h3></div></div>
              <aside className="control-panel">
                <div><span className="panel-label">{copy.explore.combinatorics}</span><div className="metrics"><Metric label={copy.explore.vertices} value={c.V} color="var(--viz-vertex)" /><Metric label={copy.explore.edges} value={c.E} color="var(--viz-edge)" /><Metric label={copy.explore.faces} value={c.F} color={solid.color} /></div><div className="euler-check"><div><CircleDot size={17} /> {copy.explore.euler}</div><strong>{c.V} − {c.E} + {c.F} = <span>2</span></strong></div></div>
                <div><span className="panel-label">{copy.explore.show}</span><div className="toggle-row"><Toggle active={parts.vertices} onClick={() => setParts((value) => ({ ...value, vertices: !value.vertices }))}>{copy.explore.vertices}</Toggle><Toggle active={parts.edges} onClick={() => setParts((value) => ({ ...value, edges: !value.edges }))}>{copy.explore.edges}</Toggle><Toggle active={parts.faces} onClick={() => setParts((value) => ({ ...value, faces: !value.faces }))}>{copy.explore.faces}</Toggle></div></div>
                <div><span className="panel-label">{copy.explore.material}</span><div className="mode-row">{(["solid", "glass", "wire"] as DisplayMode[]).map((item) => <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={mode === item ? "active" : ""}>{copy.explore.modes[item]}</button>)}</div></div>
                <p className="solid-note">{copy.solids[solidKey].note}</p>
              </aside>
            </div>
            <div className="solid-profile" aria-label={copy.solids[solidKey].name}>
              {(["structure", "duality", "notice"] as const).map((part, index) => <div key={part}><h3>{copy.atlas.profileLabels[index]}</h3><p>{profile[part]}</p>{solidKey === "dodeca" && part === "notice" && <BlockMath math={String.raw`\varphi=\frac{1+\sqrt5}{2}\approx1.618`} />}</div>)}
            </div>
          </div>
        </section>

        <section className="section duality-section dark-stars" id="duality">
          <header className="section-heading inverse"><div><span className="section-index">02</span><div className="eyebrow">{copy.duality.eyebrow}</div></div><h2>{copy.duality.title1} <em>{copy.duality.title2}</em></h2><p>{copy.duality.text}</p></header>
          <div className="dual-layout">
            <div className="dual-stage" ref={dualScene.ref}>
              <div className="dual-tabs">{copy.duality.pairs.map((pair) => <button key={pair.source} type="button" aria-pressed={dualSource === pair.source} className={dualSource === pair.source ? "active" : ""} onClick={() => { setDualSource(pair.source); setProgress(0); setPlaying(false); }}>{pair.label}<ArrowLeftRight size={14} />{pair.target}</button>)}</div>
              <div className="dual-canvas"><DeferredScene kind="dual" solidKey={dualSource} progress={progress} active={dualActive} ready={dualScene.ready} copy={copy.atlas.scene} /></div>
              <div className="timeline"><button type="button" aria-label={playing ? copy.duality.pause : copy.duality.play} onClick={() => { if (progress >= 1) setProgress(0); setPlaying((value) => !value); }}>{playing ? <Pause size={18} /> : <Play size={18} />}</button><input aria-label={copy.duality.progress} type="range" min="0" max="1" step="0.001" value={progress} onChange={(event) => { setPlaying(false); setProgress(Number(event.target.value)); }} /><button type="button" aria-label={copy.duality.reset} onClick={() => { setPlaying(false); setProgress(0); }}><RotateCcw size={17} /></button><span>{Math.round(progress * 100)}%</span></div>
            </div>
            <aside className="dual-story"><span className="panel-label">{copy.duality.guide}</span>{copy.duality.story.map((story, index) => { const at = [0.02, 0.28, 0.68][index]; return <button key={story.number} type="button" className={`story-step ${progress >= at ? "reached" : ""}`} onClick={() => { setPlaying(false); setProgress(at); }}><span>{story.number}</span><div><strong>{story.title}</strong><p>{story.text}</p></div></button>; })}<div className="dual-equations"><div><span>V*</span><strong>{targetCounts.V}</strong><small>= F = {sourceCounts.F}</small></div><div><span>E*</span><strong>{targetCounts.E}</strong><small>= E = {sourceCounts.E}</small></div><div><span>F*</span><strong>{targetCounts.F}</strong><small>= V = {sourceCounts.V}</small></div></div><p className="double-dual"><ArrowLeftRight size={16} /><span>{copy.duality.doubleDual}</span></p></aside>
          </div>
          <div className="incidence-copy"><h3>{copy.atlas.incidence.title}</h3><p>{copy.atlas.incidence.text}</p><BlockMath math={String.raw`\{p,q\}\longleftrightarrow\{q,p\}`} /></div>
        </section>

        <section className="section proof-section light-grid" id="proof">
          <header className="section-heading"><div><span className="section-index">03</span><div className="eyebrow">{copy.proof.eyebrow}</div></div><h2>{copy.proof.title1} <em>{copy.proof.title2}</em></h2><p>{copy.proof.text}</p></header>
          <div className="proof-shell">
            <div className="proof-choice"><CircleDot size={16} />{copy.proof.choose}</div>
            <div className="proof-steps" role="tablist" aria-label={copy.proof.stepsAria}>{copy.proof.steps.map((step, index) => <button key={step.kicker} type="button" role="tab" aria-selected={proofStep === index} className={proofStep === index ? "active" : proofStep > index ? "done" : ""} onClick={() => setProofStep(index)}><span>{proofStep > index ? <Check size={16} /> : index + 1}</span><small>{step.short}</small></button>)}</div>
            <article className="proof-card"><div className="proof-copy"><div className="eyebrow">{selectedStep.kicker}</div><h3>{selectedStep.title}</h3><p>{selectedStep.text}</p><div className="formula-card"><BlockMath math={selectedStep.formula} /></div><div className="proof-note"><CircleDot size={17} /><span>{selectedStep.takeaway}</span></div>{proofStep === 4 && <p className="uniqueness-note">{copy.atlas.uniqueness}</p>}</div><ProofVisual step={proofStep} locale={locale} copy={copy} stepCopy={selectedStep} /></article>
            <div className="proof-nav"><button type="button" disabled={proofStep === 0} onClick={() => setProofStep((value) => Math.max(0, value - 1))}>{copy.proof.back}</button><span>{proofStep + 1} / {copy.proof.steps.length}</span><button className="proof-next" type="button" onClick={() => { if (proofStep < copy.proof.steps.length - 1) setProofStep((current) => current + 1); else document.getElementById("lab")?.scrollIntoView({ behavior: scrollBehavior() }); }}>{proofStep === copy.proof.steps.length - 1 ? copy.proof.toLab : copy.proof.next} <ChevronRight size={15} /></button></div>
          </div>
        </section>

        <section className="section lab-section dark-stars" id="lab">
          <header className="section-heading inverse"><div><span className="section-index">04</span><div className="eyebrow">{copy.lab.eyebrow}</div></div><h2>{copy.lab.title1} <em>{copy.lab.title2}</em></h2><p>{copy.lab.text}</p></header>
          <div className="lab-grid">
            <div className="sliders-card"><div className="slider-block"><div><label htmlFor="polygon-sides">{copy.lab.polygonSides}</label><strong>p = {p}</strong></div><input id="polygon-sides" type="range" min="3" max="8" value={p} onChange={(event) => setP(Number(event.target.value))} /><div className="ticks">{[3,4,5,6,7,8].map((value) => <span key={value}>{value}</span>)}</div></div><div className="slider-block"><div><label htmlFor="vertex-edges">{copy.lab.vertexEdges}</label><strong>q = {q}</strong></div><input id="vertex-edges" type="range" min="3" max="8" value={q} onChange={(event) => setQ(Number(event.target.value))} /><div className="ticks">{[3,4,5,6,7,8].map((value) => <span key={value}>{value}</span>)}</div></div><button className="swap-button" type="button" onClick={() => { setP(q); setQ(p); }}><ArrowLeftRight size={16} /> {copy.lab.swap}</button></div>
            <div className={`verdict-card ${eulerPass ? "pass" : "fail"}`}><div className="verdict-icon">{eulerPass ? <Check size={28} /> : <X size={28} />}</div><span className="panel-label">{copy.lab.eulerCheck}</span><BlockMath math={`\\frac{1}{${p}}+\\frac{1}{${q}}\\approx${lhs.toFixed(3)}${eulerPass ? ">" : "\\le"}\\frac{1}{2}`} /><h3>{match ? copy.solids[match].name : eulerPass ? copy.lab.candidate : copy.lab.impossible}</h3><p>{match ? copy.lab.matchText.replace("{symbol}", SOLID_INFO[match].symbol) : eulerPass ? copy.lab.candidateText : copy.lab.impossibleText}</p>{pairValues && Number.isInteger(pairValues.E) && <div className="mini-values"><span>V = {pairValues.V}</span><span>E = {pairValues.E}</span><span>F = {pairValues.F}</span></div>}</div>
          </div>
          <div className="angle-explainer">
            <h3>{copy.atlas.angles.heading}</h3>
            <div className="angle-values">{[angles.faceAngle, angles.total, angles.defect].map((value, index) => <div key={index}><span>{copy.atlas.angleLabels[index]}</span><strong>{index === 1 ? `${q} × ${formatAngle(angles.faceAngle)}° = ` : ""}{formatAngle(value)}°</strong></div>)}</div>
            <p>{angles.defect > 0 ? copy.atlas.angles.positive : angles.defect === 0 ? copy.atlas.angles.zero : copy.atlas.angles.negative}</p>
            <details><summary>{copy.atlas.angleDetails}</summary><p>{copy.atlas.angleExplanation}</p><BlockMath math={String.raw`\alpha=\frac{(p-2)\pi}{p},\qquad\delta=2\pi-q\alpha`} /><BlockMath math={String.raw`\delta=2\pi q\left(\frac1p+\frac1q-\frac12\right)`} /></details>
          </div>
          <div className="pair-table"><div className="pair-head"><span>{copy.lab.allPairs}</span><span>{copy.lab.mirror}</span></div><div className="pair-cards">{pairCards.map(({ data, counts: itemCounts }) => <button key={data.key} type="button" aria-pressed={match === data.key} className={match === data.key ? "active" : ""} onClick={() => { setP(data.p); setQ(data.q); }}><div className="pair-symbol">{data.symbol}</div><strong>{copy.solids[data.key].name}</strong><span>{data.p}{copy.lab.polygon} · {data.q} {copy.lab.atVertex}</span><div><small>V {itemCounts.V}</small><small>E {itemCounts.E}</small><small>F {itemCounts.F}</small></div></button>)}</div></div>
          <p className="atlas-conclusion">{copy.atlas.angles.conclusion}</p>
        </section>
        <footer><div><span className="brand-mark"><Shapes aria-hidden="true" size={16} /></span><strong>{copy.footer.statement}</strong></div><p>{copy.footer.text}</p><a href="#top">{copy.footer.top}</a></footer>
      </main>
    </>
  );
}
