const connection = require('./conexao.js')

var rotaService = {
    save: function (dados, callback) {
        
        console.log(dados.body);
        var json = dados.body;
        //var idAgente = teste[0];
        //console.log(dados);
        //console.log(teste.idAgente);
        var query = connection.query('INSERT INTO rota SET ? ', [json], function (err, result){

            console.log(query.sql);
            if (err) throw err;
            callback(result.affectedRows); 
        });
      
    }
}
module.exports = rotaService;