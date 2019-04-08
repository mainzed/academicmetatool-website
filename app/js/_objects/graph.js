let network;
let result1;
let result2;

let secondQuery = (result) => {
    result1 = result;
    console.log("result1", result1);
    RDF4J.query("SELECT DISTINCT * WHERE { ?o ?p ?s . FILTER(?s=" + findGetParameter("uri") + ") }", createNetwork);
}

let createNetwork = (result) => {
    result2 = result;
    console.log("result2", result2);
    bindings_copy = result1.results.bindings;
    bindings2_copy = result2.results.bindings;
    nodes = [];
    edges = [];
    domain = [];
    range = [];
    // parse result 1
    THISNODE = bindings_copy[0];
    // load node from "s" - CENTER NODE
    node = {};
    node.id = bindings_copy[0].s.value;
    node.label = bindings_copy[0].s.value;
    node.shape = 'dot';
    node.font = {
        size: 8,
        face: "Arial",
    }
    if (bindings_copy[0].s.value.includes("E22_")) {
        node.color = 'LIGHTSEAGREEN';
        node.border = "GREEN";
    } else if (bindings_copy[0].s.value.includes(":T")) {
        node.color = 'PALEVIOLETRED';
        node.border = "MEDIUMVIOLETRED";
    } else if (bindings_copy[0].s.value.includes(":X2")) {
        node.color = 'SLATEBLUE';
        node.border = "DARKSLATEBLUE";
    } else {
        node.color = 'PEACHPUFF';
        node.border = "ORANGE";
    }
    node.size = 25;
    node.font.color = "silver";
    nodes.push(node);
    domain.push(node);
    // load domain nodes - load nodes from "range"
    for (var item in bindings_copy) {
        let stop = false;
        let hide = false;
        for (var item2 in nodes) {
            if (bindings_copy[item].o.value === nodes[item2].label) {
                stop = true;
            } else if (bindings_copy[item].o.value.includes("owl:NamedIndividual")) {
                stop = true;
            }
        }
        if (!stop) {
            node = {};
            node.id = bindings_copy[item].o.value;
            node.label = bindings_copy[item].o.value;
            node.size = 20;
            if (bindings_copy[item].p.value === "rdf:type" || bindings_copy[item].p.value === "rdfs:subClassOf") {
                node.shape = 'square';
                node.size = 10;
                node.color = {
                    background: "WHITE",
                    border: "BLACK"
                };
                node.font = {
                    border: "BLACK"
                }
            } else if (bindings_copy[item].p.value === "rdfs:label" || bindings_copy[item].p.value === "rdfs:comment") {
                node.shape = 'box';
                node.color = {
                    background: "MIDNIGHTBLUE",
                    border: "BLACK"
                };
            } else if (bindings_copy[item].p.value.includes("P2_")) {
                node.shape = 'dot';
                node.size = 12;
                node.color = {
                    background: "PALEVIOLETRED",
                    border: "MEDIUMVIOLETRED"
                };
            } else if (bindings_copy[item].p.value.includes("Y2_")) {
                node.shape = 'dot';
                node.size = 12;
                node.color = {
                    background: "SLATEBLUE",
                    border: "DARKSLATEBLUE"
                };
            } else {
                node.shape = 'dot';
                node.size = 12;
                node.color = {
                    background: "PEACHPUFF",
                    border: "ORANGE"
                };
            }
            node.font = {
                size: 8,
                face: "Arial",
                color: "silver"
            }
            nodes.push(node);
            range.push(node);
        }
    }
    // load edges between domain and range
    for (var item in bindings_copy) {
        edge = {};
        edge.from = domain[0].id;
        edge.to = bindings_copy[item].o.value;
        edge.label = bindings_copy[item].p.value;
        edge.font = {
            size: 8,
            face: "Arial",
            align: "horizontal",
            strokeWidth: 0,
            color: "white"
        };
        edge.length = 300;
        edge.arrows = 'to';
        edge.smooth = false;
        edges.push(edge);
    }
    // load nodes from result 2
    for (var item in bindings2_copy) {
        let stop = false;
        let hide = false;
        for (var item2 in nodes) {
            if (bindings2_copy[item].o.value === nodes[item2].label) {
                stop = true;
            } else if (bindings2_copy[item].o.value.includes("owl:NamedIndividual")) {
                stop = true;
            }
        }
        if (!stop) {
            node = {};
            node.id = bindings2_copy[item].o.value;
            node.label = bindings2_copy[item].o.value;
            node.size = 20;
            if (bindings2_copy[item].o.value.includes("E22_")) {
                node.shape = 'dot';
                node.size = 12;
                node.color = {
                    background: "LIGHTSEAGREEN",
                    border: "GREEN"
                };
            } else if (bindings2_copy[item].o.value.includes("X2_")) {
                node.shape = 'dot';
                node.size = 12;
                node.color = {
                    background: "SLATEBLUE",
                    border: "DARKSLATEBLUE"
                };
            } else {
                node.shape = 'dot';
                node.size = 12;
                node.color = {
                    background: "PEACHPUFF",
                    border: "ORANGE"
                };
            }
            node.font = {
                size: 8,
                face: "Arial",
                color: "silver"
            }
            nodes.push(node);
            range.push(node);
        }
    }
    // load edges between domain and range
    for (var item in bindings2_copy) {
        edge = {};
        edge.from = domain[0].id;
        edge.to = bindings2_copy[item].o.value;
        edge.label = bindings2_copy[item].p.value;
        edge.font = {
            size: 8,
            face: "Arial",
            align: "horizontal",
            strokeWidth: 0,
            color: "grey"
        };
        edge.length = 300;
        edge.arrows = 'from';
        edge.smooth = false;
        edges.push(edge);
    }
    //console.log("edges", edges);
    // create a network
    var container = document.getElementById('mynetwork2');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        layout: {
            randomSeed: 66,
            improvedLayout: true
        }
    };
    network = new vis.Network(container, data, options);
    network.on("select", function(params) {
        params.event = "[original event]";
        console.log(params);
        if (params.nodes[0].includes("owl:Class")) {} else {
            window.open('objects.htm?uri=' + params.nodes[0], '_self');
        }
    });
    console.log("createNetwork", result, network);
};

let loadNetwork = () => {
    RDF4J.query("SELECT DISTINCT * WHERE { ?s ?p ?o . FILTER(?s=" + findGetParameter("uri") + ") }", secondQuery);
};
