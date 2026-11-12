import type { SolidKey } from "./lib/solid-data";

export type AtlasCopy = {
  intro: { title: string; text: string; notation: string };
  profileLabels: string[];
  profiles: Record<SolidKey, { structure: string; duality: string; notice: string }>;
  incidence: { title: string; text: string };
  angles: { heading: string; positive: string; zero: string; negative: string; conclusion: string };
  angleLabels: string[];
  angleDetails: string;
  angleExplanation: string;
  uniqueness: string;
  scene: { loading: string; error: string; retry: string };
};

export const ATLAS_COPY: Record<"en" | "ru", AtlasCopy> = {
  "en": {
    "intro": {
      "title": "What makes a solid Platonic?",
      "text": "All its faces are identical regular polygons, and every vertex has the same arrangement of faces. The solid is also convex: a straight segment between any two points inside it stays inside. These simple rules leave just five possibilities.",
      "notation": "The Schläfli symbol $\\{p,q\\}$ is a compact description: $p$ sides per face, $q$ faces meeting at each vertex. For a cube, $\\{4,3\\}$ means squares, three at a corner. The same $q$ also counts the edges leaving that vertex."
    },
    "profileLabels": [
      "Structure",
      "The dual",
      "What to notice"
    ],
    "profiles": {
      "tetra": {
        "structure": "Three equilateral triangles meet at every vertex. A convex polyhedron needs at least four vertices; the tetrahedron attains that minimum.",
        "duality": "Each of the four face centers becomes a vertex of another tetrahedron. Vertices and faces exchange roles, but the type of solid stays the same: this is self-duality.",
        "notice": "Every pair of vertices is joined by an edge. Switch off the faces: the six edges connect all six possible pairs."
      },
      "cube": {
        "structure": "Three squares meet at every vertex. Counting the corners of all six squares gives 24 contributions, but each vertex is counted three times: $\\frac{24}{3}=8$ vertices.",
        "duality": "Its six face centers become the six vertices of an octahedron. The cube's eight vertices correspond to eight triangular dual faces; the twelve edges are preserved.",
        "notice": "An axis through the centers of opposite faces allows a quarter-turn: after $90^\\circ$ the cube occupies the same position. There are three such axes, one for each pair of opposite faces."
      },
      "octa": {
        "structure": "Four equilateral triangles meet at every vertex. Picture two square pyramids joined along their bases: the shared square is inside, leaving eight triangular faces outside.",
        "duality": "Its eight face centers form a cube. Four faces surround each original vertex, so each corresponding dual face is a square. This reverses the cube-to-octahedron construction.",
        "notice": "Its three quarter-turn axes pass through opposite vertices. In an aligned cube–octahedron pair they are the cube's quarter-turn axes too: duality preserves these rotational symmetries."
      },
      "dodeca": {
        "structure": "Three regular pentagons meet at every vertex. Each face angle is $108^\\circ$, so a corner uses $324^\\circ$. The $36^\\circ$ missing from a full turn is its angle defect. Four pentagons would already exceed $360^\\circ$.",
        "duality": "Its twelve face centers form an icosahedron. The twenty vertices become twenty triangular faces: three original faces meet at each vertex.",
        "notice": "In each pentagonal face, the diagonal is $\\varphi=\\frac{1+\\sqrt5}{2}\\approx1.618$ times the side. The golden ratio is built into the face's geometry."
      },
      "icosa": {
        "structure": "Five equilateral triangles meet at every vertex: $5\\cdot 60^\\circ=300^\\circ$. The remaining $60^\\circ$ is the angle defect. Six triangles would fill $360^\\circ$ and lie flat instead of forming a convex corner.",
        "duality": "Its twenty face centers form a dodecahedron. Five original faces surround each vertex, so the corresponding dual face has five sides.",
        "notice": "It has the most faces of the five Platonic solids, but still only twelve vertices. Duality exchanges this balance with the dodecahedron's twenty vertices and twelve faces."
      }
    },
    "incidence": {
      "title": "Why the counts swap",
      "text": "Every original edge lies between two faces. Their centers define one dual edge, so $E^*=E$. Walk around an original vertex: the surrounding face centers close into one dual face. This explains $V^*=F$ and $F^*=V$, and why $\\{p,q\\}$ becomes $\\{q,p\\}$. Repeating the construction restores which vertices, edges and faces are connected, though not necessarily the original size."
    },
    "angles": {
      "heading": "What happens at a corner?",
      "positive": "The face angles add up to less than $360^\\circ$. The missing angle is the angle defect: a necessary local condition for a convex corner. The five models above show which regular solids actually realise these patterns.",
      "zero": "The face angles fill exactly $360^\\circ$, leaving no convex corner. The patterns $\\{3,6\\}$, $\\{4,4\\}$ and $\\{6,3\\}$ instead make the familiar regular tilings of the plane.",
      "negative": "The face angles exceed $360^\\circ$. They cannot meet at a vertex of a convex polyhedron, so this pair is excluded.",
      "conclusion": "A local rule, a global limit: $\\{p,q\\}$ describes a corner, duality swaps its two numbers, and Euler's formula leaves five candidate pairs. The five actual models complete the picture."
    },
    "angleLabels": [
      "Face angle",
      "Around the vertex",
      "Angle defect"
    ],
    "angleDetails": "How does this connect to Euler?",
    "angleExplanation": "A regular $p$-gon's interior angle is $\\alpha$. With $q$ faces at a vertex, subtract their sum from a full turn. The positive factor $2\\pi q$ means that the defect and Euler’s inequality have the same sign.",
    "uniqueness": "For regular convex polyhedra, each pair determines a single type. This classical uniqueness result is separate from the counting argument.",
    "scene": {
      "loading": "Loading the 3D model…",
      "error": "The 3D model could not load.",
      "retry": "Try again"
    }
  },
  "ru": {
    "intro": {
      "title": "Что делает многогранник платоновым?",
      "text": "Все его грани — одинаковые правильные многоугольники, а в каждой вершине грани устроены одинаково. Кроме того, тело выпукло: отрезок между любыми двумя точками внутри него остаётся внутри. Эти простые правила оставляют всего пять возможностей.",
      "notation": "Символ Шлефли $\\{p,q\\}$ — короткая запись устройства: $p$ сторон у грани, $q$ граней при вершине. Для куба $\\{4,3\\}$ означает квадраты, по три в каждом углу. Число $q$ также показывает, сколько рёбер выходит из вершины."
    },
    "profileLabels": [
      "Устройство",
      "Двойственность",
      "Что заметить"
    ],
    "profiles": {
      "tetra": {
        "structure": "В каждой вершине встречаются три равносторонних треугольника. Выпуклому многограннику нужны хотя бы четыре вершины; тетраэдр достигает этого минимума.",
        "duality": "Центры четырёх граней становятся вершинами другого тетраэдра. Вершины и грани меняются ролями, а тип тела сохраняется: это самодвойственность.",
        "notice": "Любые две вершины соединены ребром. Отключите грани: шесть рёбер соединяют все шесть возможных пар."
      },
      "cube": {
        "structure": "В каждой вершине встречаются три квадрата. У шести квадратов всего 24 угла, но каждая вершина посчитана трижды: $\\frac{24}{3}=8$ вершин.",
        "duality": "Центры шести граней становятся шестью вершинами октаэдра. Восемь вершин куба отвечают восьми треугольным граням двойственного тела; двенадцать рёбер сохраняются.",
        "notice": "Вокруг оси через центры противоположных граней куб можно повернуть на четверть оборота: после $90^\\circ$ он займёт прежнее положение. Таких осей три — по одной на каждую пару противоположных граней."
      },
      "octa": {
        "structure": "В каждой вершине встречаются четыре равносторонних треугольника. Представьте две квадратные пирамиды, соединённые основаниями: общий квадрат находится внутри, а снаружи остаются восемь треугольных граней.",
        "duality": "Центры восьми граней образуют куб. Каждую исходную вершину окружают четыре грани, поэтому соответствующая двойственная грань — квадрат. Это обратное построение к переходу от куба к октаэдру.",
        "notice": "Три оси поворота на четверть оборота проходят через противоположные вершины. В совмещённой паре «куб — октаэдр» это те же оси, что и у куба: двойственность сохраняет эти вращательные симметрии."
      },
      "dodeca": {
        "structure": "В каждой вершине встречаются три правильных пятиугольника. Угол грани равен $108^\\circ$, поэтому на вершину приходится $324^\\circ$. Недостающие до полного оборота $36^\\circ$ — угловой дефект. Четыре пятиугольника уже превысили бы $360^\\circ$.",
        "duality": "Центры двенадцати граней образуют икосаэдр. Двадцать вершин превращаются в двадцать треугольных граней: у каждой исходной вершины сходятся три грани.",
        "notice": "В каждой пятиугольной грани диагональ в $\\varphi=\\frac{1+\\sqrt5}{2}\\approx1{,}618$ раза длиннее стороны. Золотое отношение здесь возникает из геометрии самой грани."
      },
      "icosa": {
        "structure": "В каждой вершине встречаются пять равносторонних треугольников: $5\\cdot 60^\\circ=300^\\circ$. Оставшиеся $60^\\circ$ — угловой дефект. Шесть треугольников заполнили бы $360^\\circ$ и легли плоско, не образуя выпуклого угла.",
        "duality": "Центры двадцати граней образуют додекаэдр. Каждую вершину окружают пять исходных граней, поэтому соответствующая двойственная грань имеет пять сторон.",
        "notice": "У него больше всего граней среди пяти платоновых тел, но всего двенадцать вершин. Двойственность меняет этот баланс на двадцать вершин и двенадцать граней додекаэдра."
      }
    },
    "incidence": {
      "title": "Почему числа меняются местами",
      "text": "Каждое исходное ребро разделяет две грани. Их центры задают одно двойственное ребро, поэтому $E^*=E$. Обойдите исходную вершину: центры окружающих граней замкнутся в одну двойственную грань. Так получаются $V^*=F$ и $F^*=V$, а $\\{p,q\\}$ превращается в $\\{q,p\\}$. Повторение построения восстанавливает связи вершин, рёбер и граней, хотя не обязательно исходный размер."
    },
    "angles": {
      "heading": "Что происходит у вершины?",
      "positive": "Сумма углов граней меньше $360^\\circ$. Недостающий угол — угловой дефект: необходимое локальное условие выпуклой вершины. Пять моделей выше показывают, какие правильные тела действительно реализуют эти схемы.",
      "zero": "Углы граней заполняют ровно $360^\\circ$, не оставляя выпуклого угла. Схемы $\\{3,6\\}$, $\\{4,4\\}$ и $\\{6,3\\}$ вместо этого дают правильные мозаики плоскости.",
      "negative": "Сумма углов граней превышает $360^\\circ$. Они не могут встретиться в вершине выпуклого многогранника, поэтому такая пара исключена.",
      "conclusion": "Локальное правило и общее ограничение: $\\{p,q\\}$ описывает вершину, двойственность меняет два числа местами, а формула Эйлера оставляет пять пар-кандидатов. Пять настоящих моделей завершают картину."
    },
    "angleLabels": [
      "Угол грани",
      "Сумма при вершине",
      "Угловой дефект"
    ],
    "angleDetails": "Как это связано с Эйлером?",
    "angleExplanation": "Внутренний угол правильного $p$-угольника обозначен $\\alpha$. Из полного оборота вычтем сумму углов $q$ граней. Множитель $2\\pi q$ положителен, поэтому знак дефекта совпадает со знаком выражения в неравенстве Эйлера.",
    "uniqueness": "Для правильных выпуклых многогранников каждая пара определяет единственный тип. Этот классический факт единственности — отдельная часть классификации, а не следствие одного подсчёта.",
    "scene": {
      "loading": "Загружаем 3D-модель…",
      "error": "Не удалось загрузить 3D-модель.",
      "retry": "Повторить"
    }
  }
};
