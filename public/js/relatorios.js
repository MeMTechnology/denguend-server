/*var usuarios;

$(document).ready(function(){
	getAllUsers();
 });*/
function deletaLinhas(tabela, linha, novaLinha){
    linha = tabela.rows.length;
    while(linha > 0){
        tabela.deleteRow(0);
        linha = tabela.rows.length;
    }
    novaLinha = tabela.insertRow(0);
    
    return novaLinha;
}

function getListByType(tipo, tabela,linha, novaLinha, corpo, elementos){
    $.ajax({
        method: "GET",
        url: "/listarPorTipo/"+ tipo
    })
    .done(rota =>{
        for(var i = 0; i<elementos.length; i++){
            var novaColuna = novaLinha.insertCell(i);
               novaColuna.innerHTML = elementos[i];
            };
            corpo = document.createElement("tbody");
            corpo.setAttribute("id", "tbAllRoutes");
            tabela.appendChild(corpo);
            addTableAllRoute(rota, tabela, linha, novaLinha);
    });
}

function getAllUsers(){
    var users;
    $.ajax({
        method: "GET",
        url: "/usuarios/"
    })
    .done(agentes =>{
        //users = agentes;
        //console.log(JSON.stringify(agentes));
        reportByUsers(JSON.stringify(agentes));
    });
    //return JSON.stringify(users);
}

function searchReport(report) {
    
    var tabela, linha, coluna, novaLinha, corpo;
    tabela = document.getElementById("table");

    var lis = document.getElementById("testeUL");
    //lis.createElement("li");
    
    lis.innerHTML = "<a tabindex='-1' href='#' onclick='searchReport('rotaTodas')'>Todas</a>";
    
    linha = tabela.rows.length;
     
    switch (report){

        case "filtro":
            document.getElementById("search").placeholder = "Search";
        break;

        case "agentes":
            document.getElementById("search").placeholder = "Nome do agente";
    
            novaLinha = deletaLinhas(tabela, linha, novaLinha);
            
            var elementos = ["nome","sexo","CPF","Celular","senha"];
            
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
            getListByType("all",tabela,linha, novaLinha,corpo,elementos);
        break;

        case "rotaAbertas":
            document.getElementById("search").placeholder = "Rotas abertas";

            novaLinha = deletaLinhas(tabela, linha, novaLinha);
             
             var elementos = ["cod","nome","Agente","status","data"];
             getListByType("abertas",tabela,linha, novaLinha,corpo,elementos);
        break;

        case "rotaConcluida":
            document.getElementById("search").placeholder = "Rotas concluídas";

            novaLinha = deletaLinhas(tabela, linha, novaLinha);
            
            var elementos = ["cod","nome","Agente","status","data"];
            getListByType("concluidas",tabela,linha, novaLinha,corpo,elementos);
        break;

        case "visitaTodas":
            document.getElementById("search").placeholder = "Todas as visitas";

            novaLinha = deletaLinhas(tabela, linha, novaLinha);
            
            var elementos = ["cod","Endereço","Número","Complemento","data","Há foco?","Realizada?"];
            getListByType("allVisita",tabela,linha, novaLinha,corpo,elementos);
        break;

        case "visitaFoco":
            document.getElementById("search").placeholder = "Visitas com Foco";

            novaLinha = deletaLinhas(tabela, linha, novaLinha);
            
            var elementos = ["cod","Endereço","Número","Complemento","data","Realizada?"];
            getListByType("allVisitaFoco",tabela,linha, novaLinha,corpo,elementos);
        break;

        case "visitaIncompletas":
            document.getElementById("search").placeholder = "Visitas incompletas";

            novaLinha = deletaLinhas(tabela, linha, novaLinha);
            
            var elementos = ["cod","Endereço","Número","Complemento","data","Motivo"];
            getListByType("visitaIncompleta",tabela,linha, novaLinha,corpo,elementos);
        break;

        case "visitaCompletas":
            document.getElementById("search").placeholder = "Visitas Completas";

            novaLinha = deletaLinhas(tabela, linha, novaLinha);
            
            var elementos = ["cod","Endereço","Número","Complemento","data","Há foco?"];
            getListByType("visitaCompleta",tabela,linha, novaLinha,corpo,elementos);
        break;


        case "visitaPorAgente":
            document.getElementById("search").placeholder = "Visitas por Agentes";
            //alert("Alert:"+getAllUsers());
            getAllUsers();
        break;

    }
	
};

function reportByUsers(agentes){
    console.log("IMPrime: "+agentes);
}

function addTableAllRoute(todas, tabela, linha, novaLinha){
    var novaColuna;
   //Arrumar se nulo.
    if(todas.length === 0){
        novaLinha = tabela.insertRow(tabela.rows.length);
        
        novaColuna = novaLinha.insertCell(0);
        novaColuna.setAttribute("class", "text-center danger");
        novaColuna.setAttribute("colspan", "7");
        novaColuna.innerHTML = "Nenhum dado encontrado";
        
    }else{
        for (var i = 0; i<todas.length; i++){

            novaLinha = tabela.insertRow(tabela.rows.length);
           
            novaColuna = novaLinha.insertCell(0);
            novaColuna.innerHTML = todas[i].cod;
           
            novaColuna = novaLinha.insertCell(1);
            novaColuna.innerHTML = todas[i].nome;
            
            novaColuna = novaLinha.insertCell(2);
            novaColuna.innerHTML = todas[i].nomeAgente;

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