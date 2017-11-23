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

function getListByType(tipo, tabela,linha, novaLinha, corpo, select){
    var elementos;
    novaLinha = deletaLinhas(tabela, linha, novaLinha);

    if(select == 1)
        elementos = ["COD","Nome","Agente","Status","Data"];

    else if (select == 2)
        elementos = ["COD","Endereço","Agente","Data","Há foco?","Realizada?"];

    $.ajax({
        method: "GET",
        url: "/listarPorTipo/"+ tipo
    })
    .done(rota =>{
        //console.log("CHEGA: "+JSON.stringify(rota));
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
            document.getElementById("search").placeholder = "Pesquisar";
        break;

        case "agentes":
            document.getElementById("search").placeholder = "Nome do agente";
    
            novaLinha = deletaLinhas(tabela, linha, novaLinha);
            
            var elementos = ["Nome","Sexo","CPF","Celular"];
            
            for(var i = 0; i< 4; i++){
            var novaColuna = novaLinha.insertCell(i);
               novaColuna.innerHTML = elementos[i];
            };

            corpo = document.createElement("tbody");
            corpo.setAttribute("id", "tbAgentes");
            tabela.appendChild(corpo);
            
            
        break;

        case "rotaTodas":
            document.getElementById("search").placeholder = "Todas as Rotas";

            getListByType(geraJSON('all',null), tabela,linha, novaLinha,corpo, 1);
        break;

        case "rotaAbertas":
            document.getElementById("search").placeholder = "Rotas abertas";
             
             getListByType(geraJSON('abertas',null), tabela,linha, novaLinha,corpo, 1);
        break;

        case "rotaConcluida":
            document.getElementById("search").placeholder = "Rotas concluídas";
    
            getListByType(geraJSON('concluidas',null), tabela,linha, novaLinha,corpo, 1);
        break;

        case "visitaTodas":
            document.getElementById("search").placeholder = "Todas as visitas";

            getListByType(geraJSON('allVisita',null), tabela, linha, novaLinha,corpo, 2);
        break;

        case "visitaFoco":
            document.getElementById("search").placeholder = "Visitas com Foco";
           
            getListByType(geraJSON('allVisitaFoco',null),tabela,linha, novaLinha,corpo, 2);
        break;

        case "visitaIncompletas":
            document.getElementById("search").placeholder = "Visitas incompletas";

            getListByType(geraJSON('visitaIncompleta',null), tabela,linha, novaLinha,corpo, 2);
        break;

        case "visitaCompletas":
            document.getElementById("search").placeholder = "Visitas Completas";
        
            getListByType(geraJSON('visitaCompleta',null), tabela,linha, novaLinha,corpo,2);
        break;


        case "visitaPorAgente":
            document.getElementById("search").placeholder = "Visitas por Agentes";

            getListByType(geraJSON('visitaPorAgente',parametro),tabela,linha, novaLinha,corpo, 2); 
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
            //var textStatus;
            todas[i].status == 1 ? novaColuna.innerHTML = "Concluída" : novaColuna.innerHTML = "Aberta";
            
            novaColuna = novaLinha.insertCell(4);

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
            novaColuna.innerHTML = todas[i].endereco + " "+ todas[i].numero+ " "+todas[i].complemento;
            
            novaColuna = novaLinha.insertCell(2);
            novaColuna.innerHTML = todas[i].agente;

            var novaColuna = novaLinha.insertCell(3);

            if(todas[i].dataPreenchimento == null)
                novaColuna.innerHTML = "";
            else{
                var data = new Date(todas[i].dataPreenchimento);
                novaColuna.innerHTML = data.toLocaleDateString();
            }

            novaColuna = novaLinha.insertCell(4);
            todas[i].focoDeDengue == 1 ? novaColuna.innerHTML = "Sim" : novaColuna.innerHTML = "Não";

            novaColuna = novaLinha.insertCell(5);
            todas[i].visitaNaoRealizada == 1 ? novaColuna.innerHTML = "Não" : novaColuna.innerHTML = "Sim";
            
        }
    }
    
    return false;
};