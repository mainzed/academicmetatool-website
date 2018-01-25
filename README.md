# AMT - Academic Meta Tool

AMT bietet die Möglichkeit sämtlichen Kanten eine Gewichtung hinzuzufügen, um dadurch die Vagheit dieser Kante auszudrücken. Eine Beziehung zwischen zwei Knoten besteht also nur zu einem gewissen Grad. Dieser Grad, d.h. das Kantengewicht, wird üblicherweise in Prozent angegeben. AMT beinhaltet zusätzlich ein Verfahren, mit dem - unter Zuhilfenahme einer vordefinierten Ontologie - aus vorhandenen graphbasierten Daten automatisch Schlussfolgerungen gezogen werden können (Reasoning). Ein Prototyp des AMTs steht hier als Web-Anwendung zur Verfügung. In einer entwickelten Test-Ontologie können Personen und Interessen und deren Beziehungen in einem gewissen Grad zueinander modelliert werden. Diese Ontologie beinhaltet neben den genannten beiden Klassen weitere Relationen, so dass Personen und Interessen miteinander in Beziehung gesetzt werden können. Außerdem enthält die Ontologie Axiome, um automatisiert aus bestehenden Beziehungen neue Beziehungen generieren zu können.

## They AMT Ontology

[amt_ontology.ttl](https://github.com/AcademicMetaTool/amt/blob/master/amt_ontology.ttl).

## Example Ontologies

* [Personen-Interessen-Netzwerk](https://github.com/AcademicMetaTool/amt/blob/master/playground/ontology_mainzed.ttl).
* [Töpfer-Punzen-Netzwerk ](https://github.com/AcademicMetaTool/amt/blob/master/playground/samian_mainzed.ttl).

## AMT Playground

[AMT Playground](http://academic-meta-tool.xyz/playground/).

## Create your own AMT app?

Run `git clone https://github.com/AcademicMetaTool/amt.git` to create a local copy of this repository.

Create a new repository in a triplestore, that is available via an SPARQL endpoint. Sucessfully tested with `Open RDF Sesame` and `RDF4J` and set path in `amt.js` (`var STORE`).

Upload `amt_ontology.ttl` into the triplestore.

Create your own ontology, example given in `ontology.ttl`.

Upload `ontology.ttl` also into the triplestore.

Change the apperance of edges in nodes in `index.html` (`function update()`).

Run `index.html` in a browser.

## More Information

* [Official Website](http://academic-meta-tool.xyz)
* [Info PDF (outdated)](http://unold.net/amt/amt.pdf)
