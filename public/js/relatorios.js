function deletaLinhas(tabela, linha, novaLinha){
    linha = tabela.rows.length;
    while(linha > 0){
        tabela.deleteRow(0);
        linha = tabela.rows.length;
    }
    novaLinha = tabela.insertRow(0);
    
    return novaLinha;
}

function searchReport(report) {
    
    var tabela, linha, coluna, novaLinha, corpo;
    tabela = document.getElementById("table");
    
    linha = tabela.rows.length;
     
    switch (report){

        case "filtro":
            document.getElementById("search").placeholder = "Search";
        break;

        case "agentes":
            document.getElementById("search").placeholder = "Nome do agente";
    
            novaLinha = deletaLinhas(tabela, linha, novaLinha);
            console.log("ANTES:")
            
            var elementos = ["nome","sexo","CPF","Celular","senha"];

            console.log("VAI: "+tabela.rows.length);
            for(var i = 0; i< 5; i++){
            var novaColuna = novaLinha.insertCell(i);
               novaColuna.innerHTML = elementos[i];
            };

            corpo = document.createElement("tbody");
            corpo.setAttribute("id", "tbAgentes");
            tabela.appendChild(corpo);
            
            
        break;

        case "rotaTodas":
            document.getElementById("search").placeholder = "Todas as Rotas";

           novaLinha = deletaLinhas(tabela, linha, novaLinha);
           //novaLinha = tabela.insertRow(0);
            
            var elementos = ["cod","nome","Agente","status","data"];

            $.ajax({
                method: "GET",
                url: "/todasRotas"
            })
            .done(rota =>{
            
                for(var i = 0; i< 5; i++){
                    var novaColuna = novaLinha.insertCell(i);
                       novaColuna.innerHTML = elementos[i];
                    };
                    corpo = document.createElement("tbody");
                    corpo.setAttribute("id", "tbAllRoutes");
                    tabela.appendChild(corpo);
                    addTableAllRoute(rota, tabela, linha, novaLinha);
               
            });
        break;

        case "rotaAbertas":
            document.getElementById("search").placeholder = "Rotas abertas";
        break;

        case "rotaConcluidas":
            document.getElementById("search").placeholder = "Rotas concluídas";
        break;

        case "rotaPorAgente":
            document.getElementById("search").placeholder = "Rota por agente";
        break;

        case "visitaTodas":
            document.getElementById("search").placeholder = "Todas as visitas";
        break;

        case "visitaFoco":
            document.getElementById("search").placeholder = "Visitas com Foco";
        break;

        case "visitaIncompletas":
            document.getElementById("search").placeholder = "Visitas incompletas";
        break;

        case "visitaCompletas":
            document.getElementById("search").placeholder = "Visitas Completas";
        break;

        case "visitaPorAgentes":
            document.getElementById("search").placeholder = "Visitas por Agentes";
        break;

        
    }
	
};

function addTableAllRoute(todas, tabela, linha, novaLinha){
    var novaColuna;
   //Arrumar se nulo.
    if(todas.length === 0){
        newRow = $("<tr>");
        columns = "";
        columns += '<td colspan="7" class="text-center danger">Nenhum dado encontrado.</td>'
        newRow.append(columns);
        $("#tbAllRoutes").append(newRow);
    }else{
        for (var i = 0; i<todas.length; i++){

            novaLinha = tabela.insertRow(tabela.rows.length);
           
            novaColuna = novaLinha.insertCell(0);
            novaColuna.innerHTML = todas[i].cod;
           
            novaColuna = novaLinha.insertCell(1);
            novaColuna.innerHTML = todas[i].nome;
            
            novaColuna = novaLinha.insertCell(2);
            novaColuna.innerHTML = todas[i].codAgente;

            novaColuna = novaLinha.insertCell(3);
            novaColuna.innerHTML = todas[i].status;

            var novaColuna = novaLinha.insertCell(4);
            

            if(todas[i].data == null)
                novaColuna.innerHTML = "";
            else{
                var data = new Date(todas[i].data);
                novaColuna.innerHTML = data.toLocaleDateString();
            }
        }
    }
    
    return false;
};
/*
function addTableAllRoute(todas,tabela, linha, novaLinha){
    var newRow, columns;
    
    if(todas.length === 0){
        newRow = $("<tr>");
        columns = "";
        columns += '<td colspan="7" class="text-center danger">Nenhum dado encontrado.</td>'
        newRow.append(columns);
        $("#tbAllRoutes").append(newRow);
    }else{
        for (var i in todas){
            
            newRow = $("<tr>");
            columns = "";
            
            columns += "<td>" + todas[i].cod + "</td>";
            columns += "<td>" + todas[i].nome + "</td>";
            columns += "<td>" + todas[i].codAgente + "</td>";
            columns += "<td>" + todas[i].status + "</td>";
            if(todas[i].data == null)
                columns += "<td></td>";
            else{
                var data = new Date(todas[i].data);
                columns += "<td>" + data.toLocaleDateString() + "</td>";
            }
            
            newRow.append(columns);
            $("#tbAllRoutes").append(newRow);
        }
    }
    
    return false;
};*/