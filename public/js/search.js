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

    function deletaLinhas(tabela, linha, novaLinha){
        linha = tabela.rows.length;
        while(linha > 0){
            tabela.deleteRow(0);
            linha = tabela.rows.length;
        }
        novaLinha = tabela.insertRow(0);
        
        return novaLinha;
    }
    
    
    function addTableRow(agentes){
        var tabela, linha, coluna, novaLinha, corpo;
        tabela = document.getElementById("table");
        
        linha = tabela.rows.length;
        var newRow, columns;

        novaLinha = deletaLinhas(tabela, linha, novaLinha);

        var elementos = ["Nome","Sexo","CPF","Celular"];
        
        for(var i = 0; i< 4; i++){
        var novaColuna = novaLinha.insertCell(i);
           novaColuna.innerHTML = elementos[i];
        };
        
        if(agentes.length === 0){
            novaLinha = tabela.insertRow(tabela.rows.length);
            novaColuna = novaLinha.insertCell(0);
            novaColuna.setAttribute("class", "text-center danger");
            novaColuna.setAttribute("colspan", "5");
            novaColuna.innerHTML = "Nenhum dado encontrado";
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
                novaColuna.innerHTML = '<td class="actions">'+
                '<a class="btn btn-danger btn-xs" href="/deletar/' + agentes[i].cod +'">Deletar</a>'+
                '<button type="button" class="btn btn-success btn-matheus btn-xs" data-toggle="modal" data-target="#myModal" onclick="setarValores(' + agentes[i].cod + ')">Editar</button>';
                
               // novaColuna = novaLinha.insertCell(6);
                //novaColuna.innerHTML = "";

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
    
})()

function editarValores(){
    var cod = parseInt($("#cod").val());
    var dados = $("#form-agentes").serialize()
    
    $.ajax({
        url: "/editar/" + cod,
        method: "POST",
        dataType: "json",
        async: true,
        data: dados,
        success : function(data) {
            console.log(data);
            alert('Editado com Sucesso');
        },
        redirect: "/relatorios"
    })
};