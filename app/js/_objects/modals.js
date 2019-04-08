let statement_i = 0;

// init modals
let initModalInstitutions = () => {
    let modal = document.getElementById('modalInstitutions');
    let btn = document.getElementById("btn-inst");
    btn.onclick = function() {
        modal.style.display = "block";
    }
    $("#btn-modal-inst-close").click(function() {
        modal.style.display = "none";
    });
};
let initModalContributors = () => {
    let modal = document.getElementById('modalContributors');
    let btn = document.getElementById("btn-cont");
    btn.onclick = function() {
        modal.style.display = "block";
    }
    $("#btn-modal-cont-close").click(function() {
        modal.style.display = "none";
    });
};
let openModalSaveResponse = (ok) => {
    loadData();
    loadNetwork();
    if (ok === true) {
        $("#btn-modalSaveResponse").removeClass("btn-danger");
        $("#btn-modalSaveResponse").addClass("btn-success");
        $("#btn-modalSaveResponse").html('<i class="fa fa-check" aria-hidden="true"></i> Data Saved');
    } else {
        $("#btn-modalSaveResponse").removeClass("btn-success");
        $("#btn-modalSaveResponse").addClass("btn-danger");
        $("#btn-modalSaveResponse").html('<i class="fa fa-bug" aria-hidden="true"></i> Server Error');
    }
    let modal = document.getElementById('modalSaveResponse');
    modal.style.display = "block";
    $("#btn-modalSaveResponse").click(function() {
        modal.style.display = "none";
    });
};
let initModalEditObject = () => {
    $("#btn-edit-object").click(function() {
        $("#modalEditObject").toggle();
        loadData();
    });
    $("#btn-modal-edit-object-close").click(function() {
        $("#modalEditObject").toggle();
    });
    $(".id").append(findGetParameter("uri"));
};
let initModalCreateMaterial = () => {
    $("#btn-material-new").click(function() {
        $("#inp-material-label").val("");
        $("#inp-material-rmi").val("");
        $("#modalCreateMaterial").toggle();
        $("#inp-material-label").trigger("keyup");
    });
    $("#btn-modal-create-material-close").click(function() {
        $("#modalCreateMaterial").toggle();
    });
    $("#btn-modalCreateMaterial").on('click', () => {
        RDF4J.createMaterial($("#inp-material-label").val(), $("#inp-material-rmi").val(), openModalSaveResponse);
        $("#modalCreateMaterial").toggle();
    });
};
let initModalModifyMaterial = () => {
    $("#btn-material-edit").click(function() {
        $("#inp-material-label-e").val($("#sel-material option:selected").attr("label"));
        $("#inp-material-rmi-e").val($("#sel-material option:selected").attr("rmi"));
        $("#inp-material-label-e").trigger("keyup");
        $("#modalModifyMaterial").toggle();
    });
    $("#btn-modal-modify-material-close").click(function() {
        $("#modalModifyMaterial").toggle();
    });
    $("#btn-modalModifyMaterial").on('click', () => {
        RDF4J.modifyMaterial($("#sel-material option:selected").val(), $("#inp-material-label-e").val(), $("#inp-material-rmi-e").val(), openModalSaveResponse);
        $("#modalModifyMaterial").toggle();
    });
};
let initModalCreateCondition = () => {
    $("#btn-condition-new").click(function() {
        $("#inp-condition-label").val("");
        $("#inp-condition-label").trigger("keyup");
        $("#modalCreateCondition").toggle();
    });
    $("#btn-modal-create-condition-close").click(function() {
        $("#modalCreateCondition").toggle();
    });
    $("#btn-modalCreateCondition").on('click', () => {
        RDF4J.createCondition($("#inp-condition-label").val(), openModalSaveResponse);
        $("#modalCreateCondition").toggle();
    });
};
let initModalCreateFindspot = () => {
    $("#btn-findspot-new").click(function() {
        $("#inp-findspot-label").val("");
        $("#inp-findspot-rmi").val("");
        $("#modalCreateFindspot").toggle();
        $("#inp-findspot-label").trigger("keyup");
    });
    $("#btn-modal-create-findspot-close").click(function() {
        $("#modalCreateFindspot").toggle();
    });
    $("#btn-modalCreateFindspot").on('click', () => {
        RDF4J.createFindspot($("#inp-findspot-label").val(), $("#inp-findspot-rmi").val(), openModalSaveResponse);
        $("#modalCreateFindspot").toggle();
    });
};
let initModalCreateResidence = () => {
    $("#btn-residence-new").click(function() {
        $("#inp-residence-label").val("");
        $("#inp-residence-rmi").val("");
        $("#modalCreateResidence").toggle();
        $("#inp-residence-label").trigger("keyup");
    });
    $("#btn-modal-create-residence-close").click(function() {
        $("#modalCreateResidence").toggle();
    });
    $("#btn-modalCreateResidence").on('click', () => {
        RDF4J.createResidence($("#inp-residence-label").val(), $("#inp-residence-rmi").val(), openModalSaveResponse);
        $("#modalCreateResidence").toggle();
    });
};
let initModalCreateShape = () => {
    $("#btn-shape-new").click(function() {
        $("#inp-shape-label").val("");
        $("#inp-shape-rmi").val("");
        $("#modalCreateShape").toggle();
        $("#inp-shape-label").trigger("keyup");
    });
    $("#btn-modal-create-shape-close").click(function() {
        $("#modalCreateShape").toggle();
    });
    $("#btn-modalCreateShape").on('click', () => {
        RDF4J.createShape($("#inp-shape-label").val(), $("#inp-shape-rmi").val(), openModalSaveResponse);
        $("#modalCreateShape").toggle();
    });
};
let initModalCreatePeriod = () => {
    $("#btn-period-new").click(function() {
        $("#inp-period-label").val("");
        $("#inp-period-rmi").val("");
        $("#modalCreatePeriod").toggle();
        $("#inp-period-label").trigger("keyup");
    });
    $("#btn-modal-create-period-close").click(function() {
        $("#modalCreatePeriod").toggle();
    });
    $("#btn-modalCreatePeriod").on('click', () => {
        RDF4J.createPeriod($("#inp-period-label").val(), $("#inp-period-rmi").val(), $("#inp-period-date").val(), openModalSaveResponse);
        $("#modalCreatePeriod").toggle();
    });
};
let initModalCreateManufacturing = () => {
    $("#btn-manufacturing-new").click(function() {
        $("#inp-manufacturing-label").val("");
        $("#inp-manufacturing-rmi").val("");
        $("#modalCreateManufacturing").toggle();
        $("#inp-manufacturing-label").trigger("keyup");
    });
    $("#btn-modal-create-manufacturing-close").click(function() {
        $("#modalCreateManufacturing").toggle();
    });
    $("#btn-modalCreateManufacturing").on('click', () => {
        RDF4J.createManufacturing($("#inp-manufacturing-label").val(), $("#inp-manufacturing-rmi").val(), openModalSaveResponse);
        $("#modalCreateManufacturing").toggle();
    });
};
let initModalCreatePotter = () => {
    $("#btn-potter-new").click(function() {
        $("#inp-potter-label").val("");
        $("#inp-potter-rmi").val("");
        $("#modalCreatePotter").toggle();
        $("#inp-potter-label").trigger("keyup");
    });
    $("#btn-modal-create-potter-close").click(function() {
        $("#modalCreatePotter").toggle();
    });
    $("#btn-modalCreatePotter").on('click', () => {
        RDF4J.createPotter($("#inp-potter-label").val(), openModalSaveResponse);
        $("#modalCreatePotter").toggle();
    });
};
let initModalCreateDocument = () => {
    $("#btn-document-new").click(function() {
        $("#inp-document-label").val("");
        $("#inp-document-rmi").val("");
        $("#modalCreateDocument").toggle();
        $("#inp-document-label").trigger("keyup");
    });
    $("#btn-modal-create-document-close").click(function() {
        $("#modalCreateDocument").toggle();
    });
    $("#btn-modalCreateDocument").on('click', () => {
        RDF4J.createDocument($("#inp-document-label").val(), $("#inp-document-rmi").val(), openModalSaveResponse);
        $("#modalCreateDocument").toggle();
    });
};

