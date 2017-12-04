var AMT = function() {
	
	var CONCEPTS = [];
	var ROLES = [];
	var GRAPH = { original: {nodes: [], edges: []}, edited: {nodes: [], edges: []} };
	var AXIOMS = [];
	
	var STORE = "http://higeomes.i3mainz.hs-mainz.de/openrdf-sesame/repositories/mainzed";
	var PREFIX = "http://www.academic-meta-tool.org/";
	
	var queryStore = function(query,callback) {
		$.ajax({
			url: STORE,
			dataType: 'jsonp',
			type: 'GET',
			data: {
				queryLn: 'SPARQL',
				query: "PREFIX amt: <"+PREFIX+"> " + query,
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
			error: function(data) {
				console.log("Es ist ein Fehler aufgetreten: "+data);
				callback(data);
			}
		});
	}
	this.setStore = function(store) {
		STORE = store;
	}
	this.load = function(callback) {
		
		var todo = 5;
		
		// load concepts
		queryStore("SELECT ?concept ?label ?placeholder WHERE { ?concept rdf:type amt:Concept . ?concept rdfs:label ?label . ?concept amt:placeholder ?placeholder . }",function(data) {
			CONCEPTS = data;
			--todo;
			if (todo == 0 && callback)
				callback();
		});
		
		// load roles
		queryStore("SELECT ?role ?label ?domain ?range WHERE { ?role rdf:type amt:Role . ?role rdfs:label ?label . ?role rdfs:domain ?domain . ?role rdfs:range ?range . }",function(data) {
			ROLES = data;
			--todo;
			if (todo == 0 && callback)
				callback();
		});
		
		// load nodes
		queryStore("SELECT ?id ?label ?concept WHERE { ?concept rdf:type amt:Concept . ?id amt:instanceOf ?concept . ?id rdfs:label ?label . }",function(data) {
			GRAPH.original.nodes = data;
			GRAPH.edited.nodes = data;
			--todo;
			if (todo == 0 && callback)
				callback();
		});
		
		// load edges
		queryStore("SELECT ?role ?from ?to ?width WHERE { ?role rdf:type amt:Role . ?stmt rdf:subject ?from . ?stmt rdf:predicate ?role . ?stmt rdf:object ?to . ?stmt amt:weight ?width . }",function(data) {
			for (var i in data) {
				data[i].width /= 100;
			}
			GRAPH.original.edges = data;
			GRAPH.edited.edges = data;
			--todo;
			if (todo == 0 && callback)
				callback();
		});
		
		// load axioms
		queryStore("SELECT * WHERE { ?axiom rdf:type ?type . ?type rdfs:subClassOf ?grp . ?grp rdfs:subClassOf amt:Axiom . ?axiom ?p ?o . }",function(data) {
			for (var i in data) {
				if (!AXIOMS[data[i].axiom])
					AXIOMS[data[i].axiom] = {};
				if (data[i].p == "http://www.w3.org/1999/02/22-rdf-syntax-ns#type")
					AXIOMS[data[i].axiom].type = data[i].o.substr(PREFIX.length);
				else {
					AXIOMS[data[i].axiom][data[i].p.substr(PREFIX.length)] = data[i].o;
				}
			}
			--todo;
			if (todo == 0 && callback)
				callback();
		});
		
	};
	this.save = function(callback) {
		
		//updateStore();
		
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
		var id = "";
		GRAPH.edited.nodes.push({id: id, label: label, concept: concept});
		return consistent();
	};
	this.removeIndividual = function(id) {
		for (var i in GRAPH.edited.edges) {
			if (GRAPH.edited.edges[i].from == id || GRAPH.edited.edges[i].to == id) {
				GRAPH.edited.edges.splice(i,1);
			}
		}
		for (var i in GRAPH.edited.nodes) {
			if (GRAPH.edited.nodes[i].id == id) {
				GRAPH.edited.nodes.splice(i,1);
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