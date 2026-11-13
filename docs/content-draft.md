# Atlas copy - editorial draft

Audience: curious web visitor, school geometry, thoughtful popular mathematics / accessible first-year depth. Preserve atlas, existing design and models. EN is default, RU equivalent. This draft precedes integration. Formulas below render through KaTeX in the app. All profile sections update with the selected solid.

## Introduction, before solid selector

EN heading: What makes a solid Platonic?

All its faces are identical regular polygons, and every vertex has the same arrangement of faces. The solid is also convex: a straight segment between any two points inside it stays inside. These simple rules leave just five possibilities.

EN notation: The Schläfli symbol {p,q} is a compact description: p sides per face, q faces meeting at each vertex. For a cube, {4,3} means squares, three at a corner. The same q also counts the edges leaving that vertex.

RU heading: Что делает многогранник платоновым?

Все его грани - одинаковые правильные многоугольники, а в каждой вершине грани устроены одинаково. Кроме того, тело выпукло: отрезок между любыми двумя точками внутри него остаётся внутри. Эти простые правила оставляют всего пять возможностей.

RU notation: Символ Шлефли {p,q} - короткая запись устройства: p сторон у грани, q граней при вершине. Для куба {4,3} означает квадраты, по три в каждом углу. Число q также показывает, сколько рёбер выходит из вершины.

## Explorer header replacement

EN: Start with one face, then look at a corner. The same local pattern repeats across the whole solid. Switch off faces or edges to see how the structure fits together.

RU: Начните с одной грани, затем рассмотрите вершину. Один и тот же узор повторяется по всему телу. Отключайте грани или рёбра, чтобы увидеть, как устроена конструкция.

## Profiles: structure / duality / what to notice

### Tetrahedron

EN structure: Three equilateral triangles meet at every vertex. A convex polyhedron needs at least four vertices; the tetrahedron attains that minimum.

EN duality: Each of the four face centers becomes a vertex of another tetrahedron. Vertices and faces exchange roles, but the type of solid stays the same: this is self-duality.

EN notice: Every pair of vertices is joined by an edge. Switch off the faces: the six edges connect all six possible pairs.

RU structure: В каждой вершине встречаются три равносторонних треугольника. Выпуклому многограннику нужны хотя бы четыре вершины; тетраэдр достигает этого минимума.

RU duality: Центры четырёх граней становятся вершинами другого тетраэдра. Вершины и грани меняются ролями, а тип тела сохраняется: это самодвойственность.

RU notice: Любые две вершины соединены ребром. Отключите грани: шесть рёбер соединяют все шесть возможных пар.

### Cube

EN structure: Three squares meet at every vertex. Counting the corners of all six squares gives 24 contributions, but each vertex is counted three times: 24/3=8 vertices.

EN duality: Its six face centers become the six vertices of an octahedron. The cube's eight vertices correspond to eight triangular dual faces; the twelve edges are preserved.

EN notice: An axis through the centers of opposite faces allows a quarter-turn: after 90° the cube occupies the same position. There are three such axes, one for each pair of opposite faces.

RU structure: В каждой вершине встречаются три квадрата. У шести квадратов всего 24 угла, но каждая вершина посчитана трижды: 24/3=8 вершин.

RU duality: Центры шести граней становятся шестью вершинами октаэдра. Восемь вершин куба отвечают восьми треугольным граням двойственного тела; двенадцать рёбер сохраняются.

RU notice: Вокруг оси через центры противоположных граней куб можно повернуть на четверть оборота: после 90° он займёт прежнее положение. Таких осей три - по одной на каждую пару противоположных граней.

### Octahedron

EN structure: Four equilateral triangles meet at every vertex. Picture two square pyramids joined along their bases: the shared square is inside, leaving eight triangular faces outside.

EN duality: Its eight face centers form a cube. Four faces surround each original vertex, so each corresponding dual face is a square. This reverses the cube-to-octahedron construction.

EN notice: Its three quarter-turn axes pass through opposite vertices. In an aligned cube–octahedron pair they are the cube's quarter-turn axes too: duality preserves these rotational symmetries.

RU structure: В каждой вершине встречаются четыре равносторонних треугольника. Представьте две квадратные пирамиды, соединённые основаниями: общий квадрат находится внутри, а снаружи остаются восемь треугольных граней.

RU duality: Центры восьми граней образуют куб. Каждую исходную вершину окружают четыре грани, поэтому соответствующая двойственная грань - квадрат. Это обратное построение к переходу от куба к октаэдру.

RU notice: Три оси поворота на четверть оборота проходят через противоположные вершины. В совмещённой паре «куб - октаэдр» это те же оси, что и у куба: двойственность сохраняет эти вращательные симметрии.

### Dodecahedron

EN structure: Three regular pentagons meet at every vertex. Each face angle is 108°, so a corner uses 324°. The 36° missing from a full turn is its angle defect. Four pentagons would already exceed 360°.

EN duality: Its twelve face centers form an icosahedron. The twenty vertices become twenty triangular faces: three original faces meet at each vertex.

EN notice: In each pentagonal face, the diagonal is φ=(1+√5)/2≈1.618 times the side. The golden ratio is built into the face's geometry.

RU structure: В каждой вершине встречаются три правильных пятиугольника. Угол грани равен 108°, поэтому на вершину приходится 324°. Недостающие до полного оборота 36° - угловой дефект. Четыре пятиугольника уже превысили бы 360°.

