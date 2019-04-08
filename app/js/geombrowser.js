let GEOMBROWSER = {};
GEOMBROWSER.selectedPolygon = "POINT(" + RDF4J.getHash() + ")";

let findGetParameter = (parameterName) => {
    let result = null;
    let tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
};

let fillAppliqueDropdown = (json) => {
    console.log("fillAppliqueDropdown", json);
    let bindings = json.results.bindings;
    for (item in bindings) {
        $("#sel-applique").append(new Option(bindings[item].label.value, bindings[item].applique.value));
    }
}

let fillDepictionDropdown = (json) => {
    console.log("fillDepictionDropdown", json);
    let bindings = json.results.bindings;
    for (item in bindings) {
        $("#sel-depiction").append(new Option(bindings[item].label.value, bindings[item].s.value));
    }
    $('#sel-depiction').focus();
}

let initModalCreateApplique = (result) => {
    var modalCreateApplique = document.getElementById('modalCreateApplique');
    var btnCreateApplique = document.getElementById("btn-create-applique");
    btnCreateApplique.onclick = function() {
        modalCreateApplique.style.display = "block";
        $("#thisBildMotivModal").html(findGetParameter("object"));
        $("#thisWKTModal").html(GEOMBROWSER.selectedPolygon);
        $('#tree2').jstree("deselect_all");
        $('#tree2').jstree("open_node", clickedNode.id);
        $('#tree2').jstree("select_node", clickedNode.id);
        $('#inp-labelForNewBildmotiv').focus();
        $('#inp-polygonForBildmotiv').focus();
    }
    $("#btn-modal-create-applique-close").click(function() {
        modalCreateApplique.style.display = "none";
    });
    $("#btn-modalCreateBM").on('click', () => {
        RDF4J.createBildmotivWithPolygon(findGetParameter("object"), GEOMBROWSER.selectedPolygon, $("#inp-labelForNewBildmotiv").val(), clickedNode.id);
    });
    $("#btn-modalDeleteBM").on('click', () => {
        RDF4J.deleteBildmotiv(clickedNode.id);
    });
    $("#btn-modalModifyBM").on('click', () => {
        RDF4J.modifyBildmotiv(clickedNode.id, GEOMBROWSER.selectedPolygon, $("#inp-labelForNewBildmotiv").val());
    });
    $("#btn-modalApplyGeom").on('click', () => {
        $("#inp-polygonForBildmotiv").val(GEOMBROWSER.selectedPolygon);
    });
};

$('#btn-set-depiction').on('click', () => {
    $("#span-applique").html($('#sel-applique option:selected').val());
});

$('#btn-back').on('click', () => {
    window.open("objects.htm?uri=" + findGetParameter("object"), '_self');
});

let actionWithPolygon = (json) => {
    console.log("actionWithPolygon", json);
    let bindings = json.results.bindings;
    $("#inp-applique-polygon").val("");
    $('#inp-labelForNewBildmotiv').val("");
    $('#inp-polygonForBildmotiv').val("");
    for (item in bindings) {
        clickedNode.polygon = json.results.bindings[0].label.value;
        $("#inp-applique-polygon").val(clickedNode.polygon);
        $('#inp-labelForNewBildmotiv').val(clickedNode.text);
        $('#inp-polygonForBildmotiv').val(clickedNode.polygon);
        // @PA: bitte functionen callen die die Segmentierung anzeigen und ggf auch die Beschreibung dazu, Polygon Geometrie ist in: clickedNode.polygon
        // TODP @PA
    }
}

let fillDepictionInput = (json) => {
    console.log("fillDepictionInput", json);
    let bindings = json.results.bindings;
    for (item in bindings) {
        $("#inp-applique-depiction").val(json.results.bindings[0].label.value);
        clickedNode.depiction = json.results.bindings[0].label.value;
    }
}

let loadDataForBildmotiv = (clickedNode) => {
    console.log("loadDataForBildmotiv", clickedNode);
    RDF4J.query("SELECT DISTINCT * WHERE { ?applique ars:hasPolygon ?polygon. ?polygon rdfs:label ?label. FILTER(?applique=" + clickedNode.id + ") }", actionWithPolygon);
};

// menu-div action
$("#triplestore-action").hide();
$("#div-menu").show();
$("#div-3dhop").css('width', '96%');
$("#div-menu").click(function() {
    $("#div-menu").hide();
    $("#div-3dhop").css('width', '80%');
    $("#triplestore-action").show();
});
$("#btn-close-menu").click(function() {
    $("#triplestore-action").hide();
    $("#div-menu").show();
    $("#div-3dhop").css('width', '96%');
});

$('#btn-test').on('click', () => {
    openModalAfterSelection("asdad");
});

// @PA: Call this function after selection
let setSelectedPolygon = (thisWKT) => {
    GEOMBROWSER.selectedPolygon = thisWKT;
}

let clickedNode;
let selectedPolygonAsWKT = "";

