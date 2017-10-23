var listaLastRoutes = [];

var listarUltimasRotas = {

    init : function(){
        listarUltimasRotas.getRotas();
        
        $('#tableRotas').on("dblclick", "tr", function() {
            var tr = $(this).closest('tr').index();
            
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
            loadRoute(routeSelected);
        });
    },

    getRotas : function(){
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
                listaAgentes = agentes;
                cadastro.loadSelectBox(agentes);
            });
        },
        
        loadSelectBox : function(agentes){
            var box = document.getElementById("boxAgente");
            box.innerHTML = "";
    
            for(var option in agentes){
                var newOption = document.createElement("option");
                newOption.value = agentes[option].cod;
                newOption.innerHTML = agentes[option].nome;
                box.options.add(newOption);
            }
        },
    
        cadastrarRota: function(pontos){

            var e = document.getElementById("boxAgente");
            
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
