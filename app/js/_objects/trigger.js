//trigger events for red or green light
$("#inp-label").keyup(function() {
    if ($("#inp-label").val().length === 0) {
        $("#btn-label-info").removeClass("btn-green");
        $("#btn-label-info").addClass("btn-red");
    } else {
        $("#btn-label-info").removeClass("btn-red");
        $("#btn-label-info").addClass("btn-green");
    }
}).trigger("change");
$("#inp-invno").keyup(function() {
    if ($("#inp-invno").val().length === 0) {
        $("#btn-invno-info").removeClass("btn-green");
        $("#btn-invno-info").addClass("btn-red");
    } else {
        $("#btn-invno-info").removeClass("btn-red");
        $("#btn-invno-info").addClass("btn-green");
    }
}).trigger("change");
$("#sel-objecttype").change(function() {
    if ($("#sel-objecttype option:selected").val() === "-1") {
        $("#btn-objecttype-info").removeClass("btn-green");
        $("#btn-objecttype-info").addClass("btn-red");
    } else {
        $("#btn-objecttype-info").removeClass("btn-red");
        $("#btn-objecttype-info").addClass("btn-green");
    }
}).trigger("change");
$("#sel-material").change(function() {
    if ($("#sel-material option:selected").val() === "-1") {
        $("#btn-material-info").removeClass("btn-green");
        $("#btn-material-info").addClass("btn-red");
        $("#btn-material-edit").css("pointer-events", "none");
        $("#btn-material-edit").removeClass("btn-green2");
        $("#btn-material-edit").addClass("btn-red");
    } else {
        $("#btn-material-info").removeClass("btn-red");
        $("#btn-material-info").addClass("btn-green");
        $("#btn-material-edit").css("pointer-events", "auto");
        $("#btn-material-edit").removeClass("btn-red");
        $("#btn-material-edit").addClass("btn-green2");
    }
}).trigger("change");
$("#sel-condition").change(function() {
    if ($("#sel-condition option:selected").val() === "-1") {
        $("#btn-condition-info").removeClass("btn-green");
        $("#btn-condition-info").addClass("btn-red");
        $("#btn-condition-edit").css("pointer-events", "none");
        $("#btn-condition-edit").removeClass("btn-green2");
        $("#btn-condition-edit").addClass("btn-red");
    } else {
        $("#btn-condition-info").removeClass("btn-red");
        $("#btn-condition-info").addClass("btn-green");
        $("#btn-condition-edit").css("pointer-events", "auto");
        $("#btn-condition-edit").removeClass("btn-red");
        $("#btn-condition-edit").addClass("btn-green2");
    }
}).trigger("change");
$("#sel-findspot").change(function() {
    if ($("#sel-findspot option:selected").val() === "-1") {
        $("#btn-findspot-info").removeClass("btn-green");
        $("#btn-findspot-info").addClass("btn-red");
        $("#btn-findspot-edit").css("pointer-events", "none");
        $("#btn-findspot-edit").removeClass("btn-green2");
        $("#btn-findspot-edit").addClass("btn-red");
    } else {
        $("#btn-findspot-info").removeClass("btn-red");
        $("#btn-findspot-info").addClass("btn-green");
        $("#btn-findspot-edit").css("pointer-events", "auto");
        $("#btn-findspot-edit").removeClass("btn-red");
        $("#btn-findspot-edit").addClass("btn-green2");
    }
}).trigger("change");
$("#sel-residence").change(function() {
    if ($("#sel-residence option:selected").val() === "-1") {
        $("#btn-residence-info").removeClass("btn-green");
        $("#btn-residence-info").addClass("btn-red");
        $("#btn-residence-edit").css("pointer-events", "none");
        $("#btn-residence-edit").removeClass("btn-green2");
        $("#btn-residence-edit").addClass("btn-red");
    } else {
        $("#btn-residence-info").removeClass("btn-red");
        $("#btn-residence-info").addClass("btn-green");
        $("#btn-residence-edit").css("pointer-events", "auto");
        $("#btn-residence-edit").removeClass("btn-red");
        $("#btn-residence-edit").addClass("btn-green2");
    }
}).trigger("change");
$("#sel-shape").change(function() {
    if ($("#sel-shape option:selected").val() === "-1") {
        $("#btn-shape-info").removeClass("btn-green");
        $("#btn-shape-info").addClass("btn-red");
        $("#btn-shape-edit").css("pointer-events", "none");
        $("#btn-shape-edit").removeClass("btn-green2");
        $("#btn-shape-edit").addClass("btn-red");
    } else {
        $("#btn-shape-info").removeClass("btn-red");
        $("#btn-shape-info").addClass("btn-green");
        $("#btn-shape-edit").css("pointer-events", "auto");
        $("#btn-shape-edit").removeClass("btn-red");
        $("#btn-shape-edit").addClass("btn-green2");
    }
}).trigger("change");
$("#sel-period").change(function() {
    if ($("#sel-period option:selected").val() === "-1") {
        $("#btn-period-info").removeClass("btn-green");
        $("#btn-period-info").addClass("btn-red");
        $("#btn-period-edit").css("pointer-events", "none");
        $("#btn-period-edit").removeClass("btn-green2");
        $("#btn-period-edit").addClass("btn-red");
    } else {
        $("#btn-period-info").removeClass("btn-red");
        $("#btn-period-info").addClass("btn-green");
        $("#btn-period-edit").css("pointer-events", "auto");
        $("#btn-period-edit").removeClass("btn-red");
        $("#btn-period-edit").addClass("btn-green2");
    }
}).trigger("change");
$("#sel-manufacturing").change(function() {
    if ($("#sel-manufacturing option:selected").val() === "-1") {
        $("#btn-manufacturing-info").removeClass("btn-green");
        $("#btn-manufacturing-info").addClass("btn-red");
        $("#btn-manufacturing-edit").css("pointer-events", "none");
        $("#btn-manufacturing-edit").removeClass("btn-green2");
        $("#btn-manufacturing-edit").addClass("btn-red");
    } else {
        $("#btn-manufacturing-info").removeClass("btn-red");
        $("#btn-manufacturing-info").addClass("btn-green");
        $("#btn-manufacturing-edit").css("pointer-events", "auto");
        $("#btn-manufacturing-edit").removeClass("btn-red");
        $("#btn-manufacturing-edit").addClass("btn-green2");
    }
}).trigger("change");
$("#sel-potter").change(function() {
    if ($("#sel-potter option:selected").val() === "-1") {
        $("#btn-potter-info").removeClass("btn-green");
        $("#btn-potter-info").addClass("btn-red");
        $("#btn-potter-edit").css("pointer-events", "none");
        $("#btn-potter-edit").removeClass("btn-green2");
        $("#btn-potter-edit").addClass("btn-red");
    } else {
        $("#btn-potter-info").removeClass("btn-red");
        $("#btn-potter-info").addClass("btn-green");
        $("#btn-potter-edit").css("pointer-events", "auto");
        $("#btn-potter-edit").removeClass("btn-red");
        $("#btn-potter-edit").addClass("btn-green2");
    }
}).trigger("change");
$("#sel-document").change(function() {
    if ($("#sel-document option:selected").val() === "-1") {
        $("#btn-document-edit").css("pointer-events", "none");
        $("#btn-document-edit").removeClass("btn-green2");
        $("#btn-document-edit").addClass("btn-red");
    } else {
        $("#btn-document-edit").css("pointer-events", "auto");
        $("#btn-document-edit").removeClass("btn-red");
        $("#btn-document-edit").addClass("btn-green2");
    }
}).trigger("change");