let queryForTree = (object) => {
    let qt = "SELECT DISTINCT ?s ?a ?al ?b ?bl ?c ?cl ?d ?dl ?e ?el { " +
        "?s ars:contains ?a. ?a rdfs:label ?al. ?a ars:contains ?b . ?b rdfs:label ?bl." +
        "OPTIONAL {{?b ars:contains ?c. ?c rdfs:label ?cl.} UNION {?s ?c owl:NamedIndividual. ?s ?cl owl:NamedIndividual.}} " +
        "OPTIONAL {{?c ars:contains ?d. ?d rdfs:label ?dl.} UNION {?s ?d owl:NamedIndividual. ?s ?dl owl:NamedIndividual.}} " +
        "OPTIONAL {{?d ars:contains ?e. ?e rdfs:label ?el.} UNION {?s ?e owl:NamedIndividual. ?s ?el owl:NamedIndividual.}} " +
        "FILTER (?s=" + object + ") }";
    RDF4J.query(qt, loadTreeFromTriplestore);
}

let loadTreeFromTriplestore = (json) => {
    console.log("loadTreeFromTriplestore", json);
    let tmpArray = [];
    let mySet = new Set();
    let bindings = json.results.bindings;
    // add ROOT
    let tmpObj = {};
    tmpObj.id = json.results.bindings[0].s.value;
    tmpObj.parent = "#";
    tmpObj.icon = "fa fa-puzzle-piece";
    tmpObj.text = json.results.bindings[0].s.value;
    tmpArray.push(tmpObj);
    // add children
    for (item in bindings) {
        if (!json.results.bindings[item].a.value.includes("rdf:type")) {
            let tmpObj = {};
            tmpObj.id = json.results.bindings[item].a.value;
            tmpObj.parent = json.results.bindings[item].s.value;
            tmpObj.icon = "fa fa-object-group";
            tmpObj.text = json.results.bindings[item].al.value.split("@")[0];
            tmpArray.push(tmpObj);
        }
        if (!json.results.bindings[item].b.value.includes("rdf:type")) {
            let tmpObj = {};
            tmpObj.id = json.results.bindings[item].b.value;
            tmpObj.parent = json.results.bindings[item].a.value;
            tmpObj.icon = "fa fa-object-group";
            tmpObj.text = json.results.bindings[item].bl.value.split("@")[0];
            tmpArray.push(tmpObj);
        }
        if (!json.results.bindings[item].c.value.includes("rdf:type")) {
            let tmpObj = {};
            tmpObj.id = json.results.bindings[item].c.value;
            tmpObj.parent = json.results.bindings[item].b.value;
            tmpObj.icon = "fa fa-object-group";
            tmpObj.text = json.results.bindings[item].cl.value.split("@")[0];
            tmpArray.push(tmpObj);
        }
        if (!json.results.bindings[item].d.value.includes("rdf:type")) {
            let tmpObj = {};
            tmpObj.id = json.results.bindings[item].d.value;
            tmpObj.parent = json.results.bindings[item].c.value;
            tmpObj.icon = "fa fa-object-group";
            tmpObj.text = json.results.bindings[item].dl.value.split("@")[0];
            tmpArray.push(tmpObj);
        }
        if (!json.results.bindings[item].e.value.includes("rdf:type")) {
            let tmpObj = {};
            tmpObj.id = json.results.bindings[item].e.value;
            tmpObj.parent = json.results.bindings[item].d.value;
            tmpObj.icon = "fa fa-object-group";
            tmpObj.text = json.results.bindings[item].el.value.split("@")[0];
            tmpArray.push(tmpObj);
        }
    }
    // get unique array
    const result = [];
    const map = new Map();
    for (const item of tmpArray) {
        if (!map.has(item.id)) {
            map.set(item.id, true); // set any value to Map
            result.push({
                id: item.id,
                parent: item.parent,
                icon: item.icon,
                text: item.text
            });
        }
    }
    loadTree(result);
}

let loadTree = (result) => {
    console.log("loadTree", result);
    $('.bildmotivtree').jstree({
        'core': {
            'data': result
        },
        "plugins": ["sort", "search"]
    }).on('loaded.jstree', function() {
        $('.bildmotivtree').jstree('open_all');
        $('.bildmotivtree').jstree("open_node", findGetParameter("object"));
        $('.bildmotivtree').jstree("select_node", findGetParameter("object"));
        $('#inp-labelForNewBildmotiv').focus();
    });
    $(".bildmotivtree").on("select_node.jstree", function(e, data) {
        clickedNode = data.node;
        console.log("bildmotivtree.on", clickedNode);
        loadDataForBildmotiv(clickedNode);
    });
}

$("#inp-labelForNewBildmotiv").on('click', () => {
    $('#inp-labelForNewBildmotiv').focus();
});

$("#sel-depiction").on('click', () => {
    $('#sel-depiction').focus();
});

$("#btn-create-polygon").hide();
$("#btn-set-depiction").hide();
initModalCreateApplique();

const target = $('#div-3dhop')[0]; // Get DOM element from jQuery collection
$('#btn-fullscreen').on('click', () => {
    if (screenfull.enabled) {
        screenfull.request(target);
    }
});
queryForTree(findGetParameter("object"));
RDF4J.query("SELECT DISTINCT * WHERE { ?s rdfs:subClassOf ars:Animal . ?s rdfs:label ?label. }", fillDepictionDropdown);