RU duality: Центры двенадцати граней образуют икосаэдр. Двадцать вершин превращаются в двадцать треугольных граней: у каждой исходной вершины сходятся три грани.

RU notice: В каждой пятиугольной грани диагональ в φ=(1+√5)/2≈1,618 раза длиннее стороны. Золотое отношение здесь возникает из геометрии самой грани.

### Icosahedron

EN structure: Five equilateral triangles meet at every vertex: 5×60°=300°. The remaining 60° is the angle defect. Six triangles would fill 360° and lie flat instead of forming a convex corner.

EN duality: Its twenty face centers form a dodecahedron. Five original faces surround each vertex, so the corresponding dual face has five sides.

EN notice: It has the most faces of the five Platonic solids, but still only twelve vertices. Duality exchanges this balance with the dodecahedron's twenty vertices and twelve faces.

RU structure: В каждой вершине встречаются пять равносторонних треугольников: 5×60°=300°. Оставшиеся 60° - угловой дефект. Шесть треугольников заполнили бы 360° и легли плоско, не образуя выпуклого угла.

RU duality: Центры двадцати граней образуют додекаэдр. Каждую вершину окружают пять исходных граней, поэтому соответствующая двойственная грань имеет пять сторон.

RU notice: У него больше всего граней среди пяти платоновых тел, но всего двенадцать вершин. Двойственность меняет этот баланс на двадцать вершин и двенадцать граней додекаэдра.

## Duality, below scene and story

EN heading: Why the counts swap

Every original edge lies between two faces. Their centers define one dual edge, so E*=E. Walk around an original vertex: the surrounding face centers close into one dual face. This explains V*=F and F*=V, and why {p,q} becomes {q,p}. Repeating the construction restores which vertices, edges and faces are connected, though not necessarily the original size.

RU heading: Почему числа меняются местами

Каждое исходное ребро разделяет две грани. Их центры задают одно двойственное ребро, поэтому E*=E. Обойдите исходную вершину: центры окружающих граней замкнутся в одну двойственную грань. Так получаются V*=F и F*=V, а {p,q} превращается в {q,p}. Повторение построения восстанавливает связи вершин, рёбер и граней, хотя не обязательно исходный размер.

## Proof adjustments

Step 1: define graph as vertices and edges, describe moving it to a surrounding sphere without crossings, define p/q/V/E/F. A polygon needs at least three sides; a genuine convex corner needs at least three faces. Diagram uses cube p=4,q=3, schematic perspective, not p=5,q=4.

Step 2: keep two counts, simplify “incidence” language. Diagram's left faces must actually share a full edge, not overlap arbitrarily.

Step 3: preserve algebra; equality examples {3,6}, {4,4}, {6,3}. On axes 1/p and 1/q the boundary is a straight line. Describe sign regions without claiming every arbitrary point constructs a tiling.

Step 4: swap p/q in the symmetric inequality to assume p≤q; this does not require prior geometric existence of a dual. Preserve lattice diagram.

Step 5: retain distinction between necessary conditions and constructed models. Include a compact clarification that these counts restrict pairs; uniqueness for each regular convex realization is a separate classical fact (same graph up to isomorphism). Do not claim double counting alone proves uniqueness. Final wording to be reviewed.

## Laboratory angle explanation

EN heading: What happens at a corner?

EN positive: The face angles add up to less than 360°. The missing angle is the angle defect: a necessary local condition for a convex corner. The five models above show which regular solids actually realise these patterns.

EN zero: The face angles fill exactly 360°, leaving no convex corner. The patterns {3,6}, {4,4} and {6,3} instead make the familiar regular tilings of the plane.

EN negative: The face angles exceed 360°. They cannot meet at a vertex of a convex polyhedron, so this pair is excluded.

EN optional: How does this connect to Euler? A regular p-gon's interior angle is α=(p−2)π/p. With q faces at a vertex, δ=2π−qα=2πq(1/p+1/q−1/2). Since 2πq is positive, the angle test and Euler's inequality have the same sign.

EN conclusion: A local rule, a global limit: {p,q} describes a corner, duality swaps its two numbers, and Euler's formula leaves five candidate pairs. The five actual models complete the picture.

RU heading: Что происходит у вершины?

RU positive: Сумма углов граней меньше 360°. Недостающий угол - угловой дефект: необходимое локальное условие выпуклой вершины. Пять моделей выше показывают, какие правильные тела действительно реализуют эти схемы.

RU zero: Углы граней заполняют ровно 360°, не оставляя выпуклого угла. Схемы {3,6}, {4,4} и {6,3} вместо этого дают правильные мозаики плоскости.

RU negative: Сумма углов граней превышает 360°. Они не могут встретиться в вершине выпуклого многогранника, поэтому такая пара исключена.

RU optional: Как это связано с Эйлером? Внутренний угол правильного p-угольника равен α=(p−2)π/p. Для q граней при вершине δ=2π−qα=2πq(1/p+1/q−1/2). Множитель 2πq положителен, поэтому угловая проверка и неравенство Эйлера имеют один и тот же знак.

RU conclusion: Локальное правило и общее ограничение: {p,q} описывает вершину, двойственность меняет два числа местами, а формула Эйлера оставляет пять пар-кандидатов. Пять настоящих моделей завершают картину.
