(function(){

    function getAllAgentes() {
        $.ajax({
            method: "GET",
            url: "/usuarios/"
        })
        .done(agentes =>{
            var json = JSON.stringify(agentes);
            //alert(json);
            //alert(agentes.length);
            loadSelectBox(agentes);
        });
    };

    function loadSelectBox(agentes){
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
    };

    getAllAgentes();
})()