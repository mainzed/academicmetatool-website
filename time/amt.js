function StrID() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 12; i++)
	text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function UUID(){
	var dt = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (dt + Math.random()*16)%16 | 0;
		dt = Math.floor(dt/16);
		return (c=='x' ? r :(r&0x3|0x8)).toString(16);
	});
	return uuid;
}

function copyToClipboard(element) {
  	var text = $(element).clone().find('br').prepend('\r\n').end().text();
	//console.log(text);
    element = $('<textarea>').appendTo('body').val(text).select();
    document.execCommand('copy');
    element.remove();
}

var AMT = function() {

	var CONCEPTS = [];
	var ROLES = [];
	var GRAPH = { original: {nodes: [], edges: []}, edited: {nodes: [], edges: []} };
	var AXIOMS = [];

	var STORE = "http://ls-dev.i3mainz.hs-mainz.de/rdf4j-server/repositories/amttime";
	var PREFIX = "http://www.academic-meta-tool.xyz/vocab#";
  var PREFIXES = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX amt: <http://academic-meta-tool.xyz/vocab#> ";

	var queryStore = function(query,callback) {
		$.ajax({
			url: STORE,
			dataType: 'jsonp',
			type: 'GET',
			data: {
				queryLn: 'SPARQL',
				query: PREFIXES + query,
				Accept: 'application/json'
			},
			success: function(data) {
				var bindings = data.results.bindings;
				for (var i in bindings) {
					for (var j in bindings[i]) {
						if (bindings[i][j].value)
							bindings[i][j] = bindings[i][j].value;
					}
				}
				callback(bindings);
			},
			error: function(data) {
				console.log("Es ist ein Fehler aufgetreten: "+data);
				callback([]);
			}
		});
	};
	var updateStore = function(query,callback) {
		$.ajax({
			url: STORE+"/statements",
			type: 'POST',
			data: {
				update: "PREFIX amt: <"+PREFIX+"> " + query
			},
			success: callback,
			error: callback
		});
	}
	this.setStore = function(store) {
		STORE = store;
	}
	this.load = function(callback) {
		loadGraph(function(graph) {
			GRAPH.edited = copy(graph);
			GRAPH.original = copy(graph);
			callback();
		});
	}
	var loadGraph = function(callback) {

		var todo = 5;
		var graph = {};

		// load concepts
		queryStore("SELECT ?concept ?label ?placeholder WHERE { ?concept rdf:type amt:Concept . ?concept rdfs:label ?label . ?concept amt:placeholder ?placeholder . }",function(data) {
      CONCEPTS = data;
			--todo;
			if (todo == 0 && callback) {
				callback(graph);
			}
		});

		// load roles
		queryStore("SELECT ?role ?label ?domain ?range WHERE { ?role rdf:type amt:Role . ?role rdfs:label ?label . ?role rdfs:domain ?domain . ?role rdfs:range ?range . } ORDER BY ASC(?label)",function(data) {
			ROLES = data;
			--todo;
			if (todo == 0 && callback) {
				callback(graph);
			}
		});

		// load nodes
		queryStore("SELECT ?id ?label ?concept WHERE { ?concept rdf:type amt:Concept . ?id amt:instanceOf ?concept . ?id rdfs:label ?label . }",function(data) {
			graph.nodes = data;
			--todo;
			if (todo == 0 && callback) {
				callback(graph);
			}
		});

		// load edges
		queryStore("SELECT ?role ?from ?to ?width WHERE { ?role rdf:type amt:Role . ?stmt rdf:subject ?from . ?stmt rdf:predicate ?role . ?stmt rdf:object ?to . ?stmt amt:weight ?width . }",function(data) {
			graph.edges = data;
			--todo;
			if (todo == 0 && callback) {
				callback(graph);
			}
		});

		// load axioms
		queryStore("SELECT * WHERE { ?axiom rdf:type ?type . ?type rdfs:subClassOf ?grp . ?grp rdfs:subClassOf amt:Axiom . ?axiom ?p ?o . }",function(data) {
			for (var i in data) {
				if (!AXIOMS[data[i].axiom])
					AXIOMS[data[i].axiom] = {};
				if (data[i].p == "http://www.w3.org/1999/02/22-rdf-syntax-ns#type")
					AXIOMS[data[i].axiom].type = data[i].o.substr(PREFIX.length-4);
				else {
          AXIOMS[data[i].axiom][data[i].p.substr(PREFIX.length-4)] = data[i].o;
				}
			}
      console.log(AXIOMS);
			--todo;
			if (todo == 0 && callback) {
				callback(graph);
			}
		});

	};
	this.save = function(callback) {
		loadGraph(function(graph) {
			var modified = false;
			for (var i in GRAPH.original.nodes) {
				var contains = false;
				for (var j in graph.nodes) {
					if (GRAPH.original.nodes[i].id == graph.nodes[j].id) {
						contains = true;
					}
				}
				if (!contains) {
					modified = true;
				}
			}
			if (modified) {
				alert("Graph ist nicht aktuell und muss nun synchronisiert werden");
				// TODO: merge
				callback();
			}
			else {
				var insert = "";
				for (var i in GRAPH.edited.nodes) {
					insert += "<"+GRAPH.edited.nodes[i].id+"> amt:instanceOf <"+GRAPH.edited.nodes[i].concept+"> . ";
					insert += "<"+GRAPH.edited.nodes[i].id+"> rdfs:label \""+GRAPH.edited.nodes[i].label+"\" . ";
				}
				for (var i in GRAPH.edited.edges) {
					insert += "_:"+i+" rdf:subject <"+GRAPH.edited.edges[i].from+"> . ";
					insert += "_:"+i+" rdf:predicate <"+GRAPH.edited.edges[i].role+"> . ";
					insert += "_:"+i+" rdf:object <"+GRAPH.edited.edges[i].to+"> . ";
					insert += "_:"+i+" amt:weight "+GRAPH.edited.edges[i].width+" . ";
				}
				var query = "";
				query += " DELETE { ?id amt:instanceOf ?concept . ?id rdfs:label ?label . } WHERE { ?concept rdf:type amt:Concept . ?id amt:instanceOf ?concept . ?id rdfs:label ?label . } ; ";
				query += " DELETE { ?stmt rdf:subject ?from . ?stmt rdf:predicate ?role . ?stmt rdf:object ?to . ?stmt amt:weight ?width . } WHERE { ?role rdf:type amt:Role . ?stmt rdf:subject ?from . ?stmt rdf:predicate ?role . ?stmt rdf:object ?to . ?stmt amt:weight ?width . } ; ";
				query += " INSERT { "+insert+" } WHERE { }";
				updateStore(query,callback);
			}
		});
	};

	var copy = function(graph) {
		var cpy = {nodes: [], edges: []};
		for (var i in graph.nodes) {
			cpy.nodes.push({id: graph.nodes[i].id, label: graph.nodes[i].label, concept: graph.nodes[i].concept});
		}
		for (var i in graph.edges) {
			cpy.edges.push({role: graph.edges[i].role, from: graph.edges[i].from, to: graph.edges[i].to, width: graph.edges[i].width});
		}
		return cpy;
	};
	var search = function(edges,role,from,to) {
		for (var i in edges) {
			if (edges[i].role == role && edges[i].from == from && edges[i].to == to) {
				return i;
			}
		}
		return -1;
	};
	var updateReasoning = function(edges,role,from,to,width) {
		var k = search(edges,role,from,to);
		if (k>=0 && edges[k].width < width) {
			edges[k].width = width;
			return true;
		}
		if (k<0 && width>0) {
			edges.push({role: role, from: from, to: to, width: width});
			return true;
		}
		return false;
	};
	var conjunction = function(x,y,logic) {
		if (logic == PREFIX+"LukasiewiczLogic")
			return Math.max(x+y-1,0);
		if (logic == PREFIX+"ProductLogic")
			return x*y;
		if (logic == PREFIX+"GoedelLogic")
			return Math.min(x,y);
		return 0;
	};
	var doReasoning = function(graph) {
		var change = true;
		while (change) {
			change = false;
			for (var i in AXIOMS) {
				var a = AXIOMS[i];

				if (a.type == "RoleChainAxiom") {
					for (var j1 in graph.edges) {
						for (var j2 in graph.edges) {
							if (graph.edges[j1].to == graph.edges[j2].from && graph.edges[j1].role == a.antecedent1 && graph.edges[j2].role == a.antecedent2) {
								var c = conjunction(graph.edges[j1].width,graph.edges[j2].width,a.logic);
								if (updateReasoning(graph.edges,a.consequent,graph.edges[j1].from,graph.edges[j2].to,c))
									change = true;
							}
						}
					}
				}

				if (a.type == "InverseAxiom") {
					for (var j in graph.edges) {
						if (graph.edges[j].role == a.antecedent) {
							var c = graph.edges[j].width;
							if (updateReasoning(graph.edges,a.inverse,graph.edges[j].to,graph.edges[j].from,c))
								change = true;
						}
					}
				}

			}
		}
		return graph;
	};
	var consistent = function() {
		var graph = doReasoning(copy(GRAPH.edited));
		for (var i in AXIOMS) {
			var a = AXIOMS[i];

			if (a.type == "DisjointAxiom") {
				for (var j in graph.edges) {
					if (graph.edges[j].role == a.role1 && search(graph.edges,a.role2,graph.edges[j].from,graph.edges[j].to)>=0) {
						return false;
					}
				}
			}

			if (a.type == "SelfDisjointAxiom") {
				for (var k in graph.edges) {
					if (graph.edges[k].role == a.role && graph.edges[k].from == graph.edges[k].to) {
						return false;
					}
				}
			}

		}
		return true;
	};

	this.addIndividual = function(label,concept) {
		var id = PREFIX+StrID();
		GRAPH.edited.nodes.push({id: id, label: label, concept: concept});
		return id;
	};
  this.addExistingIndividual = function(id,label,concept) {
		GRAPH.edited.nodes.push({id: id, label: label, concept: concept});
		return id;
	};
	this.removeIndividual = function(id) {
		var change = true;
		while (change) {
			change = false;
			for (var i in GRAPH.edited.edges) {
				if (GRAPH.edited.edges[i].from == id || GRAPH.edited.edges[i].to == id) {
					GRAPH.edited.edges.splice(i,1);
					change = true;
					break;
				}
			}
		}
		for (var i in GRAPH.edited.nodes) {
			if (GRAPH.edited.nodes[i].id == id) {
				GRAPH.edited.nodes.splice(i,1);
				break;
			}
		}
		return consistent();
	};
	this.editAssertion = function(role,from,to,width) {
		var index = search(GRAPH.edited.edges,role,from,to);
		if (index >= 0) {
			if (width > 0)
				GRAPH.edited.edges[index].width = width;
			else
				GRAPH.edited.edges.splice(index,1);
		}
		else {
			if (width > 0)
				GRAPH.edited.edges.push({role: role, from: from, to: to, width: width});
		}
		return consistent();
	};
  this.addExistingAssertion = function(id,role,from,to,width) {
		GRAPH.edited.edges.push({role: role, from: from, to: to, width: width});
		return consistent();
	};
	this.cancel = function() {
		GRAPH.edited = copy(GRAPH.original);
	}
	this.getConcepts = function() {
		return CONCEPTS;
	};
	this.getRoles = function() {
		return ROLES;
	};
	this.getGraph = function(reasoning,edited) {
		if (edited) {
			if (reasoning) {
				return doReasoning(copy(GRAPH.edited));
			}
			else {
				return copy(GRAPH.edited);
			}
		}
		else {
			if (reasoning) {
				return doReasoning(copy(GRAPH.original));
			}
			else {
				return copy(GRAPH.original);
			}
		}
	};

};
