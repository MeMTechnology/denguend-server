function searchReport(report) {
    
    switch (report){

        case "filtro":
            document.getElementById("search").placeholder = "Search";
        break;

        case "agentes":
            document.getElementById("search").placeholder = "Nome do agente";

            var tabela = document.getElementById("table");
            var linha = tabela.rows.length;
            var coluna = tabela.rows[linha-1].cells.length;
            var novaLinha = tabela.insertRow(linha);
            
            var elementos = ["nome","sexo","CPF","Celular","senha"];

            for(var i = 0; i< 5; i++){
            var novaColuna = novaLinha.insertCell(i);
               novaColuna.innerHTML = elementos[i];
            };
            var corpo = document.createElement("tbody");
            corpo.setAttribute("id", "tbAgentes");
            tabela.appendChild(corpo);
            
        break;

        case "rotaTodas":
            document.getElementById("search").placeholder = "Todas as Rotas";

            /*$.ajax({
                method: "GET",
                url: "/todasRotas"
            })
            .done(agente =>{
                
               $("#cod").val(agente[0].cod);
               $("#nome").val(agente[0].nome);
               $("#sexo").val(agente[0].sexo);
               $("#cpf").val(agente[0].cpf);
               $("#cel").val(agente[0].cel);
               $("#senha").val(agente[0].senha);
            });*/
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