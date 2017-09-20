(function (){

$("#form-cadastro").on("submit", event =>{

    var dados = $("#form-cadastro").serialize()
    var cpf = $("#cpf").val()

    $.ajax({
        method: "GET",
        url: "/relatorios/" + cpf
    }).done(agentes =>{
        if(agentes.length === 0) {
            cadastrarAgente(dados);
        }else{
            alert("CPF já cadastrado!!");
        }
    });

});

function cadastrarAgente(dados){
    
    $.ajax({
        url: "/cadastrar",
        type: "post",
        dataType: "json",
        async: true,
        data: dados,
    })
};
    
})()