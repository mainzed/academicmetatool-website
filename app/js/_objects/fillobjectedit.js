let todo;
let opts = {
    lines: 13, // The number of lines to draw
    length: 38, // The length of each line
    width: 17, // The line thickness
    radius: 45, // The radius of the inner circle
    scale: 2, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: 'rgb(78, 193, 228)', // CSS color or array of colors
    fadeColor: 'WHITE', // CSS color or array of colors
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'absolute' // Element positioning
};
// load edit modal dropdowns
let fillDropdowns = (spinner, target) => {
    let fillObjectTypeDropdown = (json) => {
        console.log("fillObjectTypeDropdown", json);
        let bindings = json.results.bindings;
        $("#sel-objecttype").html("");
        $("#sel-objecttype").append(new Option("", -1));
        for (item in bindings) {
            $("#sel-objecttype").append(new Option(bindings[item].l.value.replace("@en", ""), bindings[item].s.value));
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT * WHERE { ?s a ars:T3_Object_Type . ?s rdfs:label ?l . }", fillObjectTypeDropdown);
    let fillMaterialDropdown = (json) => {
        console.log("fillMaterialDropdown", json);
        let bindings = json.results.bindings;
        $("#sel-material").html("");
        $("#sel-material").append(new Option("", -1));
        for (item in bindings) {
            let label = bindings[item].l.value.replace("@en", "");
            let rmi = bindings[item].tl.value.replace("@en", "");
            let opt = $(new Option(label, bindings[item].s.value));
            opt.attr("label", label).attr("rmi", rmi);
            $("#sel-material").append(opt);
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT * WHERE { ?s a crm:E57_Material . ?s rdfs:label ?l . ?s crm:P70_documents ?r. ?r crm:P71_lists ?t . ?t rdfs:label ?tl. }", fillMaterialDropdown);
    let fillConditionDropdown = (json) => {
        console.log("fillConditionDropdown", json);
        let bindings = json.results.bindings;
        $("#sel-condition").html("");
        $("#sel-condition").append(new Option("", -1));
        for (item in bindings) {
            $("#sel-condition").append(new Option(bindings[item].l.value.replace("@en", ""), bindings[item].s.value));
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT * WHERE { ?s a crm:E3_Condition_State . ?s crm:P2_has_type ?t . ?t rdf:type ars:T1_Condition_Type . ?s rdfs:label ?l . }", fillConditionDropdown);
    let fillFindspotDropdown = (json) => {
        console.log("fillFindspotDropdown", json);
        let bindings = json.results.bindings;
        $("#sel-findspot").html("");
        $("#sel-findspot").append(new Option("", -1));
        for (item in bindings) {
            $("#sel-findspot").append(new Option(bindings[item].l.value.replace("@en", ""), bindings[item].s.value));
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT * WHERE { ?s a crm:E53_Place . ?s crm:P2_has_type ?t . ?t rdf:type ars:T2_Place_Type . ?t rdfs:label 'findspot'@en . ?s rdfs:label ?l . }", fillFindspotDropdown);
    let fillResidenceDropdown = (json) => {
        console.log("fillResidenceDropdown", json);
        let bindings = json.results.bindings;
        $("#sel-residence").html("");
        $("#sel-residence").append(new Option("", -1));
        for (item in bindings) {
            $("#sel-residence").append(new Option(bindings[item].l.value.replace("@en", ""), bindings[item].s.value));
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT * WHERE { ?s a crm:E53_Place . ?s crm:P2_has_type ?t . ?t rdf:type ars:T2_Place_Type . ?t rdfs:label 'residence'@en . ?s rdfs:label ?l . }", fillResidenceDropdown);
    let fillShapeDropdown = (json) => {
        console.log("fillShapeDropdown", json);
        let bindings = json.results.bindings;
        $("#sel-shape").html("");
        $("#sel-shape").append(new Option("", -1));
        for (item in bindings) {
            $("#sel-shape").append(new Option(bindings[item].l.value.replace("@en", ""), bindings[item].s.value));
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT * WHERE { ?s a ars:X1_Geometric_Shape . ?s rdfs:label ?l . }", fillShapeDropdown);
    let fillPeriodDropdown = (json) => {
        console.log("fillPeriodDropdown", json);
        let bindings = json.results.bindings;
        $("#sel-period").html("");
        $("#sel-period").append(new Option("", -1));
        for (item in bindings) {
            if (bindings[item].tl.value.replace("@en", "") != "crm:E4_Period" && bindings[item].tl.value.replace("@en", "") != "owl:NamedIndividual") {
                $("#sel-period").append(new Option(bindings[item].l.value.replace("@en", "") + " → " + bindings[item].tl.value.replace("@en", ""), bindings[item].s.value));
            }
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT * WHERE { { ?s a crm:E4_Period .  ?s rdfs:label ?l . ?s rdf:type ?t . ?s rdf:type ?tl . } UNION { ?s a crm:E4_Period .  ?s rdfs:label ?l . ?s crm:P9_consists_of ?t . ?t rdfs:label ?tl . } }", fillPeriodDropdown);
    let fillManufacturingDropdown = (json) => {
        console.log("fillManufacturingDropdown", json);
        let bindings = json.results.bindings;
        $("#sel-manufacturing").html("");
        $("#sel-manufacturing").append(new Option("", -1));
        for (item in bindings) {
            $("#sel-manufacturing").append(new Option(bindings[item].l.value.replace("@en", ""), bindings[item].s.value));
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT * WHERE { ?s a ars:X41_Manufacturing_Object . ?s rdfs:label ?l . }", fillManufacturingDropdown);
    let fillPotterDropdown = (json) => {
        console.log("fillPotterDropdown", json);
        let bindings = json.results.bindings;
        $("#sel-potter").html("");
        $("#sel-potter").append(new Option("", -1));
        for (item in bindings) {
            $("#sel-potter").append(new Option(bindings[item].l.value.replace("@en", "") + " → " + bindings[item].tl.value.replace("@en", ""), bindings[item].s.value));
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT * WHERE { ?s a crm:E21_Person . ?s rdfs:label ?l . ?s crm:P2_has_type ?t . ?t rdfs:label ?tl . FILTER (?tl='Potter'@en) }", fillPotterDropdown);
    let fillDocumentDropdown = (json) => {
        console.log("fillDocumentDropdown", json);
        let bindings = json.results.bindings;
        $("#sel-document").html("");
        $("#sel-document").append(new Option("", -1));
        for (item in bindings) {
            $("#sel-document").append(new Option(bindings[item].l.value.replace("@en", ""), bindings[item].s.value));
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT * WHERE { ?s a crm:E31_Document . ?s rdfs:label ?l . }", fillDocumentDropdown);
    let fillStatementClassDropdown = (json) => {
        console.log("fillStatementClassDropdown", json);
        let bindings = json.results.bindings;
        $("#sel-statement-class-hidden").html("");
        $("#sel-statement-class-hidden").append(new Option("", -1));
        for (item in bindings) {
            $("#sel-statement-class-hidden").append(new Option(bindings[item].s.value, bindings[item].s.value));
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT * WHERE { { ?s rdfs:subClassOf ars:TS1_Form_Type . } UNION  { ?s rdfs:subClassOf ars:TS2_Applique_Type .  } UNION { ?s rdfs:subClassOf ars:TS3_Comparison_Type .  } UNION { ?s rdfs:subClassOf ars:TS4_Classification_Type .  } }", fillStatementClassDropdown);
    let fillStatementDropdown = (json) => {
        console.log("fillStatementDropdown", json);
        let bindings = json.results.bindings;
        $("#sel-statement-hidden").html("");
        $("#sel-statement-hidden").append(new Option("", -1));
        for (item in bindings) {
            $("#sel-statement-hidden").append(new Option(bindings[item].l.value.replace("@en", ""), bindings[item].s.value));
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT * WHERE { ?s a ars:X2_Statement . ?s rdfs:label ?l . }", fillStatementDropdown);
};

// load edit modal values
let fillValues = (spinner, target) => {
    let fillObjectLabel = (json) => {
        console.log("fillObjectLabel", json);
        let bindings = json.results.bindings;
        for (item in bindings) {
            $("#inp-label").val(bindings[item].l.value.replace("@en", ""));
            if ($("#inp-label").val !== "") {
                $("#btn-label-info").removeClass("btn-red");
                $("#btn-label-info").addClass("btn-green");
            }
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT ?l WHERE { " + findGetParameter("uri") + " rdfs:label ?l . }", fillObjectLabel);
    let fillInventoryNumber = (json) => {
        console.log("fillInventoryNumber", json);
        let bindings = json.results.bindings;
        for (item in bindings) {
            $("#inp-invno").val(bindings[item].l.value.replace("@en", ""));
            if ($("#inp-invno").val !== "") {
                $("#btn-invno-info").removeClass("btn-red");
                $("#btn-invno-info").addClass("btn-green");
            }
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT ?l WHERE { " + findGetParameter("uri") + " crm:P1_is_identified_by ?i . ?i rdfs:label ?l . }", fillInventoryNumber);
    let fillObjectType = (json) => {
        console.log("fillObjectType", json);
        let bindings = json.results.bindings;
        for (item in bindings) {
            $("#sel-objecttype").val(bindings[item].n.value);
            if ($("#sel-objecttype").val() !== "") {
                $("#btn-objecttype-info").removeClass("btn-red");
                $("#btn-objecttype-info").addClass("btn-green");
            }
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT ?n WHERE { " + findGetParameter("uri") + " crm:P2_has_type ?n . }", fillObjectType);
    let fillObjectMaterial = (json) => {
        console.log("fillObjectMaterial", json);
        let bindings = json.results.bindings;
        for (item in bindings) {
            $("#sel-material").val(bindings[item].n.value);
            if ($("#sel-material").val() !== "-1") {
                $("#btn-material-info").removeClass("btn-red");
                $("#btn-material-info").addClass("btn-green");
                $("#btn-material-edit").css("pointer-events", "auto");
                $("#btn-material-edit").removeClass("btn-red");
                $("#btn-material-edit").addClass("btn-green2");
            }
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT ?n WHERE { " + findGetParameter("uri") + " crm:P45_consists_of ?n . }", fillObjectMaterial);
    let fillObjectCondition = (json) => {
        console.log("fillObjectCondition", json);
        let bindings = json.results.bindings;
        for (item in bindings) {
            $("#sel-condition").val(bindings[item].n.value);
            if ($("#sel-condition").val() !== "-1") {
                $("#btn-condition-info").removeClass("btn-red");
                $("#btn-condition-info").addClass("btn-green");
                $("#btn-condition-edit").css("pointer-events", "auto");
                $("#btn-condition-edit").removeClass("btn-red");
                $("#btn-condition-edit").addClass("btn-green2");
            }
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT ?n WHERE { " + findGetParameter("uri") + " crm:P44_has_condition ?n . }", fillObjectCondition);
    let fillObjectFindspot = (json) => {
        console.log("fillObjectFindspot", json);
        let bindings = json.results.bindings;
        for (item in bindings) {
            $("#sel-findspot").val(bindings[item].n.value);
            if ($("#sel-findspot").val() !== "-1") {
                $("#btn-findspot-info").removeClass("btn-red");
                $("#btn-findspot-info").addClass("btn-green");
                $("#btn-findspot-edit").css("pointer-events", "auto");
                $("#btn-findspot-edit").removeClass("btn-red");
                $("#btn-findspot-edit").addClass("btn-green2");
            }
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT ?n WHERE { " + findGetParameter("uri") + " crm:P53_has_former_or_current_location ?n . }", fillObjectFindspot);
    let fillObjectResidence = (json) => {
        console.log("fillObjectResidence", json);
        let bindings = json.results.bindings;
        for (item in bindings) {
            $("#sel-residence").val(bindings[item].n.value);
            if ($("#sel-residence").val() !== "-1") {
                $("#btn-residence-info").removeClass("btn-red");
                $("#btn-residence-info").addClass("btn-green");
                $("#btn-residence-edit").css("pointer-events", "auto");
                $("#btn-residence-edit").removeClass("btn-red");
                $("#btn-residence-edit").addClass("btn-green2");
            }
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT ?n WHERE { " + findGetParameter("uri") + " crm:P55_has_current_location ?n . }", fillObjectResidence);
    let fillObjectShape = (json) => {
        console.log("fillObjectShape", json);
        let bindings = json.results.bindings;
        for (item in bindings) {
            $("#sel-shape").val(bindings[item].n.value);
            if ($("#sel-shape").val() !== "-1") {
                $("#btn-shape-info").removeClass("btn-red");
                $("#btn-shape-info").addClass("btn-green");
                $("#btn-shape-edit").css("pointer-events", "auto");
                $("#btn-shape-edit").removeClass("btn-red");
                $("#btn-shape-edit").addClass("btn-green2");
            }
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT ?n WHERE { " + findGetParameter("uri") + " ars:Y3_hasShape ?n . }", fillObjectShape);
    let fillObjectPeriod = (json) => {
        console.log("fillObjectPeriod", json);
        let bindings = json.results.bindings;
        for (item in bindings) {
            $("#sel-period").val(bindings[item].n.value);
            if ($("#sel-period").val() !== "-1") {
                $("#btn-period-info").removeClass("btn-red");
                $("#btn-period-info").addClass("btn-green");
                $("#btn-period-edit").css("pointer-events", "auto");
                $("#btn-period-edit").removeClass("btn-red");
                $("#btn-period-edit").addClass("btn-green2");
            }
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT ?n WHERE { " + findGetParameter("uri") + " crm:P8_took_place_on_or_within ?n . }", fillObjectPeriod);
    let fillObjectManufacturing = (json) => {
        console.log("fillObjectManufacturing", json);
        let bindings = json.results.bindings;
        for (item in bindings) {
            $("#sel-manufacturing").val(bindings[item].n.value);
            if ($("#sel-manufacturing").val() !== "-1") {
                $("#btn-manufacturing-info").removeClass("btn-red");
                $("#btn-manufacturing-info").addClass("btn-green");
                $("#btn-manufacturing-edit").css("pointer-events", "auto");
                $("#btn-manufacturing-edit").removeClass("btn-red");
                $("#btn-manufacturing-edit").addClass("btn-green2");
            }
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT ?n WHERE { " + findGetParameter("uri") + " ars:Y6_createdBy ?n . }", fillObjectManufacturing);
    let fillObjectPotter = (json) => {
        console.log("fillObjectPotter", json);
        let bindings = json.results.bindings;
        for (item in bindings) {
            $("#sel-potter").val(bindings[item].n.value);
            if ($("#sel-potter").val() !== "-1") {
                $("#btn-potter-info").removeClass("btn-red");
                $("#btn-potter-info").addClass("btn-green");
                $("#btn-potter-edit").css("pointer-events", "auto");
                $("#btn-potter-edit").removeClass("btn-red");
                $("#btn-potter-edit").addClass("btn-green2");
            }
        }
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    RDF4J.query("SELECT DISTINCT ?n WHERE { " + findGetParameter("uri") + " ars:Y7_hasCreator ?n . }", fillObjectPotter);
    let fillObjectStatements = (json) => {
        console.log("fillObjectStatements", json);
        let bindings = json.results.bindings;
        $('#statements').html("");
        for (item in bindings) {
            addStatementDiv();
        }
        $(".statement").each(function(index) {
            $("#btn-statement-info-" + index).removeClass("btn-red");
            $("#btn-statement-info-" + index).addClass("btn-green");
            $("#btn-statement-edit-" + index).css("pointer-events", "auto");
            $("#btn-statement-edit-" + index).removeClass("btn-red");
            $("#btn-statement-edit-" + index).addClass("btn-green2");
            $("#btn-statement-save-" + index).css("pointer-events", "auto");
            $("#btn-statement-save-" + index).removeClass("btn-red");
            $("#btn-statement-save-" + index).addClass("btn-cyan");
            $("#btn-statement-delete-" + index).css("pointer-events", "auto");
            $("#btn-statement-delete-" + index).removeClass("btn-red");
            $("#btn-statement-delete-" + index).addClass("btn-delete");
            $("#sel-statement-" + index).val(bindings[index].n.value);
            $("#btn-modal-create-statement-close").unbind('click').click(function() {
                $("#modalCreateStatement").toggle();
            });
            $("#btn-modalCreateStatement").unbind('click').click(function() {
                RDF4J.createStatement($("#inp-statement-label").val(), $("#sel-statement-class option:selected").val(), $("#inp-statement-type").val(), $("#sel-statement-document option:selected").val(), $("#inp-statement-detail").val(), openModalSaveResponse);
                $("#modalCreateStatement").toggle();
            });
        });
        // modal action
        let $options = $("#sel-document > option").clone();
        $('#sel-statement-document').empty();
        $('#sel-statement-document').append($options);
        let $options2 = $("#sel-statement-class-hidden > option").clone();
        $('#sel-statement-class').empty();
        $('#sel-statement-class').append($options2);
        $("#inp-statement-label").unbind('change').keyup(function() {
            if ($("#inp-statement-label").val().length > 0 && $("#inp-statement-type").val().length > 0 && $("#inp-statement-detail").val().length > 0 && $("#sel-statement-class").val() !== -1 && $("#sel-statement-document").val() !== -1) {
                $("#btn-modalCreateStatement").show();
            } else {
                $("#btn-modalCreateStatement").hide();
            }
        }).trigger("change");
        $("#inp-statement-type").unbind('change').keyup(function() {
            if ($("#inp-statement-label").val().length > 0 && $("#inp-statement-type").val().length > 0 && $("#inp-statement-detail").val().length > 0 && $("#sel-statement-class").val() !== -1 && $("#sel-statement-document").val() !== -1) {
                $("#btn-modalCreateStatement").show();
            } else {
                $("#btn-modalCreateStatement").hide();
            }
        }).trigger("change");
        $("#inp-statement-detail").unbind('change').keyup(function() {
            if ($("#inp-statement-label").val().length > 0 && $("#inp-statement-type").val().length > 0 && $("#inp-statement-detail").val().length > 0 && $("#sel-statement-class").val() !== -1 && $("#sel-statement-document").val() !== -1) {
                $("#btn-modalCreateStatement").show();
            } else {
                $("#btn-modalCreateStatement").hide();
            }
        }).trigger("change");
        $("#sel-statement-class").unbind('change').change(function() {
            if ($("#inp-statement-label").val().length > 0 && $("#inp-statement-type").val().length > 0 && $("#inp-statement-detail").val().length > 0 && $("#sel-statement-class").val() !== -1 && $("#sel-statement-document").val() !== -1) {
                $("#btn-modalCreateStatement").show();
            } else {
                $("#btn-modalCreateStatement").hide();
            }
        }).trigger("change");
        $("#sel-statement-document").unbind('change').change(function() {
            if ($("#inp-statement-label").val().length > 0 && $("#inp-statement-type").val().length > 0 && $("#inp-statement-detail").val().length > 0 && $("#sel-statement-class").val() !== -1 && $("#sel-statement-document").val() !== -1) {
                $("#btn-modalCreateStatement").show();
            } else {
                $("#btn-modalCreateStatement").hide();
            }
        }).trigger("change");
        // spinner action
        --todo;
        console.log(todo);
        $("#foo").html(todo);
        if (todo === 0) {
            spinner.stop(target);
            $("#modalSpinner").modal("hide");
        }
    };
    $('#statements').html("");
    RDF4J.query("SELECT DISTINCT ?n WHERE { " + findGetParameter("uri") + " ars:Y2_isStatedBy ?n . ?n rdf:type ?t .}", fillObjectStatements);
};

let loadData = () => {
    $("#modalSpinner").modal("show");
    $("#modalSpinner").appendTo("body");
    $("#modalEditObject").hide();
    todo = 24;
    //let modal = document.getElementById('modalSpinner');
    //modal.style.display = "block";
    var target = $("body")[0];
    var spinner = new Spinner(opts).spin(target);
    fillDropdowns(spinner, target);
    fillValues(spinner, target);
    $("#modalEditObject").show();
};
