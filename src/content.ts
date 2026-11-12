import type { SolidKey } from "./lib/platonic";
import { ATLAS_COPY, type AtlasCopy } from "./atlas-copy";

export type Locale = "en" | "ru";

export type ProofStepCopy = {
  kicker: string;
  short: string;
  title: string;
  text: string;
  formula: string;
  takeaway: string;
  visualCaption: string;
  visualDescription: string;
};

type SolidCopy = { name: string; short: string; note: string };
type DualPairCopy = { source: SolidKey; label: string; target: string };

export type SiteCopy = {
  atlas: AtlasCopy;
  meta: { title: string; description: string };
  skip: string;
  brand: string;
  nav: { explore: string; duality: string; proof: string; lab: string; start: string; aria: string };
  language: { label: string; english: string; russian: string };
  hero: {
    eyebrow: string; line1: string; line2: string; text: string; explore: string; proof: string;
    scroll: string; duality: string; euler: string;
  };
  explore: {
    eyebrow: string; title1: string; title2: string; text: string; choose: string; hintDrag: string;
    hintZoom: string; combinatorics: string; vertices: string; edges: string; faces: string; euler: string;
    show: string; material: string; modes: Record<"solid" | "glass" | "wire", string>;
  };
  solids: Record<SolidKey, SolidCopy>;
  duality: {
    eyebrow: string; title1: string; title2: string; text: string; pairs: DualPairCopy[];
    play: string; pause: string; reset: string; progress: string; guide: string;
    story: Array<{ number: string; title: string; text: string }>;
    doubleDual: string;
  };
  proof: {
    eyebrow: string; title1: string; title2: string; text: string; choose: string; stepsAria: string;
    back: string; next: string; toLab: string; steps: ProofStepCopy[];
  };
  lab: {
    eyebrow: string; title1: string; title2: string; text: string; polygonSides: string; vertexEdges: string;
    swap: string; eulerCheck: string; candidate: string; impossible: string; matchText: string;
    candidateText: string; impossibleText: string; allPairs: string; mirror: string; polygon: string;
    atVertex: string;
  };
  footer: { statement: string; text: string; top: string };
};

