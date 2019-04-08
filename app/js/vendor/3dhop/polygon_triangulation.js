
var selectionPoints = [
    [
        -32.15941639887188,
        6.491875296340047,
        22.38294227433881
    ],
    [
        12.61370692915669,
        10.363426347205875,
        20.17066918974941
    ],
    [
        20.487757484363232,
        -6.48861768555419,
        35.74092390614593
    ],
    [
        -12.248424100431244,
        -9.39081363759663,
        39.61884354384211
    ],
    [
        7.323486409984596,
        1.2864055232506613,
        27.826452767993715
    ]
];
function triangulation_test() {


    simple_ = [2, 3]

    const g = new Graph(selectionPoints)
    const g2 = new Graph(simple_)
    console.log(g2)
    console.log(g.border_nodes)
    console.log(g.edges)
    console.log("ter")


    a = earcut(selectionPoints.flat(), null, 3)

    console.log(a)

    console.log(earcut([10, 0, 1, 0, 50, 2, 60, 60, 3, 70, 10, 4], null, 3));


}

class Graph {
    constructor(border_nodes) {
        if (border_nodes.length > 3) {
            this.border_nodes = border_nodes;
            this.edges = []
            for (let i = 0; i < border_nodes.length - 1; i++) {
                this.edges.push({ from: i, to: i + 1, used: 1 })
            }
            this.edges.push({ from: border_nodes.length - 1, to: 0, used: 1 }); //close last to first node

        }

    }

    triangulate() {
        //clac angle
        this.edges.forEach(edge => {



        });

    }
    create_face() {
        console.log("h");
    }

    angle(p0, pm, p1) {
        const v1 = [p0[0] - pm[0],
        p0[1] - pm[1],
        p0[2] - pm[2]];
        const v2 = [p1[0] - pm[0],
        p1[1] - pm[1],
        p1[2] - pm[2]];
        const dot = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
        v1_length = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2]);
        v2_length = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2]);
        angle = Math.acos(dot / (v1_length * v2_length));

    }





}