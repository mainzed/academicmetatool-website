# AMT - Academic Meta Tool

AMT bietet die Möglichkeit sämtlichen Kanten eine Gewichtung hinzuzufügen, um dadurch die Vagheit dieser Kante auszudrücken. Eine Beziehung zwischen zwei Knoten besteht also nur zu einem gewissen Grad. Dieser Grad, d.h. das Kantengewicht, wird üblicherweise in Prozent angegeben. AMT beinhaltet zusätzlich ein Verfahren, mit dem - unter Zuhilfenahme einer vordefinierten Ontologie - aus vorhandenen graphbasierten Daten automatisch Schlussfolgerungen gezogen werden können (Reasoning). Ein Prototyp des AMTs steht hier als Web-Anwendung zur Verfügung. In einer entwickelten Test-Ontologie können Personen und Interessen und deren Beziehungen in einem gewissen Grad zueinander modelliert werden. Diese Ontologie beinhaltet neben den genannten beiden Klassen weitere Relationen, so dass Personen und Interessen miteinander in Beziehung gesetzt werden können. Außerdem enthält die Ontologie Axiome, um automatisiert aus bestehenden Beziehungen neue Beziehungen generieren zu können.

## Repos

Find all information about the ontology, viewer examples and source code in the [special repos](https://github.com/search?q=topic%3Aacademicmetatool+org%3Amainzed).

## Create your own AMT app?

Run `git clone https://github.com/mainzed/academicmetatool.git` to create a local copy of this repository.

Use the files in the `src` folder as example.

Create a new repository in a triplestore, that is available via an SPARQL endpoint. Sucessfully tested with `Open RDF Sesame` and `RDF4J` and set path in `amt.js` (`var STORE`).

Upload `amt_ontology.ttl` into the triplestore.

Create your own ontology, example given in `ontology.ttl`.

Upload `ontology.ttl` also into the triplestore.

Change the apperance of edges in nodes in `index.html` (`function update()`).

Run `index.html` in a browser.

## Credits

### Institutionen

* mainzed - Mainzer Zentrum für Digitalität in den Geistes- und Kulturwissenschaften
* i3mainz - Institut für Raumbezogene Informations- und Messtechnik
* RGZM - Römisch-Germanisches Zentralmuseum - Leibniz Forschungsinstitut für Archäologie

### Entwickler

* Martin Unold, Florian Thiery
