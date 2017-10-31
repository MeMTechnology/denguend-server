const connection = require('./conexao.js')

var visitaService = {
    cadastrarVisita: function (dados, callback) {
        
        console.log("Chegou Aqui falta fazer o banco: "+dados);
        /*
        var query = connection.query('INSERT INTO `visita` SET ? ', [dados], function (err, result){
            console.log(query.sql);
            if (err) throw err;
            callback(result.affectedRows); 
        });
     */   
    }
}

module.exports = visitaService;	