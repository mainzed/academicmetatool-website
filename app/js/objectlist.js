let fillObjectsTbl = (json) => {
    console.log("fillObjectsTbl", json);
    if ($.isEmptyObject(json)) {
        html_str = "<p><b>no data</b></p>";
    } else {
        html_str = "";
        var vars = json.head.vars;
        var bindings = json.results.bindings;
        html_str = "<table id='tbl-objects'>";
        for (var item in vars) {
            html_str += "<th>" + vars[item] + "</th>";
        }
        var bgcolor = true;
        for (var binding in bindings) {
            var size = 100 / vars.length;
            if (bgcolor) {
                html_str += "<tr width='" + size + "%' class='nobg'>";
            } else {
                html_str += "<tr width='" + size + "%' class='bg'>";
            }
            for (var varstr in vars) {
                var tblTxt = "";
                tblTxt = bindings[binding][vars[varstr]].value;
                console.log("tblTxt", tblTxt);
                if (tblTxt.includes("ars3d")) {
                    console.log(bindings[binding][vars[varstr]].value);
                    html_str += "<td width='" + size + "%'>" + "<a style='color:blue !important;' href='objects.htm?uri=" + bindings[binding][vars[varstr]].value + "' target='_self'>" + tblTxt + "</a>" + "</td>";
                } else {
                    html_str += "<td width='" + size + "%'>" + tblTxt + "</td>";
                }
            }
            html_str += "</tr>";
            if (bgcolor) {
                bgcolor = false;
            } else {
                bgcolor = true;
            }
        }
        html_str += "</table>";
    }
    // set div/span with sparql table content
    $('#div-object-table').html("");
    $('#div-object-table').html(html_str);
}

RDF4J.query("SELECT ?object ?label ?identifier WHERE { ?object a crm:E22_Man-Made_Object. ?object rdfs:label ?label. ?object crm:P1_is_identified_by ?e42 . ?e42 rdfs:label ?identifier. }", fillObjectsTbl);
