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
	doc.setFontSize(24);
	doc.setTextColor(255,0,0);
	doc.text(70, 20, 'DENGUEND');
	doc.setFontSize(12);
	doc.setTextColor(0,0,0);
	doc.text(20, 40, 'Nome');
	doc.text(90, 40, 'Sexo');
	doc.text(120, 40, 'CPF');
	doc.text(160, 40, 'RG');
	//doc.text(200, 40, 'Data De Nascimento');
	//doc.text(220, 40, 'Celular');
	//doc.text(240, 40, 'Senha');

/*	if(agentes.length === 0){
		doc.text(300, 50, "No agentes found")
	}else{
		
	
	for(i = 0, j = 50; i < agentes.length; i++,j = j+ 10){
		
		var dn = agentes[i].dn.toString();
		
		doc.text(20, j, agentes[i].nome);
		doc.text(90, j, agentes[i].sexo);
		doc.text(120, j, agentes[i].cpf);
		doc.text(160, j, agentes[i].rg);
		doc.text(200, j, agentes[i].dn);
		doc.text(220, j, agentes[i].cel);
		doc.text(240, j, agentes[i].senha);

	}
	
	} */
	
	doc.output('dataurlnewwindow');
 }