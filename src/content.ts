import type { SolidKey } from "./lib/platonic";

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
    text: "Every model uses exact coordinates. Faces are recovered as supporting planes of the convex hull; edges are the sides of those faces.",
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
        visualCaption: "one p-gonal face · one q-valent vertex",
        visualDescription: "A highlighted polygon represents a p-sided face, and a highlighted vertex has q incident edges. V, E, and F label the counted objects.",
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
        takeaway: "Therefore 1/p + 1/q > 1/2. Equality belongs to flat tilings, not convex polyhedra.",
        visualCaption: "positive · flat boundary · negative",
        visualDescription: "A curvature map places admissible pairs above the one-half boundary, with flat and hyperbolic regions separated below.",
      },
      {
        kicker: "Step 4 · no other pairs",
        short: "Enumerate pairs",
        title: "The inequality makes the search finite",
        text: "Duality lets us first assume p≤q. If p≥4, then both reciprocals are at most 1/4, contradicting the strict inequality. Hence p=3, and 1/3+1/q>1/2 gives q<6. Since q≥3, only q=3,4,5 remain; reflecting across p=q restores the two dual partners.",
        formula: String.raw`(3,3),\ (4,3),\ (3,4),\ (5,3),\ (3,5)`,
        takeaway: "The lattice check is exhaustive: every other integer pair is excluded.",
        visualCaption: "five lattice points survive",
        visualDescription: "An integer p-q grid highlights exactly five admissible cells and mirrors dual pairs across the diagonal p equals q.",
      },
      {
        kicker: "Step 5 · existence",
        short: "Realise the five",
        title: "Candidates are not yet constructions",
        text: "The inequality proves that no other integer patterns can occur, but a necessary condition does not build a polyhedron. We therefore exhibit the tetrahedron, cube, octahedron, dodecahedron, and icosahedron. Each has regular faces, the required vertex degree, and is convex, so every surviving pair is realised.",
        formula: String.raw`\text{five candidates}+\text{five constructions}\Longrightarrow\text{exactly five}`,
        takeaway: "Exhaustiveness plus existence completes the classification.",
        visualCaption: "all five patterns are realised",
        visualDescription: "Five solid cards list the Schläfli symbol and V, E, F values, grouped into dual pairs with the tetrahedron self-dual.",
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
    text: "Каждая модель построена из точных координат. Грани вычисляются как опорные плоскости выпуклой оболочки, рёбра — как стороны этих граней.",
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
        visualCaption: "одна p-угольная грань · одна вершина степени q",
        visualDescription: "Выделенный многоугольник изображает грань с p сторонами, выделенная вершина имеет q входящих рёбер, а V, E и F отмечают подсчитываемые объекты.",
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
        takeaway: "Значит, 1/p + 1/q > 1/2. Равенство соответствует плоской мозаике, а не выпуклому многограннику.",
        visualCaption: "положительная · плоская граница · отрицательная",
        visualDescription: "Карта кривизны располагает допустимые пары выше границы одна вторая и отделяет плоскую и гиперболическую области.",
      },
      {
        kicker: "Шаг 4 · других пар нет",
        short: "Переберём пары",
        title: "Неравенство делает перебор конечным",
        text: "Благодаря двойственности сначала можно считать p≤q. Если p≥4, обе обратные величины не превосходят 1/4, что противоречит строгому неравенству. Следовательно, p=3, а из 1/3+1/q>1/2 получаем q<6. При q≥3 остаются только q=3,4,5; отражение относительно p=q возвращает две двойственные пары.",
        formula: String.raw`(3,3),\ (4,3),\ (3,4),\ (5,3),\ (3,5)`,
        takeaway: "Перебор исчерпывающий: все остальные целочисленные пары исключены.",
        visualCaption: "на целочисленной сетке остаются пять точек",
        visualDescription: "Сетка p и q выделяет ровно пять допустимых клеток и отражает двойственные пары относительно диагонали p равно q.",
      },
      {
        kicker: "Шаг 5 · существование",
        short: "Построим пять",
        title: "Допустимая пара ещё не является конструкцией",
        text: "Неравенство доказывает, что других целочисленных схем быть не может, но необходимое условие само по себе не строит многогранник. Поэтому отдельно предъявим тетраэдр, куб, октаэдр, додекаэдр и икосаэдр. У каждого правильные грани, требуемая степень вершин и выпуклость — значит, все пять пар действительно реализуются.",
        formula: String.raw`\text{пять кандидатов}+\text{пять конструкций}\Longrightarrow\text{ровно пять}`,
        takeaway: "Только исключение других пар вместе с существованием пяти моделей завершает классификацию.",
        visualCaption: "все пять схем реализованы",
        visualDescription: "Пять карточек тел показывают символ Шлефли и значения V, E, F; двойственные пары сгруппированы, а тетраэдр отмечен как самодвойственный.",
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
