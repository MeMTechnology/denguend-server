(function () {
    
    function getAgenteById(search) {
        $.ajax({
            method: "GET",
            url: "/relatorios/" + search
        })
        .done(agentes =>{
            addTableRow(agentes); 
        });
    };
    
    
    function addTableRow(agentes){
        var tabela, linha, coluna, novaLinha, corpo;
        tabela = document.getElementById("table");
        
        linha = tabela.rows.length;
        var newRow, columns;
        
        if(agentes.length === 0){
            newRow = $("<tr>");
            columns = "";
            columns += '<td colspan="7" class="text-center danger">Nenhum dado encontrado.</td>'
            newRow.append(columns);
            $("#tbAgentes").append(newRow);
        }else{
            for (var i in agentes){
                
                
                novaLinha = tabela.insertRow(tabela.rows.length);

                novaColuna = novaLinha.insertCell(0);
                novaColuna.innerHTML = agentes[i].nome;

                novaColuna = novaLinha.insertCell(1);
                novaColuna.innerHTML = agentes[i].sexo;

                novaColuna = novaLinha.insertCell(2);
                novaColuna.innerHTML = agentes[i].cpf;

                novaColuna = novaLinha.insertCell(3);
                novaColuna.innerHTML = agentes[i].cel;

                novaColuna = novaLinha.insertCell(4);
                novaColuna.innerHTML = agentes[i].senha;

                novaColuna = novaLinha.insertCell(5);
                novaColuna.innerHTML = '<td class="actions">'+
                '<a class="btn btn-danger btn-xs" href="/deletar/' + agentes[i].cod +'">Deletar</a>'+
                '<button type="button" class="btn btn-success btn-matheus btn-xs" data-toggle="modal" data-target="#myModal" onclick="setarValores(' + agentes[i].cod + ')">Editar</button>';

            }
        }
        
        return false;
    };
    
    $("#pesquisar").on("submit", event =>{
        let search = $("#search").val();
        //$("#tbAgentes tr").remove();//Essa linha q estava fazendo o cabeçalho da tabela sumir.
        getAgenteById(search);
        return false;
    });

    $("#form-agentes").on("submit", event =>{
        var cod = parseInt($("#cod").val());
        var dados = $("#form-agentes").serialize()
        
        $.ajax({
            url: "/editar/" + cod,
            type: "post",
            dataType: "json",
            async: true,
            data: dados
        })
       
    });
    
})()