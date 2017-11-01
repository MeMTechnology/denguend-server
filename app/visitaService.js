const connection = require('./conexao.js')

var visitaService = {
    cadastrarVisita: function (dados, callback) {
		
		var mData = new Date();
		var hoje = mData.toISOString().substring(0, 10);
		
		console.log("ID :"+dados.codRota);
        
        
		var sql = "INSERT INTO visita (endereco, numero, complemento, rotaId, pontoLocal, dataPreenchimento, nomeDoMorador,"+
		"focoDeDengue, descricaoFocos, visitaNaoRealizada, motivoImpedimento) "+
		"VALUES ('"+dados.endereco+"','"+dados.numero+"','"+dados.complemento+"','"+parseInt(dados.codRota)+"','"+JSON.stringify(dados.pontoLocal)+"','"+hoje+"','"+dados.morador+"','"+dados.isFoco+"','"+dados.descricao+"','"+JSON.stringify(dados.isVisita)+"','"+dados.motivo+"')";
        
        connection.query(sql, function (err, result){
            //console.log(query.sql);
            if (err) throw err;
            callback({"sim":"yes"}); 
        });
      
    }
}

module.exports = visitaService;	