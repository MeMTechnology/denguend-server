var listaLastRoutes = [];

var listarUltimasRotas = {

    init : function(){
        listarUltimasRotas.getRotas();
        $('#tableRotas').on("dblclick", "tr", function() {
			var tr = $(this).closest('tr').index();

            //console.log("print: "+listaLastRoutes[tr].cod );
            listarUltimasRotas.getSelectedRoute(listaLastRoutes[tr].cod);
		        
		});
    },

    getSelectedRoute : function(cod){
        $.ajax({
            method: "GET",
            url: "/getSelectedRoute/"+cod
        })
        .done(routeSelected =>{
            //chamar método no arquivo mapa.
            //console.log("RETORNA: "+routeSelected);
            loadRoute(routeSelected);
        });
    },

    getRotas : function(){
        //var teste = [];
        $.ajax({
            method: "GET",
            url: "/ultimasRotas"
        })
        .done(lastRoutes =>{
            console.log(lastRoutes);
            listarUltimasRotas.addTableRow(lastRoutes);
            listaLastRoutes = lastRoutes;
        });

        
    },

    addTableRow : function(lastRoutes){
        var newRow, columns;
        
        if(lastRoutes.length === 0){
            newRow = $("<tr>");
            columns = "";
            columns += '<td colspan="7" class="text-center danger">Nenhum dado encontrado.</td>'
            newRow.append(columns);
            $("#tbLastRoutes").append(newRow);
        }
        else{
            //console.log(lastRoutes);
            for (var i in lastRoutes){
                if(lastRoutes[i].cod == null)continue;
                newRow = $("<tr>")
                columns = "";
                
                columns += "<td>" + lastRoutes[i].cod + "</td>";
                columns += "<td>" + lastRoutes[i].nome + "</td>";
                if(lastRoutes[i].data == null)
                    columns += "<td></td>";
                else
                    columns += "<td>" + lastRoutes[i].data + "</td>";

                newRow.append(columns);
                $("#tbLastRoutes").append(newRow);
            }
        }
    }

}

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
                newOption.value = agentes[option].cod;
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
                    nome: $('#nomeRota').val(),
                    codAgente:(parseInt(e.options[e.selectedIndex].value)),
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
listarUltimasRotas.init();
