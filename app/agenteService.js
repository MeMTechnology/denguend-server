const connection = require('./conexao.js')

var moviesService = {
    save: function (dados, callback) {
        
        console.log(dados.nome);
        
        var query = connection.query('INSERT INTO `agentes` SET ? ', [dados], function (err, result){
        console.log(query.sql);
        if (err) throw err;
       callback(result.affectedRows); 
        });
        
    },
    
    filter: function (nome, callback) {    
        connection.query('SELECT * FROM agentes WHERE '
                         + 'nome LIKE "%'+ nome + '%" OR cpf LIKE "%'+ nome +'%" OR rg LIKE "%' + nome +'%" OR cel LIKE "%' + nome +'%"'
                         + 'ORDER BY cod', [nome,nome,nome,nome],function (error, results) {
                              if(error) throw error;
                            
                              callback(results)
                          });
    },
    delete: function (cod, callback) {
        connection.query('DELETE FROM `agentes` WHERE cod = ?', [cod], function (error, results) {
            if (error) throw error;
            
            callback(results.affectedRows);
        });
    }
}

module.exports = moviesService;