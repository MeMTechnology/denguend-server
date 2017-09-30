//var listaAgentes = [];
var cadastro = {

    getAllAgentes : function() {
        $.ajax({
            method: "GET",
            url: "/usuarios/"
        })
        .done(agentes =>{
            var json = JSON.stringify(agentes);
            //alert(json);
            //alert(agentes.length);
            listaAgentes = agentes;
            cadastro.loadSelectBox(agentes);
        });
    },
    
    loadSelectBox : function(agentes){
        var box = document.getElementById("boxAgente");
        box.innerHTML = "";

        //var optionArray= ["Tiao","ze","Joao"];

        for(var option in agentes){
            var newOption = document.createElement("option");
            newOption.value = agentes[option].nome;
            //console.log(newOption);
            newOption.innerHTML = agentes[option].nome;
            box.options.add(newOption);
        }
    },

    cadastrarRota: function(pontos){
        //console.log("TESTEANDADF: "+dados);
        //Vamos tentar enviar os dados pro banco......
        //Pontos da rota e o agente.
        var e = document.getElementById("boxAgente");
        //Esse index aí acho q é o da lista exibida no html. Por sorte, concide com o cód real do agente,
        //se for preciso, utilizar a variavel comentada no inicio para pegar o cód real do agente.
        console.log(e.options[e.selectedIndex].index);
        
        //var dados = e.options[e.selectedIndex].index
        
        $.ajax({
            url: "/cadastroRotaMapa",
            method: "POST",
            dataType: "json",
            async: true,
            data: {
                codAgente:parseInt(e.options[e.selectedIndex].index),
                nome: $('#nomeRota').val(),
                status: 0,
                pontosRota: pontos
            },
        })
        
    },

    init : function(){
        cadastro.getAllAgentes();
    }
}
cadastro.init();

/*function cadastrarRota(dados){
    
    
};*/