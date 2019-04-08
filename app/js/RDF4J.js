let RDF4J = {};

RDF4J.HASHLENGTH = 6;

RDF4J.getHash = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    for (let i = 0; i < RDF4J.HASHLENGTH; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

RDF4J.getHashDigits = (number) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    for (let i = 0; i < number; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

//RDF4J.SPARQLQUERY = "https://java-dev.rgzm.de/ars3d/sparql";
//RDF4J.SPARQLUPDATE = "https://java-dev.rgzm.de/ars3d/sparqlupdate";
RDF4J.SPARQLQUERY = "http://localhost:8084/ars3dapi/sparql";
RDF4J.SPARQLUPDATE = "http://localhost:8084/ars3dapi/sparqlupdate";

RDF4J.PREFIXES =
    "PREFIX ars: <http://ars3D/documentation/ontology/arsonto#> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX ecrm: <http://erlangen-crm.org/current/>  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX skos: <http://www.w3.org/2004/02/skos/core#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/> PREFIX Applique1: <http://ars3D/documentation/ontology/arsonto#Applique> PREFIX Applique: <http://ars3D/documentation/ontology/arsonto#Applique%20> PREFIX ars3d: <http://java-dev.rgzm.de/ars#> ";

RDF4J.query = (sparql, callback) => {
    setTimeout(function() {
        console.log(sparql);
        $.ajax({
            type: 'GET',
            //async: false,
            url: RDF4J.SPARQLQUERY,
            data: {
                query: encodeURIComponent(RDF4J.PREFIXES + sparql),
                out: "json"
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            },
            success: function(response) {
                try {
                    response = JSON.parse(response);
                } catch (e) {}
                var vars = response.head.vars;
                var bindings = response.results.bindings;
                const bindings_copy = Object.assign({}, bindings);
                for (var item in bindings) {
                    for (var varstr in vars) {
                        var tblTxt = "";
                        if (bindings[item][vars[varstr]].type === "uri") {
                            var val = bindings[item][vars[varstr]].value;
                            val = val.replace("http://ars3D/documentation/ontology/arsonto#", "ars:");
                            val = val.replace("http://www.w3.org/1999/02/22-rdf-syntax-ns#", "rdf:");
                            val = val.replace("http://www.w3.org/2002/07/owl#", "owl:");
                            val = val.replace("http://erlangen-crm.org/current/", "ecrm:");
                            val = val.replace("http://www.w3.org/2001/XMLSchema#", "xsd:");
                            val = val.replace("http://www.w3.org/2004/02/skos/core#", "skos:");
                            val = val.replace("http://www.w3.org/2000/01/rdf-schema#", "rdfs:");
                            val = val.replace("http://www.cidoc-crm.org/cidoc-crm/", "crm:");
                            val = val.replace("http://ars3D/documentation/ontology/arsonto#Applique", "Applique1:");
                            val = val.replace("http://ars3D/documentation/ontology/arsonto#Applique%20", "Applique:");
                            val = val.replace("http://java-dev.rgzm.de/ars#", "ars3d:");
                            bindings_copy[item][vars[varstr]].value = val;
                        } else if (bindings[item][vars[varstr]]["xml:lang"]) {
                            bindings_copy[item][vars[varstr]].value = bindings[item][vars[varstr]].value + "@" + bindings[item][vars[varstr]]["xml:lang"];
                        } else if (bindings[item][vars[varstr]].type === "bnode") {
                            bindings_copy[item][vars[varstr]].value = "_:" + bindings[item][vars[varstr]].value;
                        } else {
                            bindings_copy[item][vars[varstr]].value = bindings[item][vars[varstr]].value
                        }
                    }
                }
                response.results.bindings = bindings_copy;
                if (typeof callback === 'function') {
                    //console.log("call callback", response);
                    callback(response);
                } else {
                    //console.log("call without callback", response);
                    return response;
                }
            }
        });
    }, 100);
};

RDF4J.createObject = (invno, label, callback) => {
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:E22_" + invno + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E22_" + invno + " " + "rdf:type" + " " + "crm:E22_Man-Made_Object" + ". ";
    THIS_UPDATE += "ars3d:E22_" + invno + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    let e42 = RDF4J.getHash();
    THIS_UPDATE += "ars3d:E22_" + invno + " " + "crm:P1_is_identified_by" + " " + "ars3d:E42_" + e42 + ". ";
    THIS_UPDATE += "ars3d:E42_" + e42 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E42_" + e42 + " " + "rdf:type" + " " + "crm:E42_Identifier" + ". ";
    THIS_UPDATE += "ars3d:E42_" + e42 + " " + "rdfs:label" + " " + "'" + invno + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createObject", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyObjectLabel = (object, label, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " rdfs:label ?label. ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += object + " rdfs:label \"" + label + "\"@en. ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += object + " rdfs:label ?label. ";
    THIS_UPDATE += "}";
    console.log("modifyObjectLabel", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyObjectIdentifier = (object, label, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?i rdfs:label ?label . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += "?i rdfs:label \"" + label + "\"@en. ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += object + " crm:P1_is_identified_by ?i. ";
    THIS_UPDATE += "?i rdfs:label ?label . ";
    THIS_UPDATE += "} ";
    console.log("modifyObjectIdentifier", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyObjectType = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " crm:P2_has_type ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "-1") {
        THIS_UPDATE += object + " crm:P2_has_type " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " crm:P2_has_type ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectType", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.createMaterial = (label, rmi, callback) => {
    let h1 = RDF4J.getHash();
    let h2 = RDF4J.getHash();
    let h3 = RDF4J.getHash();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:E57_" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E57_" + h1 + " " + "rdf:type" + " " + "crm:E57_Material" + ". ";;
    THIS_UPDATE += "ars3d:E57_" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars3d:E57_" + h1 + " " + "crm:P70_documents" + " " + "_:" + h2 + ". ";
    THIS_UPDATE += "_:" + h2 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "_:" + h2 + " " + "rdf:type" + " " + "crm:E32_Authority_Document" + ". ";
    THIS_UPDATE += "_:" + h2 + " " + "rdfs:label" + " " + "'" + "RGZM Meta-Index" + "'@en" + ". ";
    THIS_UPDATE += "_:" + h2 + " " + "crm:P71_lists" + " " + "ars3d:T5_" + h3 + ". ";
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdf:type" + " " + "crm:T5_RMI_Item" + ". ";;
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdfs:label" + " " + "'" + rmi + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createMaterial", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyMaterial = (node, label, rmi, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += node + " rdfs:label ?label1 . ";
    THIS_UPDATE += "?rmi rdfs:label ?label2 . ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += node + " rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "?rmi rdfs:label" + " " + "'" + rmi + "'@en" + ". ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += node + " rdfs:label ?label1. ";
    THIS_UPDATE += node + " crm:P70_documents ?doc. ";
    THIS_UPDATE += "?doc crm:P71_lists ?rmi. ";
    THIS_UPDATE += "?rmi rdfs:label ?label2. ";
    THIS_UPDATE += "} ";
    console.log("modifyObjectType", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyObjectMaterial = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " crm:P45_consists_of ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "-1") {
        THIS_UPDATE += object + " crm:P45_consists_of " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " crm:P45_consists_of ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectMaterial", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.createCondition = (label, callback) => {
    let h1 = RDF4J.getHash();
    let h2 = RDF4J.getHash();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:E3_" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E3_" + h1 + " " + "rdf:type" + " " + "crm:E3_Condition_State" + ". ";;
    THIS_UPDATE += "ars3d:E3_" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars3d:E3_" + h1 + " " + "crm:P2_has_type" + " " + "ars3d:T1_" + h2 + ". ";
    THIS_UPDATE += "ars3d:T1_" + h2 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:T1_" + h2 + " " + "rdf:type" + " " + "ars:T1_Condition_Type" + ". ";
    THIS_UPDATE += "ars3d:T1_" + h2 + " " + "rdfs:label" + " " + "'" + "Object Condition" + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createCondition", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.createFindspot = (label, rmi, callback) => {
    let h1 = RDF4J.getHash();
    let h2 = RDF4J.getHash();
    let h3 = RDF4J.getHash();
    let h4 = RDF4J.getHash();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:E53_" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E53_" + h1 + " " + "rdf:type" + " " + "crm:E53_Place" + ". ";;
    THIS_UPDATE += "ars3d:E53_" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars3d:E53_" + h1 + " " + "crm:P2_has_type" + " " + "ars3d:T2_" + h2 + ". ";
    THIS_UPDATE += "ars3d:T2_" + h2 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:T2_" + h2 + " " + "rdf:type" + " " + "ars:T2_Place_Type" + ". ";
    THIS_UPDATE += "ars3d:T2_" + h2 + " " + "rdfs:label" + " " + "'" + "findspot" + "'@en" + ". ";
    // rmi
    THIS_UPDATE += "ars3d:E53_" + h1 + " " + "crm:P70_documents" + " " + "ars3d:E32_" + h3 + ". ";
    THIS_UPDATE += "ars3d:E32_" + h3 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h3 + " " + "rdf:type" + " " + "crm:E32_Authority_Document" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h3 + " " + "rdfs:label" + " " + "'" + "RGZM Meta-Index" + "'@en" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h3 + " " + "crm:P71_lists" + " " + "ars3d:T5_" + h4 + ". ";
    THIS_UPDATE += "ars3d:T5_" + h4 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:T5_" + h4 + " " + "rdf:type" + " " + "crm:T5_RMI_Item" + ". ";;
    THIS_UPDATE += "ars3d:T5_" + h4 + " " + "rdfs:label" + " " + "'" + rmi + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createFindspot", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.createResidence = (label, rmi, callback) => {
    let h1 = RDF4J.getHash();
    let h2 = RDF4J.getHash();
    let h3 = RDF4J.getHash();
    let h4 = RDF4J.getHash();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:E53_" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E53_" + h1 + " " + "rdf:type" + " " + "crm:E53_Place" + ". ";;
    THIS_UPDATE += "ars3d:E53_" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars3d:E53_" + h1 + " " + "crm:P2_has_type" + " " + "ars3d:T2_" + h2 + ". ";
    THIS_UPDATE += "ars3d:T2_" + h2 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:T2_" + h2 + " " + "rdf:type" + " " + "ars:T2_Place_Type" + ". ";
    THIS_UPDATE += "ars3d:T2_" + h2 + " " + "rdfs:label" + " " + "'" + "residence" + "'@en" + ". ";
    // rmi
    THIS_UPDATE += "ars3d:E53_" + h1 + " " + "crm:P70_documents" + " " + "ars3d:E32_" + h3 + ". ";
    THIS_UPDATE += "ars3d:E32_" + h3 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h3 + " " + "rdf:type" + " " + "crm:E32_Authority_Document" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h3 + " " + "rdfs:label" + " " + "'" + "RGZM Meta-Index" + "'@en" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h3 + " " + "crm:P71_lists" + " " + "ars3d:T5_" + h4 + ". ";
    THIS_UPDATE += "ars3d:T5_" + h4 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:T5_" + h4 + " " + "rdf:type" + " " + "crm:T5_RMI_Item" + ". ";;
    THIS_UPDATE += "ars3d:T5_" + h4 + " " + "rdfs:label" + " " + "'" + rmi + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createResidence", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.createShape = (label, rmi, callback) => {
    let h1 = RDF4J.getHash();
    let h2 = RDF4J.getHash();
    let h3 = RDF4J.getHash();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:X1_" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:X1_" + h1 + " " + "rdf:type" + " " + "ars:X1_Geometric_Shape" + ". ";;
    THIS_UPDATE += "ars3d:X1_" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    // rmi
    THIS_UPDATE += "ars3d:E53_" + h1 + " " + "crm:P70_documents" + " " + "ars3d:E32_" + h2 + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "rdf:type" + " " + "crm:E32_Authority_Document" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "rdfs:label" + " " + "'" + "RGZM Meta-Index" + "'@en" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "crm:P71_lists" + " " + "ars3d:T5_" + h3 + ". ";
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdf:type" + " " + "crm:T5_RMI_Item" + ". ";;
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdfs:label" + " " + "'" + rmi + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createResidence", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.createPeriod = (label, rmi, date, callback) => {
    let h1 = RDF4J.getHash();
    let h2 = RDF4J.getHash();
    let h3 = RDF4J.getHash();
    let h4 = RDF4J.getHash();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:E4_" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E4_" + h1 + " " + "rdf:type" + " " + "crm:E4_Period" + ". ";
    THIS_UPDATE += "ars3d:E4_" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars3d:E4_" + h1 + " " + "crm:P9_consists_of" + " " + "ars3d:E50_" + h4 + ". ";
    THIS_UPDATE += "ars3d:E50_" + h4 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E50_" + h4 + " " + "rdf:type" + " " + "crm:E50_Date" + ". ";
    THIS_UPDATE += "ars3d:E50_" + h4 + " " + "rdfs:label" + " " + "'" + date + "'@en" + ". ";
    // rmi
    THIS_UPDATE += "ars3d:E4_" + h1 + " " + "crm:P70_documents" + " " + "ars3d:E32_" + h2 + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "rdf:type" + " " + "crm:E32_Authority_Document" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "rdfs:label" + " " + "'" + "RGZM Meta-Index" + "'@en" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "crm:P71_lists" + " " + "ars3d:T5_" + h3 + ". ";
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdf:type" + " " + "crm:T5_RMI_Item" + ". ";
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdfs:label" + " " + "'" + rmi + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createResidence", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.createManufacturing = (label, rmi, callback) => {
    let h1 = RDF4J.getHash();
    let h2 = RDF4J.getHash();
    let h3 = RDF4J.getHash();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:X41_" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:X41_" + h1 + " " + "rdf:type" + " " + "ars:X41_Manufacturing_Object" + ". ";
    THIS_UPDATE += "ars3d:X41_" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    // rmi
    THIS_UPDATE += "ars3d:E41_" + h1 + " " + "crm:P70_documents" + " " + "ars3d:E32_" + h2 + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "rdf:type" + " " + "crm:E32_Authority_Document" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "rdfs:label" + " " + "'" + "RGZM Meta-Index" + "'@en" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "crm:P71_lists" + " " + "ars3d:T5_" + h3 + ". ";
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdf:type" + " " + "crm:T5_RMI_Item" + ". ";
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdfs:label" + " " + "'" + rmi + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createResidence", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.createPotter = (label, callback) => {
    let h1 = RDF4J.getHash();
    let h2 = RDF4J.getHash();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:E21_" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E21_" + h1 + " " + "rdf:type" + " " + "crm:E21_Person" + ". ";
    THIS_UPDATE += "ars3d:E21_" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars3d:E21_" + h1 + " " + "crm:P2_has_type" + " " + "ars3d:T6_" + h2 + ". ";
    THIS_UPDATE += "ars3d:T6_" + h2 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:T6_" + h2 + " " + "rdf:type" + " " + "ars:T6_Person_Type" + ". ";
    THIS_UPDATE += "ars3d:T6_" + h2 + " " + "rdfs:label" + " " + "'" + "Potter" + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createPotter", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.createDocument = (label, rmi, callback) => {
    let h1 = RDF4J.getHash();
    let h2 = RDF4J.getHash();
    let h3 = RDF4J.getHash();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:E31_" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E31_" + h1 + " " + "rdf:type" + " " + "crm:E31_Document" + ". ";
    THIS_UPDATE += "ars3d:E31_" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    // rmi
    THIS_UPDATE += "ars3d:E41_" + h1 + " " + "crm:P70_documents" + " " + "ars3d:E32_" + h2 + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "rdf:type" + " " + "crm:E32_Authority_Document" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "rdfs:label" + " " + "'" + "RGZM Meta-Index" + "'@en" + ". ";
    THIS_UPDATE += "ars3d:E32_" + h2 + " " + "crm:P71_lists" + " " + "ars3d:T5_" + h3 + ". ";
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdf:type" + " " + "crm:T5_RMI_Item" + ". ";
    THIS_UPDATE += "ars3d:T5_" + h3 + " " + "rdfs:label" + " " + "'" + rmi + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createDocument", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.createStatement = (label, sclass, type, book, detail, callback) => {
    console.log(label, sclass, type, book, detail);
    let h1 = RDF4J.getHash();
    let h2 = RDF4J.getHash();
    let splitClass = sclass.split("_");
    let splitClass2 = splitClass[0].split(":");
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:X2_" + h1 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:X2_" + h1 + " " + "rdf:type" + " " + "ars:X2_Statement" + ". ";
    THIS_UPDATE += "ars3d:X2_" + h1 + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += "ars3d:X2_" + h1 + " " + "crm:P70_documents" + " " + book + ". ";
    THIS_UPDATE += "ars3d:X2_" + h1 + " " + "ars:Y1_hasDetailInfo" + " " + "'" + detail + "'@en" + ". ";
    THIS_UPDATE += "ars3d:X2_" + h1 + " " + "crm:P2_has_type" + " " + "ars3d:" + splitClass2[1] + "_" + h2 + ". ";
    THIS_UPDATE += "ars3d:" + splitClass2[1] + "_" + h2 + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:" + splitClass2[1] + "_" + h2 + " " + "rdf:type " + sclass + ". ";
    THIS_UPDATE += "ars3d:" + splitClass2[1] + "_" + h2 + " " + "rdfs:label" + " " + "'" + type + "'@en" + ". ";
    THIS_UPDATE += " }";
    console.log("createStatement", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

// connections

RDF4J.modifyObjectCondition = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " crm:P44_has_condition ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "-1") {
        THIS_UPDATE += object + " crm:P44_has_condition " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " crm:P44_has_condition ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectCondition", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyObjectFindspot = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " crm:P53_has_former_or_current_location ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "-1") {
        THIS_UPDATE += object + " crm:P53_has_former_or_current_location " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " crm:P53_has_former_or_current_location ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectFindspot", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyObjectResidence = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " crm:P55_has_current_location ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "-1") {
        THIS_UPDATE += object + " crm:P55_has_current_location " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " crm:P55_has_current_location ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectResidence", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyObjectShape = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " ars:Y3_hasShape ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "-1") {
        THIS_UPDATE += object + " ars:Y3_hasShape " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " ars:Y3_hasShape ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectShape", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyObjectPeriod = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " crm:P8_took_place_on_or_within ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "-1") {
        THIS_UPDATE += object + " crm:P8_took_place_on_or_within " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " crm:P8_took_place_on_or_within ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectPeriod", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyObjectManufacturing = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " ars:Y6_createdBy ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "-1") {
        THIS_UPDATE += object + " ars:Y6_createdBy " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " ars:Y6_createdBy ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectManufacturing", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.modifyObjectPotter = (object, node, callback) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += object + " ars:Y7_hasCreator ?node . ";
    THIS_UPDATE += "} INSERT { ";
    if (node !== "-1") {
        THIS_UPDATE += object + " ars:Y7_hasCreator " + node + " . ";
    }
    THIS_UPDATE += "} WHERE { OPTIONAL {";
    THIS_UPDATE += object + " ars:Y7_hasCreator ?node. ";
    THIS_UPDATE += "} } ";
    console.log("modifyObjectPotter", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.saveObjectStatement = (object, node, callback) => {
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += object + " ars:Y2_isStatedBy " + node + " . ";
    THIS_UPDATE += "} ";
    console.log("saveObjectStatement", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};

RDF4J.deleteObjectStatement = (object, node, callback) => {
    let THIS_UPDATE = "DELETE DATA { ";
    THIS_UPDATE += object + " ars:Y2_isStatedBy " + node + " . ";
    THIS_UPDATE += "} ";
    console.log("deleteObjectStatement", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            callback(false);
        },
        success: function(output) {
            console.log(output);
            callback(true);
        }
    });
};




/*RDF4J.createBildmotivWithPolygon = (object, wkt, label, parent) => {
    let bm = RDF4J.getHash();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:" + bm + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:" + bm + " " + "rdf:type" + " " + "ars:Applique" + ". ";;
    THIS_UPDATE += "ars3d:" + bm + " " + "rdfs:label" + " " + "'" + label + "'@en" + ". ";
    THIS_UPDATE += object + " " + "crm:P56_bears_feature" + " " + "ars3d:" + bm + ". ";
    THIS_UPDATE += parent + " " + "ars:contains" + " " + "ars3d:" + bm + ". ";
    let polygon = RDF4J.getHash();
    THIS_UPDATE += "ars3d:" + polygon + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:" + polygon + " " + "rdf:type" + " " + "ars:Polygon" + ". ";;
    THIS_UPDATE += "ars3d:" + polygon + " " + "rdfs:label" + " " + "'POINT(" + wkt + ")'" + ". ";
    THIS_UPDATE += "ars3d:" + bm + " " + "ars:hasPolygon" + " " + "ars3d:" + polygon + ". ";
    THIS_UPDATE += " }";
    console.log("createBildmotivWithPolygon", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
        },
        success: function(output) {
            console.log(output);
            window.open(document.URL, '_self');
        }
    });
}

RDF4J.deleteBildmotiv = (bm) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?bm ?p1 ?o1. ";
    THIS_UPDATE += "?s2 ?p2 ?bm.";
    THIS_UPDATE += "?polygon ?p3 ?o3. ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += "?bm ?p1 ?o1. ";
    THIS_UPDATE += "?s2 ?p2 ?bm. ";;
    THIS_UPDATE += "OPTIONAL { ?bm ars:hasPolygon ?polygon. ";
    THIS_UPDATE += "?polygon ?p3 ?o3. } ";
    THIS_UPDATE += "FILTER(?bm=" + bm + ") ";
    THIS_UPDATE += " }";
    console.log("deleteBildmotiv", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
        },
        success: function(output) {
            console.log(output);
            window.open(document.URL, '_self');
        }
    });
}

RDF4J.modifyBildmotiv = (object, wkt, label) => {
    let THIS_UPDATE = "DELETE { ";
    THIS_UPDATE += "?bm rdfs:label ?oldlabel. ";
    THIS_UPDATE += "?p rdfs:label ?oldgeom. ";
    THIS_UPDATE += "} INSERT { ";
    THIS_UPDATE += "?bm rdfs:label '" + label + "'@en. ";
    THIS_UPDATE += "?p rdfs:label '" + wkt + "'. ";
    THIS_UPDATE += "} WHERE { ";
    THIS_UPDATE += "?bm rdfs:label ?oldlabel. ";
    THIS_UPDATE += "?bm ars:hasPolygon ?p. ";
    THIS_UPDATE += "?p rdfs:label ?oldgeom. ";
    THIS_UPDATE += "FILTER(?bm=" + object + ") ";
    THIS_UPDATE += "}";
    console.log("modifyBildmotiv", THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
        },
        success: function(output) {
            console.log(output);
            window.open(document.URL, '_self');
        }
    });
}

RDF4J.createApplique = () => {
    let id = RDF4J.getHash();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:" + id + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:" + id + " " + "rdf:type" + " " + "ars:Applique" + ". ";;
    THIS_UPDATE += "ars3d:" + id + " " + "rdfs:label" + " " + "'" + $("#inp-modalCreateApplique").val() + "'@de" + ". ";
    THIS_UPDATE += THISNODE.s.value + " " + "crm:P56_bears_feature" + " " + "ars3d:" + id + ". ";
    THIS_UPDATE += " }";
    console.log(THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
        },
        success: function(output) {
            console.log(output);
            window.open(document.URL, '_self');
        }
    });
}*/

/*RDF4J.createPolygon = (applique, polygon) => {
    let id = RDF4J.getHash();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += "ars3d:" + id + " " + "rdf:type" + " " + "owl:NamedIndividual" + ". ";
    THIS_UPDATE += "ars3d:" + id + " " + "rdf:type" + " " + "ars:Polygon" + ". ";;
    THIS_UPDATE += "ars3d:" + id + " " + "rdfs:label" + " " + "'" + polygon + "'" + ". ";
    THIS_UPDATE += applique + " " + "ars:hasPolygon" + " " + "ars3d:" + id + ". ";
    THIS_UPDATE += " }";
    console.log(THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
        },
        success: function(output) {
            console.log(output);
            window.open(document.URL, '_self');
        }
    });
}

RDF4J.setDepiction = (applique, depiction) => {
    let id = RDF4J.getHash();
    let THIS_UPDATE = "INSERT DATA { ";
    THIS_UPDATE += applique + " " + "crm:P62_depicts" + " " + depiction + ". ";
    THIS_UPDATE += " }";
    console.log(THIS_UPDATE);
    let query = RDF4J.PREFIXES + " " + THIS_UPDATE;
    query = encodeURIComponent(query);
    $.ajax({
        type: 'POST',
        async: false,
        url: RDF4J.SPARQLUPDATE,
        dataType: "text",
        data: {
            query: query
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
        },
        success: function(output) {
            console.log(output);
            window.open(document.URL, '_self');
        }
    });
}*/
