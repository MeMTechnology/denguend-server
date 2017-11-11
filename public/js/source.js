function relatorio() {

	var dataReport = JSON.parse(getDadosRelatorio());
	if(getDadosRelatorio() == null){
		let search = $("#search").val();
		getAgentById(search);
	}
	else{
		if(dataReport.id == "rota")
			gerarPdfRotas(dataReport);
		else if(dataReport.id == "visita")
			gerarPdfVisitas(dataReport);
	}
};

function setarValores(id){
	$.ajax({
		method: "GET",
		url: "/filtrarModal/" + id
	})
	.done(agente =>{
		
	   $("#cod").val(agente[0].cod);
	   $("#nome").val(agente[0].nome);
	   $("#sexo").val(agente[0].sexo);
	   $("#cpf").val(agente[0].cpf);
	   $("#cel").val(agente[0].cel);
	   $("#senha").val(agente[0].senha);
	});

}

function getAgentById(search) {
		
		$.ajax({
            method: "GET",
            url: "/relatorios/" + search
        })
        .done(agentes =>{
		  
           gerarPdfAgentes(agentes) 
        });
 };

 function gerarPdfVisitas(dataReport){
	//console.log("TESTANDO::"+JSON.stringify(dataReport));//VAI DAR CERTO. Só trabalhar os dados.

	var titulo;
	switch(dataReport.data2){
		case 'allVisita': titulo = 'Todas as Visitas'; break;
		case 'allVisitaFoco': titulo = 'Visitas com Foco de Dengue'; break;
		case 'visitaIncompleta': titulo = "Visitas incompletas"; break;
		case 'visitaCompleta': titulo = "Visitas Concluídas"; break;
		case 'visitaPorAgente': titulo = "Visitas por Agente"; break;
	}
	var aux;
	var doc = new jsPDF();
	
	var tab = [20,30,80,100,130,150,170];
	doc.setFontSize(24);
	doc.setTextColor(200,100,0);
	doc.text(60, 20, titulo);
	doc.setFontSize(8);
	doc.setTextColor(0,0,0);
	doc.text(parseInt(tab[0]), 40, 'ID');
	doc.text(parseInt(tab[1]), 40, 'Endereço');
	doc.text(parseInt(tab[2]), 40, 'Nº');
	doc.text(parseInt(tab[3]), 40, 'Complemento');
	doc.text(parseInt(tab[4]), 40, 'data');
	doc.text(parseInt(tab[5]), 40, 'Foco?');
	doc.text(parseInt(tab[6]), 40, 'Visita OK?');	
	
	if(dataReport.data1.length == 0){
		doc.text(20, 50, "Nenhuma rota cadastrada")
	}
	else{
		for(i = 0, j = 50; i < dataReport.data1.length; i++,j = j+ 8){
			
			doc.text(parseInt(tab[0]), j, dataReport.data1[i].id.toString());
			doc.text(parseInt(tab[1]), j, dataReport.data1[i].endereco);
			doc.text(parseInt(tab[2]), j, dataReport.data1[i].numero);
			doc.text(parseInt(tab[3]), j, dataReport.data1[i].complemento);

			var mData = new Date(dataReport.data1[i].data);
			var dataEnd = mData.toLocaleDateString();
			doc.text(parseInt(tab[4]), j, dataEnd);
			
			doc.text(parseInt(tab[5]), j, dataReport.data1[i].focoDeDengue.toString());//Depois arrumo
			doc.text(parseInt(tab[6]), j, dataReport.data1[i].visitaNaoRealizada.toString());//Depois arrumo			
		
		}
	}
	doc.save('todasRotas.pdf')
 }

 function gerarPdfRotas(dataReport){
	//console.log("TESTANDO::"+JSON.stringify(dataReport));//VAI DAR CERTO. Só trabalhar os dados.

	var titulo;
	switch(dataReport.data2){
		case 'all': titulo = 'Todas as Rotas'; break;
		case 'abertas': titulo = "Rotas Abertas"; break;
		case 'concluidas': titulo = "Rotas Concluídas"; break;
	}
	var aux;
	var doc = new jsPDF();
	
	var tab = [20,40,70,120,170];
	doc.setFontSize(24);
	doc.setTextColor(200,100,0);
	doc.text(60, 20, titulo);
	doc.setFontSize(8);
	doc.setTextColor(0,0,0);
	doc.text(parseInt(tab[0]), 40, 'COD');
	doc.text(parseInt(tab[1]), 40, 'Nome');
	doc.text(parseInt(tab[2]), 40, 'Agente');
	doc.text(parseInt(tab[3]), 40, 'status');
	doc.text(parseInt(tab[4]), 40, 'data');
	
	console.log('taatat: '+dataReport.data1[0].nome);
	if(dataReport.data1.length == 0){
		doc.text(20, 50, "Nenhuma rota cadastrada")
	}
	else{
		for(i = 0, j = 50; i < dataReport.data1.length; i++,j = j+ 8){
			
			doc.text(parseInt(tab[0]), j, dataReport.data1[i].cod.toString());
			doc.text(parseInt(tab[1]), j, dataReport.data1[i].nome);
			doc.text(parseInt(tab[2]), j, dataReport.data1[i].nomeAgente);

			var mData, dataEnd;
			if(dataReport.data1[i].status == 1){
				aux = "Finalizada";
				mData = new Date(dataReport.data1[i].data);
				dataEnd = mData.toLocaleDateString();
			}
			else{
				aux = "Aberta";
				dataEnd = "";
			}
			doc.text(parseInt(tab[3]), j, aux);
			
			doc.text(parseInt(tab[4]), j, dataEnd);

		}
	}
	doc.save('todasRotas.pdf')
 }
 
 function gerarPdfAgentes(agentes){
	var doc = new jsPDF();
	
	var tab = [20,80,120,170];
	doc.setFontSize(24);
	doc.setTextColor(200,100,0);
	doc.text(60, 20, 'Usuários Cadastrados');
	doc.setFontSize(8);
	doc.setTextColor(0,0,0);
	doc.text(parseInt(tab[0]), 40, 'Nome');
	doc.text(parseInt(tab[1]), 40, 'CPF');
	doc.text(parseInt(tab[2]), 40, 'Celular');
	doc.text(parseInt(tab[3]), 40, 'Senha');
	
	if(agentes.length == 0){
		doc.text(20, 50, "No agentes found")
	}
	else{
		for(i = 0, j = 50; i < agentes.length; i++,j = j+ 8){
			
			doc.text(parseInt(tab[0]), j, agentes[i].nome);
			doc.text(parseInt(tab[1]), j, agentes[i].cpf);
			doc.text(parseInt(tab[2]), j, agentes[i].cel);
			doc.text(parseInt(tab[3]), j, agentes[i].senha);

		}
	}
	doc.save('usarios_cadastrados.pdf')
 }