$("#btn-label-save").on('click', () => {
    RDF4J.modifyObjectLabel(findGetParameter("uri"), $("#inp-label").val(), openModalSaveResponse);
});
$("#btn-invno-save").on('click', () => {
    RDF4J.modifyObjectIdentifier(findGetParameter("uri"), $("#inp-invno").val(), openModalSaveResponse);
});
$("#btn-objecttype-save").on('click', () => {
    RDF4J.modifyObjectType(findGetParameter("uri"), $("#sel-objecttype option:selected").val(), openModalSaveResponse);
});
$("#btn-material-save").on('click', () => {
    RDF4J.modifyObjectMaterial(findGetParameter("uri"), $("#sel-material option:selected").val(), openModalSaveResponse);
});
$("#btn-condition-save").on('click', () => {
    RDF4J.modifyObjectCondition(findGetParameter("uri"), $("#sel-condition option:selected").val(), openModalSaveResponse);
});
$("#btn-findspot-save").on('click', () => {
    RDF4J.modifyObjectFindspot(findGetParameter("uri"), $("#sel-findspot option:selected").val(), openModalSaveResponse);
});
$("#btn-residence-save").on('click', () => {
    RDF4J.modifyObjectResidence(findGetParameter("uri"), $("#sel-residence option:selected").val(), openModalSaveResponse);
});
$("#btn-shape-save").on('click', () => {
    RDF4J.modifyObjectShape(findGetParameter("uri"), $("#sel-shape option:selected").val(), openModalSaveResponse);
});
$("#btn-period-save").on('click', () => {
    RDF4J.modifyObjectPeriod(findGetParameter("uri"), $("#sel-period option:selected").val(), openModalSaveResponse);
});
$("#btn-manufacturing-save").on('click', () => {
    RDF4J.modifyObjectManufacturing(findGetParameter("uri"), $("#sel-manufacturing option:selected").val(), openModalSaveResponse);
});
$("#btn-potter-save").on('click', () => {
    RDF4J.modifyObjectPotter(findGetParameter("uri"), $("#sel-potter option:selected").val(), openModalSaveResponse);
});

