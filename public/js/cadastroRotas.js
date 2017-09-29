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

    cadastrarRota: function(dados){
        console.log("TESTEANDADF: "+dados);
        //Vamos tentar enviar os dados pro banco......
        //Pontos da rota e o agente.
        /*$.ajax({
            url: "/cadastrar",
            type: "post",
            dataType: "json",
            async: true,
            data: dados,
        })*/
        
    },

    init : function(){
        cadastro.getAllAgentes();
    }
}
cadastro.init();

/*function cadastrarRota(dados){
    
    
};*/