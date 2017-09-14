(function () {
    
    function getAgenteById(search) {
        $.ajax({
            method: "GET",
            url: "/relatorios/" + search
        })
        .done(agentes =>{
           addTableRow(agentes) 
        });
    };
    
    
    function addTableRow(agentes){
        var newRow, columns;
        
        if(agentes.lenght === 0){
            newRow = $("<tr>");
            columns = "";
            columns += '<td colspan="12" class="text-center danger">Nenhum dado encontrado.</td>'
            newRow.append(columns);
            $("#tbAgentes").append(newRow);
        }else{
            for (var i in agentes){
                
                newRow = $("<tr>")
                columns = "";
                
                columns += "<td>" + agentes[i].nome + "</td>";
                columns += "<td>" + agentes[i].sexo + "</td>";
                columns += "<td>" + agentes[i].cpf + "</td>";
                columns += "<td>" + agentes[i].rg + "</td>";
                columns += "<td>" + agentes[i].dn + "</td>";
                columns += "<td>" + agentes[i].cel + "</td>";
                columns += "<td>" + agentes[i].senha + "</td>";
                
                columns += '<td class="actions">';
                columns += '<a class="btn btn-danger btn-xs" href="/deletar/' + agentes[i].cod +'">Deletar</a>';
                columns += '<button type="button" class="btn btn-success btn-matheus btn-xs" data-toggle="modal" data-target="#myModal" onclick="setarValores(' + agentes[i].cod + ')">Editar</button>';
                columns += '</td>';
                
                newRow.append(columns);
                $("#tbAgentes").append(newRow);
            }
        }
        
        return false;
    };
    
    $("#pesquisar").on("submit", event =>{
        let search = $("#search").val();
        $("#tbAgentes tr").remove();
        getAgenteById(search);
        return false;
    });

    $("#form-movie").on("submit", event =>{
        var cod = parseInt($("#cod").val());
        var dados = $("#form-movie").serialize()

        $.ajax({
            url: "/editar/" + cod,
            type: "post",
            dataType: "json",
            async: true,
            data: dados
        })
    });

})()