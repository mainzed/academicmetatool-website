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

$("#header").append(" " + findGetParameter("uri"));

const target = $('#mynetwork2')[0]; // Get DOM element from jQuery collection
$('#btn-fullscreen').on('click', () => {
    if (screenfull.enabled) {
        screenfull.request(target);
    }
});
$('#btn-open-geom-browser').on('click', () => {
    window.open('geombrowser.htm?object=' + findGetParameter("uri"), '_blank');
});
$('#btn-back').on('click', () => {
    window.open("objectlist.htm", '_self');
});

loadNetwork();

if (findGetParameter("uri").includes("E22_")) {
    $("#btn-edit-object").show();
    $("#btn-open-geom-browser").show();
} else {
    $("#btn-edit-object").hide();
    $("#btn-open-geom-browser").hide();
}
