import { useEffect, useMemo, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import {
  ArrowDown,
  ArrowLeftRight,
  Check,
  ChevronRight,
  CircleDot,
  Eye,
  EyeOff,
  Pause,
  Play,
  Rotate3D,
  RotateCcw,
  Shapes,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import { DualCanvas, SolidCanvas } from "./components/platonic-scene";
import {
  counts,
  PAIR_TO_SOLID,
  SOLID_ORDER,
  SOLIDS,
  valuesForPair,
  type SolidKey,
} from "./lib/platonic";

type DisplayMode = "solid" | "glass" | "wire";

// Vinext's production serializer preserves escaped slashes in some client
// strings. Build TeX commands at runtime so KaTeX always receives one slash.
const TEX = String.fromCharCode(92);

const bodyTabs: { key: SolidKey; short: string }[] = [
  { key: "tetra", short: "Тетра" },
  { key: "cube", short: "Куб" },
  { key: "octa", short: "Окта" },
  { key: "dodeca", short: "Додека" },
  { key: "icosa", short: "Икоса" },
];

const dualPairs: { source: SolidKey; label: string; target: string }[] = [
  { source: "cube", label: "Куб", target: "Октаэдр" },
  { source: "dodeca", label: "Додекаэдр", target: "Икосаэдр" },
  { source: "tetra", label: "Тетраэдр", target: "Тетраэдр" },
];

const proofSteps = [
  {
    kicker: "Шаг 1 · язык графов",
    title: "Переведём геометрию в подсчёт",
    text: "Грани и рёбра выпуклого многогранника образуют связный плоский граф на сфере. У правильного многогранника каждая грань — один и тот же правильный p-угольник, а в каждой вершине сходится одно и то же число q рёбер.",
    formula: `p,q${TEX}ge 3`,
    note: "Двухугольная грань не ограничивает область, а две грани при вершине не создают пространственного угла.",
  },
  {
    kicker: "Шаг 2 · двойной подсчёт",
    title: "Посчитаем инцидентности двумя способами",
    text: "Каждое ребро принадлежит ровно двум граням. Аналогично, у каждого ребра два конца. Поэтому сумма числа рёбер по всем граням равна 2E, и сумма степеней всех вершин тоже равна 2E.",
    formula: `pF=2E,${TEX}qquad qV=2E`,
    note: "Это необходимые равенства для любого кандидата типа {p,q}.",
  },
  {
    kicker: "Шаг 3 · формула Эйлера",
    title: "Кривизна превращается в неравенство",
    text: "Подставим V=2E/q и F=2E/p в V−E+F=2. После деления на 2E получаем положительную добавку 1/E — именно она отличает сферу от плоской мозаики.",
    formula: `${TEX}frac{1}{p}+${TEX}frac{1}{q}=${TEX}frac{1}{2}+${TEX}frac{1}{E}>${TEX}frac{1}{2}`,
    note: "Если сумма равна 1/2, получается плоская мозаика; если меньше — гиперболическая, но не выпуклый многогранник.",
  },
  {
    kicker: "Шаг 4 · других пар нет",
    title: "Перебор становится конечным",
    text: "По двойственности можно сначала считать p≤q. Если p≥4, то 1/p+1/q≤1/2 — противоречие. Значит p=3. Тогда 1/3+1/q>1/2, откуда q<6. При q≥3 остаются q=3,4,5. Возвращая перестановки p↔q, получаем ровно пять пар.",
    formula: "(3,3),(4,3),(3,4),(5,3),(3,5)",
    note: "Здесь доказана невозможность всех остальных целочисленных вариантов.",
  },
  {
    kicker: "Шаг 5 · существование",
    title: "Необходимые условия ещё не гарантируют модель",
    text: "Теперь отдельно предъявляем пять конструкций: тетраэдр, куб, октаэдр, додекаэдр и икосаэдр. Для каждой модель выше действительно имеет правильные грани, одинаковое окружение каждой вершины и выпукла.",
    formula: `${TEX}underbrace{${TEX}exists${TEX},5}_{${TEX}text{существование}}${TEX}qquad+${TEX}qquad${TEX}underbrace{${TEX}nexists${TEX},${TEX}text{других типов}}_{${TEX}text{невозможность}}`,
    note: "Только вместе невозможность остальных пар и явное существование пяти моделей завершают доказательство.",
  },
];

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button className={`toggle ${active ? "is-active" : ""}`} type="button" onClick={onClick} aria-pressed={active}>
      {active ? <Eye size={15} /> : <EyeOff size={15} />}
      {children}
    </button>
  );
}

