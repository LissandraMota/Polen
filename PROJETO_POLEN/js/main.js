//Carregar Tabela localStorage  
$(document).ready(function () {
    carregarOngs();
});

//Abrir Modal
$(document).ready(function () { 
    $("#btn-modal").click(function () {
        $('#modal-inserir').modal('show');

        $('#modal-inserir #name').val('');
        $('#modal-inserir #slogan').val('');
        $('#modal-inserir #site').val('');
    }); 
});

//Editar ONG
$(document).ready(function () {
    $("#btn-editar").click(function () {
        
        var id = $('#modal-editar #id').val();
        var name = $('#modal-editar #name').val().trim();
        var slogan = $('#modal-editar #slogan').val().trim();
        var site = $('#modal-editar #site').val().trim();
        var ativo = $('#modal-editar #ativo:checked').length > 0;

        var obj = {
            name: name,
            slogan: slogan,
            site: site,
            check: ativo
        }

        var obj = JSON.stringify(obj)
        
        localStorage.setItem(id, obj)

        location.reload();
    }); 
});

//Salvar ONG
$(document).ready(function () {
    $("#btn-inserir").click(function () {
        var name = $('#modal-inserir #name').val().trim();
        var slogan = $('#modal-inserir #slogan').val().trim();
        var site = $('#modal-inserir #site').val().trim();

        var obj = {
            name: name,
            slogan: slogan,
            site: site,
            check: false
        }
        
        var id = parseInt(maiorIdRegistro()) + 1;

        var obj = JSON.stringify(obj)
        localStorage.setItem(id, obj)

        location.reload();
    }); 
});

//Abrir edição de ONG
$(document).on("click", "#edit-linha", function(){

    var id = $(this).parents('tr').attr('id');
    var obj = localStorage.getItem(id);
    var objeto = JSON.parse(obj);

    $('#modal-editar #id').val(id)
    $('#modal-editar #name').val(objeto.name)
    $('#modal-editar #slogan').val(objeto.slogan)
    $('#modal-editar #site').val(objeto.site)

    if(objeto.check){
        $('#modal-editar #ativo').attr('checked', 'checked');
    } else {
        $('#modal-editar #ativo').removeAttr('checked', 'checked');
    }

    $('#modal-editar').modal('show');
});

//Remover Ong
$(document).on("click", "#remove-linha", function(){
    var id = $(this).parents('tr').attr('id');
    localStorage.removeItem(id);
    carregarOngs();
    location.reload();
});

//Trata check-box
$(document).on("click", "#check-linha", function(e){
    var checked = $(this).prop('checked');
    var id = $(this).parents('tr').attr('id');
    var obj = localStorage.getItem(id);
    var objeto = JSON.parse(obj);
    objeto.check = checked;
    var update = JSON.stringify(objeto);
    localStorage.setItem(id, update);
    if(checked){
        $(this).parents('tr').css('background-color', 'lightgreen');
    } else {
        $(this).parents('tr').removeAttr('style');
    }
});

$(document).ready(function () {
    $('#table-ongs').DataTable({
        "searching": true,
        "lengthChange": false,
        "pageLength": 5,
        "ordering":  false
    });
    $('.dataTables_length').addClass('bs-select');
});

//Adicionar na tabela
function adicionarNovaOng(obj, i) {
    var objeto = JSON.parse(obj)

    add = "<tr :color id='"+ i + "'><td id='name'>"+ objeto.name +"</td><td id='slogan'>"+ objeto.slogan +"</td><td id='site'>"+ objeto.site +"</td><td><input id='check-linha' :checked type='checkbox' aria-label='Marque'></td><td><a href='#' id='remove-linha'>deletar</a> | <a href='#' id='edit-linha'>editar</a></td></tr>";

    var check = objeto.check == true ? 'checked' : '';
    var color = objeto.check == true ? 'style="background-color:lightgreen"' : '';

    add = add.replace(':checked', check);
    add = add.replace(':color', color);
     
    tableBody = $("table tbody"); 
    tableBody.append(add);
}

//carregar Ongs na tabela
function carregarOngs() {
    var keys = Object.keys(localStorage);
    keys.sort();
    var i = keys.length;

    while (i -- ) {
        var obj = localStorage.getItem(keys[i]);
        adicionarNovaOng(obj, keys[i]);
    }
}

//Recupera maior Registro do storage
function maiorIdRegistro(){
    var keys = Object.keys(localStorage);
    var i = keys.length;
    var maior = 0;
    while (i -- ) {
        var key = parseInt(keys[i]);

        if(key > maior){
            maior = keys[i];
        }
    }

    return maior ;
}