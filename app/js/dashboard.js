let initModalCreateObject = (result) => {
    let modal = document.getElementById('modalCreateObject');
    let btn = document.getElementById("btn-create-object");
    btn.onclick = function() {
        $("#inp-invno").val("");
        $("#inp-label").val("");
        modal.style.display = "block";
    }
    $("#btn-modal-create-object-close").click(function() {
        modal.style.display = "none";
    });
    $("#btn-modalCreateObject").on('click', () => {
        RDF4J.createObject($("#inp-invno").val(), $("#inp-label").val(),openModalSaveResponse);
        let modal = document.getElementById('modalCreateObject');
        modal.style.display = "none";
    });
};

let openModalSaveResponse = (ok) => {
    if (ok === true) {
        $("#btn-modalSaveResponse").removeClass("btn-danger");
        $("#btn-modalSaveResponse").addClass("btn-success");
        $("#btn-modalSaveResponse").html('<i class="fa fa-check" aria-hidden="true"></i> Object Added');
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

// INIT
initModalCreateObject();
