function relatorio() {
	let search = $("#search").val();
	getAgentById(search);
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
	   $("#rg").val(agente[0].rg);
	   $("#dn").val(agente[0].dn);
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
		  
           gerarPdf(agentes) 
        });
 };
 
 function gerarPdf(agentes){
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