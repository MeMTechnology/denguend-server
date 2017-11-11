var usuarios;
var stringAgentes;
var dataReport;
$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: "/usuarios/",
        success: function(us){
            stringAgentes = "";
            for(i = 0; i < us.length; i++){
                stringAgentes += '<a tabindex= -1 href= # onclick=searchReport("visitaPorAgente","'+us[i].cod+'")>'+us[i].nome+'</a><br/>';
            }
            setUser(us);
        }
    });
 });
 
 function setDadosParaRelatorio(tipo, par1, par2){
     var x = JSON.parse(par2);
    //console.log("TIPO:"+x.id);
    var json = {id: tipo, data1: par1, data2: x.id};
    dataReport = JSON.stringify(json);
 }

 function getDadosRelatorio(){
     return dataReport;
 }

function deletaLinhas(tabela, linha, novaLinha){
    linha = tabela.rows.length;
    while(linha > 0){
        tabela.deleteRow(0);
        linha = tabela.rows.length;
    }
    novaLinha = tabela.insertRow(0);
    
    return novaLinha;
}

function getListByType(tipo, tabela,linha, novaLinha, corpo, elementos, select){
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
            
            if(select == 1){
                setDadosParaRelatorio("rota",rota,tipo);
                addTableAllRoute(rota, tabela, linha, novaLinha);
            }
            else{
                setDadosParaRelatorio("visita",rota, tipo);
                addTableVisita(rota, tabela, linha, novaLinha);
            }
    });
}

function geraJSON(idx, subId){
    var sendd = {id: idx, par:subId};
    return JSON.stringify(sendd);

}
function setUser(user){
    usuarios = user;
}

function searchReport(report, parametro) {
    dataReport = null;
    var tabela, linha, coluna, novaLinha, corpo;
    tabela = document.getElementById("table");

    var lis = document.getElementById("testeUL");

    lis.innerHTML = stringAgentes;
    
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

            getListByType(geraJSON('all',null), tabela,linha, novaLinha,corpo,elementos, 1);
        break;

        case "rotaAbertas":
            document.getElementById("search").placeholder = "Rotas abertas";

            novaLinha = deletaLinhas(tabela, linha, novaLinha);
             
             var elementos = ["cod","nome","Agente","status","data"];
             
             getListByType(geraJSON('abertas',null), tabela,linha, novaLinha,corpo,elementos, 1);
        break;

        case "rotaConcluida":
            document.getElementById("search").placeholder = "Rotas concluídas";

            novaLinha = deletaLinhas(tabela, linha, novaLinha);

            var elementos = ["cod","nome","Agente","status","data"];
    
            getListByType(geraJSON('concluidas',null), tabela,linha, novaLinha,corpo,elementos, 1);
        break;

        case "visitaTodas":
            document.getElementById("search").placeholder = "Todas as visitas";

            novaLinha = deletaLinhas(tabela, linha, novaLinha);
            
            var elementos = ["cod","Endereço","Número","Complemento","data","Há foco?","Realizada?"];

            getListByType(geraJSON('allVisita',null), tabela, linha, novaLinha,corpo,elementos, 2);
        break;

        case "visitaFoco":
            document.getElementById("search").placeholder = "Visitas com Foco";

            novaLinha = deletaLinhas(tabela, linha, novaLinha);
            
            var elementos = ["cod","Endereço","Número","Complemento","data","Há foco?","Realizada?"];
           
            getListByType(geraJSON('allVisitaFoco',null),tabela,linha, novaLinha,corpo,elementos, 2);
        break;

        case "visitaIncompletas":
            document.getElementById("search").placeholder = "Visitas incompletas";

            novaLinha = deletaLinhas(tabela, linha, novaLinha);
            
            var elementos = ["cod","Endereço","Número","Complemento","data","Há foco?","Realizada?"];
            
            getListByType(geraJSON('visitaIncompleta',null), tabela,linha, novaLinha,corpo,elementos, 2);
        break;

        case "visitaCompletas":
            document.getElementById("search").placeholder = "Visitas Completas";

            novaLinha = deletaLinhas(tabela, linha, novaLinha);
            
            var elementos = ["cod","Endereço","Número","Complemento","data","Há foco?","Realizada?"];
        
            getListByType(geraJSON('visitaCompleta',null), tabela,linha, novaLinha,corpo,elementos,2);
        break;


        case "visitaPorAgente":
            document.getElementById("search").placeholder = "Visitas por Agentes";

            
            //console.log("TESTE ACEITO:"+parametro);
            novaLinha = deletaLinhas(tabela, linha, novaLinha);
            
            var elementos = ["cod","Endereço","Número","Complemento","data","Há foco?","Realizada?"];

            getListByType(geraJSON('visitaPorAgente',parametro),tabela,linha, novaLinha,corpo,elementos, 2);
            
        
            //console.log("CVheoj");
            
        break;

    }
	
};

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

function addTableVisita(todas, tabela, linha, novaLinha){
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
            novaColuna.innerHTML = todas[i].id;
           
            novaColuna = novaLinha.insertCell(1);
            novaColuna.innerHTML = todas[i].endereco;
            
            novaColuna = novaLinha.insertCell(2);
            novaColuna.innerHTML = todas[i].numero;

            novaColuna = novaLinha.insertCell(3);
            novaColuna.innerHTML = todas[i].complemento;

            var novaColuna = novaLinha.insertCell(4);
            

            if(todas[i].data == null)
                novaColuna.innerHTML = "";
            else{
                var data = new Date(todas[i].data);
                novaColuna.innerHTML = data.toLocaleDateString();
            }

            novaColuna = novaLinha.insertCell(5);
            novaColuna.innerHTML = todas[i].focoDeDengue;

            novaColuna = novaLinha.insertCell(6);
            novaColuna.innerHTML = todas[i].visitaNaoRealizada;
        }
    }
    
    return false;
};