function Metric({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="metric">
      <span className="metric-dot" style={{ background: color }} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function Home() {
  const [solidKey, setSolidKey] = useState<SolidKey>("cube");
  const [mode, setMode] = useState<DisplayMode>("solid");
  const [parts, setParts] = useState({ faces: true, edges: true, vertices: true });
  const [dualSource, setDualSource] = useState<SolidKey>("cube");
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [proofStep, setProofStep] = useState(0);
  const [p, setP] = useState(3);
  const [q, setQ] = useState(5);

  const solid = SOLIDS[solidKey];
  const c = counts(solid);
  const source = SOLIDS[dualSource];
  const dualKey: Record<SolidKey, SolidKey> = { tetra: "tetra", cube: "octa", octa: "cube", dodeca: "icosa", icosa: "dodeca" };
  const target = SOLIDS[dualKey[dualSource]];
  const sourceCounts = counts(source);
  const targetCounts = counts(target);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const delta = (now - previous) / 1000;
      previous = now;
      setProgress((value) => {
        const next = value + delta / 4.8;
        if (next >= 1) {
          setPlaying(false);
          return 1;
        }
        return next;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const pairKey = `${p}-${q}`;
  const match = PAIR_TO_SOLID[pairKey];
  const pairValues = valuesForPair(p, q);
  const lhs = 1 / p + 1 / q;
  const eulerPass = lhs > 0.5;
  const selectedStep = proofSteps[proofStep];

  const pairCards = useMemo(
    () => SOLID_ORDER.map((key) => ({ data: SOLIDS[key], counts: counts(SOLIDS[key]) })),
    [],
  );

  return (
    <>
      <a className="skip-link" href="#main-content">Перейти к основному содержанию</a>
      <nav className="topbar" aria-label="Основная навигация">
        <a className="brand" href="#top"><span className="brand-mark"><Shapes aria-hidden="true" size={19} /></span><span>Платоновы тела</span></a>
        <div className="nav-links">
          <a href="#explore">Исследование</a>
          <a href="#duality">Двойственность</a>
          <a href="#proof">Доказательство</a>
          <a href="#lab">Лаборатория</a>
        </div>
        <a className="nav-cta" href="#explore">Начать <ChevronRight size={15} /></a>
      </nav>

      <main id="main-content" tabIndex={-1}>
      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14} /> Интерактивный геометрический атлас</div>
          <h1>Пять форм.<br /><em>Одна закономерность.</em></h1>
          <p>Вращайте правильные многогранники, постройте их двойственные тела и сами дойдите до причины, по которой шестого платонова тела не существует.</p>
          <div className="hero-actions">
            <a className="button primary" href="#explore">Исследовать тела <ArrowDown size={17} /></a>
            <a className="button ghost" href="#proof">К доказательству</a>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="hero-symbol">V − E + F</div><div className="hero-equals">= 2</div>
          <span className="floating-tag tag-one">{`{ p, q }`}</span>
          <span className="floating-tag tag-two">двойственность</span>
          <span className="floating-tag tag-three">Эйлер</span>
        </div>
        <div className="scroll-cue"><span>прокрутите</span><ArrowDown size={14} /></div>
      </section>

      <section className="section explore-section" id="explore">
        <header className="section-heading">
          <div><span className="section-index">01</span><div className="eyebrow">Исследуйте</div></div>
          <h2>Геометрия,<br />которую можно <em>повернуть</em></h2>
          <p>Каждая модель построена из точных координат. Грани вычисляются как опорные плоскости выпуклой оболочки, рёбра — как стороны этих граней.</p>
        </header>

        <div className="explorer-shell">
          <div className="solid-tabs" role="tablist" aria-label="Выберите многогранник">
            {bodyTabs.map((tab) => (
              <button key={tab.key} role="tab" aria-selected={solidKey === tab.key} className={solidKey === tab.key ? "active" : ""} onClick={() => setSolidKey(tab.key)}>
                <span>{SOLIDS[tab.key].symbol}</span>{tab.short}
              </button>
            ))}
          </div>
          <div className="canvas-panel">
            <div className="canvas-wrap">
              <SolidCanvas data={solid} mode={mode} showFaces={parts.faces} showEdges={parts.edges} showVertices={parts.vertices} />
              <div className="canvas-hint"><Rotate3D size={16} /> тяните, чтобы вращать <span>·</span><ZoomIn size={16} /> колесо — масштаб</div>
              <div className="solid-title"><span>{solid.symbol}</span><h3>{solid.name}</h3></div>
            </div>
            <aside className="control-panel">
              <div>
                <span className="panel-label">Комбинаторика</span>
                <div className="metrics">
                  <Metric label="вершин" value={c.V} color="var(--viz-vertex)" />
                  <Metric label="рёбер" value={c.E} color="var(--viz-edge)" />
                  <Metric label="граней" value={c.F} color={solid.color} />
                </div>
                <div className="euler-check">
                  <div><CircleDot size={17} /> Формула Эйлера</div>
                  <strong>{c.V} − {c.E} + {c.F} = <span>2</span></strong>
                </div>
              </div>
              <div>
                <span className="panel-label">Показывать</span>
                <div className="toggle-row">
                  <Toggle active={parts.vertices} onClick={() => setParts((v) => ({ ...v, vertices: !v.vertices }))}>Вершины</Toggle>
                  <Toggle active={parts.edges} onClick={() => setParts((v) => ({ ...v, edges: !v.edges }))}>Рёбра</Toggle>
                  <Toggle active={parts.faces} onClick={() => setParts((v) => ({ ...v, faces: !v.faces }))}>Грани</Toggle>
                </div>
              </div>
              <div>
                <span className="panel-label">Режим материала</span>
                <div className="mode-row">
                  {(["solid", "glass", "wire"] as DisplayMode[]).map((item) => (
                    <button key={item} onClick={() => setMode(item)} className={mode === item ? "active" : ""}>
                      {{ solid: "Сплошной", glass: "Прозрачный", wire: "Каркас" }[item]}
                    </button>
                  ))}
                </div>
              </div>
              <p className="solid-note">{solid.note}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section duality-section" id="duality">
        <header className="section-heading inverse">
          <div><span className="section-index">02</span><div className="eyebrow">Двойственность</div></div>
          <h2>Грань становится <em>вершиной</em></h2>
          <p>Поместим точку в центр каждой грани и соединим точки соседних граней. Возникает новый правильный многогранник — двойственный исходному.</p>
        </header>

        <div className="dual-layout">
          <div className="dual-stage">
            <div className="dual-tabs">
              {dualPairs.map((pair) => (
                <button key={pair.source} className={dualSource === pair.source ? "active" : ""} onClick={() => { setDualSource(pair.source); setProgress(0); setPlaying(false); }}>
                  {pair.label}<ArrowLeftRight size={14} />{pair.target}
                </button>
              ))}
            </div>
            <div className="dual-canvas"><DualCanvas source={source} progress={progress} /></div>
            <div className="timeline">
              <button type="button" aria-label={playing ? "Пауза" : "Воспроизвести"} onClick={() => { if (progress >= 1) setProgress(0); setPlaying((v) => !v); }}>
                {playing ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <input aria-label="Ход построения" type="range" min="0" max="1" step="0.001" value={progress} onChange={(event) => { setPlaying(false); setProgress(Number(event.target.value)); }} />
              <button type="button" aria-label="Сбросить" onClick={() => { setPlaying(false); setProgress(0); }}><RotateCcw size={17} /></button>
              <span>{Math.round(progress * 100)}%</span>
            </div>
          </div>
          <aside className="dual-story">
            <span className="panel-label">Как читать анимацию</span>
            {[
              [0.02, "01", "Центры граней", "В каждой исходной грани возникает новая вершина."],
              [0.28, "02", "Соседство", "Две новые вершины соединяются, если исходные грани делили ребро."],
              [0.68, "03", "Новая оболочка", "Рёбра замыкаются в грани двойственного тела."],
            ].map(([at, number, title, text]) => (
              <button key={String(number)} className={`story-step ${progress >= Number(at) ? "reached" : ""}`} onClick={() => setProgress(Number(at))}>
                <span>{number}</span><div><strong>{title}</strong><p>{text}</p></div>
              </button>
            ))}
            <div className="dual-equations">
              <div><span>V*</span><strong>{targetCounts.V}</strong><small>= F = {sourceCounts.F}</small></div>
              <div><span>E*</span><strong>{targetCounts.E}</strong><small>= E = {sourceCounts.E}</small></div>
              <div><span>F*</span><strong>{targetCounts.F}</strong><small>= V = {sourceCounts.V}</small></div>
            </div>
            <p className="double-dual"><ArrowLeftRight size={16} /> Повторение конструкции меняет местами вершины и грани ещё раз. Поэтому <InlineMath math={`(P^*)^*${TEX}cong P`} /> комбинаторно.</p>
          </aside>
        </div>
      </section>

      <section className="section proof-section" id="proof">
        <header className="section-heading">
          <div><span className="section-index">03</span><div className="eyebrow">Теорема</div></div>
          <h2>Почему их <em>ровно пять?</em></h2>
          <p>Аргумент короткий, но в нём важно не перепутать две задачи: исключить все прочие варианты и построить каждый из оставшихся.</p>
        </header>

        <div className="proof-shell">
          <div className="proof-steps" role="tablist" aria-label="Шаги доказательства">
            {proofSteps.map((step, index) => (
              <button key={step.kicker} role="tab" aria-selected={proofStep === index} className={proofStep === index ? "active" : proofStep > index ? "done" : ""} onClick={() => setProofStep(index)}>
                <span>{proofStep > index ? <Check size={15} /> : index + 1}</span><small>{step.title}</small>
              </button>
            ))}
          </div>
          <article className="proof-card">
            <div className="proof-copy">
              <div className="eyebrow">{selectedStep.kicker}</div>
              <h3>{selectedStep.title}</h3>
              <p>{selectedStep.text}</p>
              <div className="formula-card"><BlockMath math={selectedStep.formula} /></div>
              <div className="proof-note"><CircleDot size={17} /><span>{selectedStep.note}</span></div>
            </div>
            <div className="proof-visual" aria-hidden="true">
              <div className={`proof-glyph glyph-${proofStep + 1}`}>
                <span className="g-circle circle-one">p</span>
                <span className="g-circle circle-two">q</span>
                <span className="g-line" />
                <strong>{proofStep === 3 ? "5" : proofStep === 4 ? "∎" : "χ"}</strong>
              </div>
              <div className="proof-caption">{["граф на сфере", "каждое ребро — дважды", "положительная кривизна", "конечный список", "пять явных моделей"][proofStep]}</div>
            </div>
          </article>
          <div className="proof-nav">
            <button type="button" disabled={proofStep === 0} onClick={() => setProofStep((v) => Math.max(0, v - 1))}>Назад</button>
            <span>{proofStep + 1} / {proofSteps.length}</span>
            <button
              className="proof-next"
              type="button"
              onClick={() => {
                if (proofStep < proofSteps.length - 1) {
                  setProofStep((v) => v + 1);
                  return;
                }
                document.getElementById("lab")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {proofStep === proofSteps.length - 1 ? "В лабораторию" : "Дальше"} <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <section className="section lab-section" id="lab">
        <header className="section-heading inverse">
          <div><span className="section-index">04</span><div className="eyebrow">Лаборатория {`{p,q}`}</div></div>
          <h2>Попробуйте найти <em>шестое</em></h2>
          <p>Меняйте число сторон грани p и число рёбер при вершине q. Сферическая кривизна сразу покажет, где пространство «закрывается».</p>
        </header>

        <div className="lab-grid">
          <div className="sliders-card">
            <div className="slider-block">
              <div><label htmlFor="polygon-sides">Сторон в грани</label><strong>p = {p}</strong></div>
              <input id="polygon-sides" type="range" min="3" max="8" value={p} onChange={(e) => setP(Number(e.target.value))} />
              <div className="ticks">{[3,4,5,6,7,8].map((n) => <span key={n}>{n}</span>)}</div>
            </div>
            <div className="slider-block">
              <div><label htmlFor="vertex-edges">Рёбер при вершине</label><strong>q = {q}</strong></div>
              <input id="vertex-edges" type="range" min="3" max="8" value={q} onChange={(e) => setQ(Number(e.target.value))} />
              <div className="ticks">{[3,4,5,6,7,8].map((n) => <span key={n}>{n}</span>)}</div>
            </div>
            <button className="swap-button" type="button" onClick={() => { setP(q); setQ(p); }}><ArrowLeftRight size={16} /> Поменять p и q — перейти к двойственному</button>
          </div>

          <div className={`verdict-card ${eulerPass ? "pass" : "fail"}`}>
            <div className="verdict-icon">{eulerPass ? <Check size={28} /> : <X size={28} />}</div>
            <span className="panel-label">Проверка Эйлера</span>
            <BlockMath math={`${TEX}frac{1}{${p}}+${TEX}frac{1}{${q}}=${lhs.toFixed(3)}${eulerPass ? ">" : `${TEX}le`}${TEX}frac{1}{2}`} />
            <h3>{match ? SOLIDS[match].name : eulerPass ? "Кандидат проходит условие" : "Такого тела быть не может"}</h3>
            <p>{match ? `Это символ Шлефли ${SOLIDS[match].symbol}. Все необходимые числа целые, а модель существует.` : eulerPass ? "Неравенство выполнено, но проверьте целочисленность и явную конструкцию." : "Угловая сумма не оставляет положительной сферической кривизны."}</p>
            {pairValues && Number.isInteger(pairValues.E) && (
              <div className="mini-values"><span>V = {pairValues.V}</span><span>E = {pairValues.E}</span><span>F = {pairValues.F}</span></div>
            )}
          </div>
        </div>

        <div className="pair-table">
          <div className="pair-head"><span>Все допустимые пары</span><span>Двойственные пары расположены зеркально</span></div>
          <div className="pair-cards">
            {pairCards.map(({ data, counts: itemCounts }) => (
              <button key={data.key} className={match === data.key ? "active" : ""} onClick={() => { setP(data.p); setQ(data.q); }}>
                <div className="pair-symbol">{data.symbol}</div>
                <strong>{data.name}</strong>
                <span>{data.p}-угольник · {data.q} при вершине</span>
                <div><small>V {itemCounts.V}</small><small>E {itemCounts.E}</small><small>F {itemCounts.F}</small></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div><span className="brand-mark"><Shapes aria-hidden="true" size={16} /></span><strong>Пять тел. Два подсчёта. Одна сфера.</strong></div>
        <p>Интерактивный атлас правильных выпуклых многогранников.</p>
        <a href="#top">Наверх ↑</a>
      </footer>
      </main>
    </>
  );
}