// INIT
console.log("init modals");
initModalInstitutions();
initModalContributors();
initModalEditObject();
initModalCreateMaterial();
initModalModifyMaterial();
initModalCreateCondition();
initModalCreateFindspot();
initModalCreateResidence();
initModalCreateShape();
initModalCreatePeriod();
initModalCreateManufacturing();
initModalCreatePotter();
initModalCreateDocument();

(function($) {
    $.each(['show', 'hide'], function(i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function() {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });
})(jQuery);

$('#modalEditObject').on('show', function(e) {
    $(this)
        .find("input,textarea,select")
        .val('')
        .end()
        .find("input[type=checkbox], input[type=radio]")
        .prop("checked", "")
        .end();
    $("#btn-label-info").removeClass("btn-green");
    $("#btn-label-info").addClass("btn-red");
    $("#btn-invno-info").removeClass("btn-green");
    $("#btn-invno-info").addClass("btn-red");
    $("#btn-objecttype-info").removeClass("btn-green");
    $("#btn-objecttype-info").addClass("btn-red");
    $("#btn-material-info").removeClass("btn-green");
    $("#btn-material-info").addClass("btn-red");
    $("#btn-condition-info").removeClass("btn-green");
    $("#btn-condition-info").addClass("btn-red");
    $("#btn-findspot-info").removeClass("btn-green");
    $("#btn-findspot-info").addClass("btn-red");
    $("#btn-residence-info").removeClass("btn-green");
    $("#btn-residence-info").addClass("btn-red");
    $("#btn-shape-info").removeClass("btn-green");
    $("#btn-shape-info").addClass("btn-red");
    $("#btn-period-info").removeClass("btn-green");
    $("#btn-period-info").addClass("btn-red");
    $("#btn-manufacturing-info").removeClass("btn-green");
    $("#btn-manufacturing-info").addClass("btn-red");
    $("#btn-potter-info").removeClass("btn-green");
    $("#btn-potter-info").addClass("btn-red");
    $("#statements").empty();
    statement_i = 0;
});

let addStatementDiv = () => {
    let div = "";
    div += '<div class="input-group statement">';
    div += '   <span class="input-group-addon btn-red addonw" id="btn-statement-info-' + statement_i + '">statement</span>';
    div += '   <span class="input-group-addon btn-red link" id="btn-statement-save-' + statement_i + '" data-toggle="tooltip" title="add statement to object"><i class="fa fa-flag"></i></span>';
    div += '   <span class="input-group-addon btn-red link" id="btn-statement-delete-' + statement_i + '" data-toggle="tooltip" title="delete statement to object"><i class="fa fa-eraser"></i></span>';
    div += '   <span class="input-group-addon btn-green2 link" id="btn-statement-edit-' + statement_i + '" data-toggle="tooltip" title="edit existing statement / search statement"><i class="fa fa-paint-brush"></i> <i class="fa fa-search"></i></span>';
    div += '   <span class="input-group-addon btn-cyan link" id="btn-statement-new-' + statement_i + '" data-toggle="tooltip" title="add new statement"><i class="fa fa-plus"></i></span>';
    div += '   <select id="sel-statement-' + statement_i + '" class="form-control" disabled>';
    div += '      <option value="-1" selected="selected"></option>';
    div += '   </select>';
    div += '</div>';
    div += '<br>';
    $("#statements").append(div);
    let $options = $("#sel-statement-hidden > option").clone();
    $("#sel-statement-" + statement_i).empty();
    $("#sel-statement-" + statement_i).append($options);
    $("#btn-statement-new-" + statement_i).unbind('click').click(function() {
        $("#inp-statement-label").val("");
        $("#inp-statement-detail").val("");
        $("#modalCreateStatement").toggle();
        $("#inp-statement-label").trigger("keyup");
    });
    $("#btn-statement-edit-" + statement_i).css("pointer-events", "auto");
    $(".statement").each(function(index) {
        $("#sel-statement-" + index).change(function() {
            if ($("#sel-statement-" + index + " option:selected").val() === "-1") {
                $("#btn-statement-info-" + index).removeClass("btn-green");
                $("#btn-statement-info-" + index).addClass("btn-red");
                $("#btn-statement-edit-" + index).css("pointer-events", "none");
                $("#btn-statement-edit-" + index).removeClass("btn-green2");
                $("#btn-statement-edit-" + index).addClass("btn-red");
                $("#btn-statement-save-" + index).css("pointer-events", "none");
                $("#btn-statement-save-" + index).css("pointer-events", "none");
                $("#btn-statement-save-" + index).removeClass("btn-cyan");
                $("#btn-statement-save-" + index).addClass("btn-red");
                $("#btn-statement-delete-" + index).css("pointer-events", "none");
                $("#btn-statement-delete-" + index).removeClass("btn-delete");
                $("#btn-statement-delete-" + index).addClass("btn-red");
            } else {
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
            }
        }).trigger("change");
        $("#btn-statement-save-" + index).unbind('click').click(function() {
            RDF4J.saveObjectStatement(findGetParameter("uri"), $("#sel-statement-" + index + " option:selected").val(), openModalSaveResponse);
        });
        $("#btn-statement-delete-" + index).unbind('click').click(function() {
            RDF4J.deleteObjectStatement(findGetParameter("uri"), $("#sel-statement-" + index + " option:selected").val(), openModalSaveResponse);
        });
    });
    statement_i++;
    return statement_i - 1;
};

$("#btn-statement-add").on('click', () => {
    let id = addStatementDiv();
    let $options = $("#sel-statement-hidden > option").clone();
    $("#sel-statement-" + id).empty();
    $("#sel-statement-" + id).append($options);
});