// modals
// material
$("#inp-material-label").keyup(function() {
    if ($("#inp-material-label").val().length > 0 && $("#inp-material-rmi").val().length > 0) {
        $("#btn-modalCreateMaterial").show();
    } else {
        $("#btn-modalCreateMaterial").hide();
    }
}).trigger("change");
$("#inp-material-rmi").keyup(function() {
    if ($("#inp-material-label").val().length > 0 && $("#inp-material-rmi").val().length > 0) {
        $("#btn-modalCreateMaterial").show();
    } else {
        $("#btn-modalCreateMaterial").hide();
    }
}).trigger("change");
$("#inp-material-label-e").keyup(function() {
    if ($("#inp-material-label-e").val().length > 0 && $("#inp-material-rmi-e").val().length > 0) {
        $("#btn-modalModifyMaterial").show();
    } else {
        $("#btn-modalModifyMaterial").hide();
    }
}).trigger("change");
$("#inp-material-rmi-e").keyup(function() {
    if ($("#inp-material-label-e").val().length > 0 && $("#inp-material-rmi-e").val().length > 0) {
        $("#btn-modalModifyMaterial").show();
    } else {
        $("#btn-modalModifyMaterial").hide();
    }
}).trigger("change");
// condition
$("#inp-condition-label").keyup(function() {
    if ($("#inp-condition-label").val().length > 0) {
        $("#btn-modalCreateCondition").show();
    } else {
        $("#btn-modalCreateCondition").hide();
    }
}).trigger("change");
// findspot
$("#inp-findspot-label").keyup(function() {
    if ($("#inp-findspot-label").val().length > 0 && $("#inp-findspot-rmi").val().length > 0) {
        $("#btn-modalCreateFindspot").show();
    } else {
        $("#btn-modalCreateFindspot").hide();
    }
}).trigger("change");
$("#inp-findspot-rmi").keyup(function() {
    if ($("#inp-findspot-label").val().length > 0 && $("#inp-findspot-rmi").val().length > 0) {
        $("#btn-modalCreateFindspot").show();
    } else {
        $("#btn-modalCreateFindspot").hide();
    }
}).trigger("change");
// residence
$("#inp-residence-label").keyup(function() {
    if ($("#inp-residence-label").val().length > 0 && $("#inp-residence-rmi").val().length > 0) {
        $("#btn-modalCreateResidence").show();
    } else {
        $("#btn-modalCreateResidence").hide();
    }
}).trigger("change");
$("#inp-residence-rmi").keyup(function() {
    if ($("#inp-residence-label").val().length > 0 && $("#inp-residence-rmi").val().length > 0) {
        $("#btn-modalCreateResidence").show();
    } else {
        $("#btn-modalCreateResidence").hide();
    }
}).trigger("change");
// shape
$("#inp-shape-label").keyup(function() {
    if ($("#inp-shape-label").val().length > 0 && $("#inp-shape-rmi").val().length > 0) {
        $("#btn-modalCreateShape").show();
    } else {
        $("#btn-modalCreateShape").hide();
    }
}).trigger("change");
$("#inp-shape-rmi").keyup(function() {
    if ($("#inp-shape-label").val().length > 0 && $("#inp-shape-rmi").val().length > 0) {
        $("#btn-modalCreateShape").show();
    } else {
        $("#btn-modalCreateShape").hide();
    }
}).trigger("change");
// period
$("#inp-period-label").keyup(function() {
    if ($("#inp-period-label").val().length > 0 && $("#inp-period-rmi").val().length > 0 && $("#inp-period-date").val().length > 0) {
        $("#btn-modalCreatePeriod").show();
    } else {
        $("#btn-modalCreatePeriod").hide();
    }
}).trigger("change");
$("#inp-period-rmi").keyup(function() {
    if ($("#inp-period-label").val().length > 0 && $("#inp-period-rmi").val().length > 0 && $("#inp-period-date").val().length > 0) {
        $("#btn-modalCreatePeriod").show();
    } else {
        $("#btn-modalCreatePeriod").hide();
    }
}).trigger("change");
$("#inp-period-date").keyup(function() {
    if ($("#inp-period-label").val().length > 0 && $("#inp-period-rmi").val().length > 0 && $("#inp-period-date").val().length > 0) {
        $("#btn-modalCreatePeriod").show();
    } else {
        $("#btn-modalCreatePeriod").hide();
    }
}).trigger("change");
// manufacturing
$("#inp-manufacturing-label").keyup(function() {
    if ($("#inp-manufacturing-label").val().length > 0 && $("#inp-manufacturing-rmi").val().length > 0) {
        $("#btn-modalCreateManufacturing").show();
    } else {
        $("#btn-modalCreateManufacturing").hide();
    }
}).trigger("change");
$("#inp-manufacturing-rmi").keyup(function() {
    if ($("#inp-manufacturing-label").val().length > 0 && $("#inp-manufacturing-rmi").val().length > 0) {
        $("#btn-modalCreateManufacturing").show();
    } else {
        $("#btn-modalCreateManufacturing").hide();
    }
}).trigger("change");
// potter
$("#inp-potter-label").keyup(function() {
    if ($("#inp-potter-label").val().length > 0) {
        $("#btn-modalCreatePotter").show();
    } else {
        $("#btn-modalCreatePotter").toggle();
    }
}).trigger("change");
// document
$("#inp-manufacturing-label").keyup(function() {
    if ($("#inp-document-label").val().length > 0 && $("#inp-document-rmi").val().length > 0) {
        $("#btn-modalCreateDocument").show();
    } else {
        $("#btn-modalCreateDocument").hide();
    }
}).trigger("change");
$("#inp-document-rmi").keyup(function() {
    if ($("#inp-document-label").val().length > 0 && $("#inp-document-rmi").val().length > 0) {
        $("#btn-modalCreateDocument").show();
    } else {
        $("#btn-modalCreateDocument").hide();
    }
}).trigger("change");