const en: SiteCopy = {
  atlas: ATLAS_COPY.en,
  meta: {
    title: "Platonic Solids Atlas — 3D Duality and Euler's Formula",
    description: "An interactive 3D atlas of the five Platonic solids, their duality, and the Euler argument showing why there are exactly five.",
  },
  skip: "Skip to main content",
  brand: "Platonic solids",
  nav: { explore: "Explore", duality: "Duality", proof: "Proof", lab: "Laboratory", start: "Start", aria: "Primary navigation" },
  language: { label: "Language", english: "English", russian: "Russian" },
  hero: {
    eyebrow: "Interactive geometry atlas",
    line1: "Five forms.",
    line2: "One pattern.",
    text: "Rotate the regular polyhedra, build their duals, and discover why a sixth Platonic solid cannot exist.",
    explore: "Explore the solids",
    proof: "See the proof",
    scroll: "scroll",
    duality: "duality",
    euler: "Euler",
  },
  explore: {
    eyebrow: "Explore",
    title1: "Geometry",
    title2: "you can rotate",
    text: "Start with one face, then look at a corner. The same local pattern repeats across the whole solid. Switch off faces or edges to see how the structure fits together.",
    choose: "Choose a solid",
    hintDrag: "drag to rotate",
    hintZoom: "wheel to zoom",
    combinatorics: "Combinatorics",
    vertices: "vertices",
    edges: "edges",
    faces: "faces",
    euler: "Euler's formula",
    show: "Show",
    material: "Material mode",
    modes: { solid: "Solid", glass: "Transparent", wire: "Wireframe" },
  },
  solids: {
    tetra: { name: "Tetrahedron", short: "Tetrahedron", note: "Four equilateral triangles. It is self-dual." },
    cube: { name: "Cube", short: "Cube", note: "Six squares; three faces meet at every vertex." },
    octa: { name: "Octahedron", short: "Octahedron", note: "Eight triangles; dual to the cube." },
    dodeca: { name: "Dodecahedron", short: "Dodecahedron", note: "Twelve regular pentagons; dual to the icosahedron." },
    icosa: { name: "Icosahedron", short: "Icosahedron", note: "Twenty triangles; dual to the dodecahedron." },
  },
  duality: {
    eyebrow: "Duality",
    title1: "A face becomes",
    title2: "a vertex",
    text: "Place a point at the center of every face and join points whose original faces share an edge. A new regular polyhedron — the dual — appears.",
    pairs: [
      { source: "cube", label: "Cube", target: "Octahedron" },
      { source: "dodeca", label: "Dodecahedron", target: "Icosahedron" },
      { source: "tetra", label: "Tetrahedron", target: "Tetrahedron" },
    ],
    play: "Play construction",
    pause: "Pause construction",
    reset: "Reset construction",
    progress: "Construction progress",
    guide: "How to read the animation",
    story: [
      { number: "01", title: "Face centers", text: "A new vertex appears at the center of every original face." },
      { number: "02", title: "Adjacency", text: "Two new vertices are joined when the original faces shared an edge." },
      { number: "03", title: "New shell", text: "The new edges close into faces of the dual polyhedron." },
    ],
    doubleDual: "Repeating the construction swaps vertices and faces once more, so the double dual has the same combinatorial structure as the original.",
  },
  proof: {
    eyebrow: "The theorem",
    title1: "Why exactly",
    title2: "five?",
    text: "The argument has two distinct jobs: rule out every other integer pattern, then show that each of the five surviving patterns is actually realised.",
    choose: "Choose a proof step",
    stepsAria: "Steps of the proof",
    back: "Back",
    next: "Next",
    toLab: "Open the laboratory",
    steps: [
      {
        kicker: "Step 1 · the graph language",
        short: "Name the data",
        title: "Turn geometry into countable data",
        text: "Trace the edges and vertices of a regular convex polyhedron as a graph on a sphere. Every face is the same regular p-gon, exactly q edges meet at each vertex, and V, E, F count vertices, edges, and faces. A genuine polygon and a spatial corner each need at least three sides.",
        formula: String.raw`p,q\ge 3`,
        takeaway: "The classification problem is now encoded by the integer pair {p,q}.",
        visualCaption: "cube example: p = 4, q = 3 · schematic view",
        visualDescription: "A schematic cube highlights one square face with four sides and one vertex with three incident edges. The counts are V=8, E=12 and F=6.",
      },
      {
        kicker: "Step 2 · double counting",
        short: "Count incidences",
        title: "Count every edge twice — in two ways",
        text: "The F faces contribute p edge-sides each, but every actual edge borders two faces, so pF=2E. Likewise, the V vertices contribute q edge-ends each, while every edge has exactly two endpoints, so qV=2E. The coefficient 2 records the same edge from opposite sides of each count.",
        formula: String.raw`pF=2E,\qquad qV=2E`,
        takeaway: "Both local regularity conditions now connect directly to the global edge count.",
        visualCaption: "face-sides pair into edges · endpoints pair into edges",
        visualDescription: "Two incidence diagrams show two face contributions and two endpoint contributions meeting at each edge.",
      },
      {
        kicker: "Step 3 · Euler's formula",
        short: "Extract curvature",
        title: "Euler's formula leaves a positive remainder",
        text: "Substitute V=2E/q and F=2E/p into V−E+F=2. Dividing by 2E isolates 1/E, which is positive because a polyhedron has finitely many edges. This positive remainder is the algebraic signal that the graph closes on a sphere rather than extending as a flat tiling.",
        formula: String.raw`\frac{2E}{q}-E+\frac{2E}{p}=2\ \Longrightarrow\ \frac1p+\frac1q-\frac12=\frac1E>0`,
        takeaway: "Therefore 1/p + 1/q > 1/2. The equality pairs {3,6}, {4,4} and {6,3} instead give flat tilings.",
        visualCaption: "angle defect: positive above the line, zero on it",
        visualDescription: "On axes x=1/p and y=1/q, both from zero to one third, the straight line x+y=1/2 separates positive and negative angle defect. Five admissible pairs lie above it; three flat examples lie on it.",
      },
      {
        kicker: "Step 4 · no other pairs",
        short: "Enumerate pairs",
        title: "The inequality makes the search finite",
        text: "The inequality is unchanged when p and q swap, so first take p≤q. If p≥4, both reciprocals are at most 1/4: their sum cannot exceed 1/2. Hence p=3, and 1/3+1/q>1/2 gives q<6. Only q=3,4,5 remain; swapping the numbers restores the two dual partners.",
        formula: String.raw`(3,3),\ (4,3),\ (3,4),\ (5,3),\ (3,5)`,
        takeaway: "The lattice check is exhaustive: every other integer pair is excluded.",
        visualCaption: "five lattice points survive",
        visualDescription: "An integer p-q grid highlights exactly five admissible cells and mirrors dual pairs across the diagonal p equals q.",
      },
      {
        kicker: "Step 5 · existence",
        short: "Realise the five",
        title: "Candidates are not yet constructions",
        text: "The inequality leaves five pairs, but it does not build a solid. The models above realise all five: the tetrahedron, cube, octahedron, dodecahedron and icosahedron. Each is convex, with the required regular faces and vertex pattern.",
        formula: String.raw`\text{five pairs}\ \longleftrightarrow\ \text{five models}`,
        takeaway: "Euler restricts the patterns; the models establish existence.",
        visualCaption: "all five patterns are realised",
        visualDescription: "Five cards list each realised model's name, Schläfli symbol and V, E, F values. The small icons are decorative.",
      },
    ],
  },
  lab: {
    eyebrow: "Laboratory {p,q}",
    title1: "Try to find",
    title2: "a sixth",
    text: "Change the number of sides p and the vertex degree q. The curvature test immediately shows whether the pattern can close on a sphere.",
    polygonSides: "Sides in each face",
    vertexEdges: "Edges at each vertex",
    swap: "Swap p and q — take the dual",
    eulerCheck: "Euler test",
    candidate: "The pair passes the inequality",
    impossible: "No such convex regular solid",
    matchText: "This is the Schläfli symbol {symbol}. The counts are integral and the model exists.",
    candidateText: "The inequality holds, but integrality and an explicit construction must still be checked.",
    impossibleText: "The angle pattern leaves no positive spherical curvature.",
    allPairs: "All admissible pairs",
    mirror: "Dual pairs are mirrored",
    polygon: "-gon",
    atVertex: "at each vertex",
  },
  footer: { statement: "Five solids. Two counts. One sphere.", text: "An interactive atlas of regular convex polyhedra.", top: "Back to top ↑" },
};

const ru: SiteCopy = {
  atlas: ATLAS_COPY.ru,
  meta: {
    title: "Атлас платоновых тел — 3D-двойственность и формула Эйлера",
    description: "Интерактивный 3D-атлас пяти платоновых тел, их двойственности и аргумента Эйлера, объясняющего, почему их ровно пять.",
  },
  skip: "Перейти к основному содержанию",
  brand: "Платоновы тела",
  nav: { explore: "Исследование", duality: "Двойственность", proof: "Доказательство", lab: "Лаборатория", start: "Начать", aria: "Основная навигация" },
  language: { label: "Язык", english: "Английский", russian: "Русский" },
  hero: {
    eyebrow: "Интерактивный геометрический атлас",
    line1: "Пять форм.",
    line2: "Одна закономерность.",
    text: "Вращайте правильные многогранники, постройте их двойственные тела и сами дойдите до причины, по которой шестого платонова тела не существует.",
    explore: "Исследовать тела",
    proof: "К доказательству",
    scroll: "прокрутите",
    duality: "двойственность",
    euler: "Эйлер",
  },
  explore: {
    eyebrow: "Исследуйте",
    title1: "Геометрия,",
    title2: "которую можно повернуть",
    text: "Начните с одной грани, затем рассмотрите вершину. Один и тот же узор повторяется по всему телу. Отключайте грани или рёбра, чтобы увидеть, как устроена конструкция.",
    choose: "Выберите многогранник",
    hintDrag: "тяните, чтобы вращать",
    hintZoom: "колесо — масштаб",
    combinatorics: "Комбинаторика",
    vertices: "вершин",
    edges: "рёбер",
    faces: "граней",
    euler: "Формула Эйлера",
    show: "Показывать",
    material: "Режим материала",
    modes: { solid: "Сплошной", glass: "Прозрачный", wire: "Каркас" },
  },
  solids: {
    tetra: { name: "Тетраэдр", short: "Тетраэдр", note: "Четыре равносторонних треугольника. Самодвойственен." },
    cube: { name: "Куб", short: "Куб", note: "Шесть квадратов; в каждой вершине встречаются три грани." },
    octa: { name: "Октаэдр", short: "Октаэдр", note: "Восемь треугольников; двойственен кубу." },
    dodeca: { name: "Додекаэдр", short: "Додекаэдр", note: "Двенадцать правильных пятиугольников; двойственен икосаэдру." },
    icosa: { name: "Икосаэдр", short: "Икосаэдр", note: "Двадцать треугольников; двойственен додекаэдру." },
  },
  duality: {
    eyebrow: "Двойственность",
    title1: "Грань становится",
    title2: "вершиной",
    text: "Поместим точку в центр каждой грани и соединим точки соседних граней. Возникает новый правильный многогранник — двойственный исходному.",
    pairs: [
      { source: "cube", label: "Куб", target: "Октаэдр" },
      { source: "dodeca", label: "Додекаэдр", target: "Икосаэдр" },
      { source: "tetra", label: "Тетраэдр", target: "Тетраэдр" },
    ],
    play: "Воспроизвести построение",
    pause: "Приостановить построение",
    reset: "Сбросить построение",
    progress: "Ход построения",
    guide: "Как читать анимацию",
    story: [
      { number: "01", title: "Центры граней", text: "В центре каждой исходной грани возникает новая вершина." },
      { number: "02", title: "Соседство", text: "Новые вершины соединяются, если исходные грани имели общее ребро." },
      { number: "03", title: "Новая оболочка", text: "Новые рёбра замыкаются в грани двойственного тела." },
    ],
    doubleDual: "Повторение конструкции ещё раз меняет местами вершины и грани, поэтому двойственное к двойственному имеет ту же комбинаторную структуру, что и исходное тело.",
  },
  proof: {
    eyebrow: "Теорема",
    title1: "Почему их",
    title2: "ровно пять?",
    text: "У аргумента две разные задачи: исключить все прочие целочисленные схемы, а затем показать, что каждая из пяти оставшихся действительно реализуется.",
    choose: "Выберите шаг доказательства",
    stepsAria: "Шаги доказательства",
    back: "Назад",
    next: "Дальше",
    toLab: "В лабораторию",
    steps: [
      {
        kicker: "Шаг 1 · язык графов",
        short: "Зададим данные",
        title: "Переведём геометрию в подсчёт",
        text: "Рёбра и вершины правильного выпуклого многогранника образуют граф на сфере. Каждая грань — один и тот же правильный p-угольник, а в каждой вершине сходятся ровно q рёбер. Буквы V, E и F обозначают числа вершин, рёбер и граней. Для настоящей грани и пространственного угла нужно не меньше трёх сторон.",
        formula: String.raw`p,q\ge 3`,
        takeaway: "Задача классификации теперь закодирована целочисленной парой {p,q}.",
        visualCaption: "пример куба: p = 4, q = 3 · схема",
        visualDescription: "Схематический куб: выделена квадратная грань с четырьмя сторонами и вершина с тремя рёбрами. Числа элементов: V=8, E=12, F=6.",
      },
      {
        kicker: "Шаг 2 · двойной подсчёт",
        short: "Посчитаем связи",
        title: "Дважды посчитаем каждое ребро",
        text: "Все F граней дают по p сторон, но каждое настоящее ребро принадлежит двум граням, поэтому pF=2E. Аналогично, V вершин дают по q концов рёбер, а у каждого ребра ровно два конца, поэтому qV=2E. Коэффициент 2 возникает не формально: в обоих подсчётах одно ребро встречается с двух сторон.",
        formula: String.raw`pF=2E,\qquad qV=2E`,
        takeaway: "Оба локальных условия правильности связаны с общим числом рёбер.",
        visualCaption: "стороны граней образуют рёбра · концы соединяются в рёбра",
        visualDescription: "Две схемы инцидентностей показывают по два вклада от граней и по два вклада от концов для каждого ребра.",
      },
      {
        kicker: "Шаг 3 · формула Эйлера",
        short: "Выделим кривизну",
        title: "Формула Эйлера оставляет положительную добавку",
        text: "Подставим V=2E/q и F=2E/p в равенство V−E+F=2. После деления на 2E остаётся величина 1/E, которая положительна, потому что у многогранника конечное ненулевое число рёбер. Именно эта добавка отличает замкнутый граф на сфере от бесконечной плоской мозаики.",
        formula: String.raw`\frac{2E}{q}-E+\frac{2E}{p}=2\ \Longrightarrow\ \frac1p+\frac1q-\frac12=\frac1E>0`,
        takeaway: "Значит, 1/p + 1/q > 1/2. Пары с равенством {3,6}, {4,4} и {6,3} дают плоские мозаики.",
        visualCaption: "угловой дефект: над прямой положительный, на ней нулевой",
        visualDescription: "Оси x=1/p и y=1/q идут от нуля до одной трети. Прямая x+y=1/2 разделяет положительный и отрицательный угловой дефект. Пять допустимых пар лежат выше неё, три плоских примера — на ней.",
      },
      {
        kicker: "Шаг 4 · других пар нет",
        short: "Переберём пары",
        title: "Неравенство делает перебор конечным",
        text: "Неравенство симметрично по p и q, поэтому сначала рассмотрим p≤q. Если p≥4, обе обратные величины не превосходят 1/4: сумма не может быть больше 1/2. Значит, p=3, а из 1/3+1/q>1/2 получаем q<6. Остаются q=3,4,5; перестановка чисел возвращает две двойственные пары.",
        formula: String.raw`(3,3),\ (4,3),\ (3,4),\ (5,3),\ (3,5)`,
        takeaway: "Перебор исчерпывающий: все остальные целочисленные пары исключены.",
        visualCaption: "на целочисленной сетке остаются пять точек",
        visualDescription: "Сетка p и q выделяет ровно пять допустимых клеток и отражает двойственные пары относительно диагонали p равно q.",
      },
      {
        kicker: "Шаг 5 · существование",
        short: "Построим пять",
        title: "Допустимая пара ещё не является конструкцией",
        text: "Неравенство оставляет пять пар, но само по себе не строит тело. Модели выше реализуют все пять: тетраэдр, куб, октаэдр, додекаэдр и икосаэдр. У каждого есть выпуклость, правильные грани и нужное устройство вершин.",
        formula: String.raw`\text{пять пар}\ \longleftrightarrow\ \text{пять моделей}`,
        takeaway: "Эйлер ограничивает возможные схемы; модели подтверждают существование.",
        visualCaption: "все пять схем реализованы",
        visualDescription: "Пять карточек показывают названия построенных моделей, символы Шлефли и значения V, E, F. Маленькие значки декоративные.",
      },
    ],
  },
  lab: {
    eyebrow: "Лаборатория {p,q}",
    title1: "Попробуйте найти",
    title2: "шестое",
    text: "Меняйте число сторон p и степень вершины q. Проверка кривизны сразу покажет, может ли такая схема замкнуться на сфере.",
    polygonSides: "Сторон в грани",
    vertexEdges: "Рёбер при вершине",
    swap: "Поменять p и q — перейти к двойственному",
    eulerCheck: "Проверка Эйлера",
    candidate: "Пара проходит неравенство",
    impossible: "Такого правильного выпуклого тела нет",
    matchText: "Это символ Шлефли {symbol}. Все числа целые, и модель существует.",
    candidateText: "Неравенство выполнено, но ещё нужны целочисленность и явная конструкция.",
    impossibleText: "Угловая схема не оставляет положительной сферической кривизны.",
    allPairs: "Все допустимые пары",
    mirror: "Двойственные пары расположены зеркально",
    polygon: "-угольник",
    atVertex: "при вершине",
  },
  footer: { statement: "Пять тел. Два подсчёта. Одна сфера.", text: "Интерактивный атлас правильных выпуклых многогранников.", top: "Наверх ↑" },
};

export const COPY: Record<Locale, SiteCopy> = { en, ru };

export function localeFromPath(pathname = window.location.pathname): Locale {
  return /\/ru\/?$/.test(pathname) ? "ru" : "en";
}
