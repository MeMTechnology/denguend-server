const connection = require('./conexao.js')

var rotaService = {
    save: function (dados, callback) {
        
        console.log(dados.body);
        var json = dados.body;
    
        var sql = "INSERT INTO rota (nome, codAgente, status, pontosRota) VALUES ('"+json.nome+"','"+json.codAgente+"','"+json.status+"','"+json.pontosRota+"')";
        //console.log("TEST:  "+sql);
        connection.query(sql,function(err,result){
            //console.log(query.sql);
            if (err) throw err;
            callback(result.affectedRows); 
        });
      
    },

    listarUtimasRotas: function(callback){
        //select r.cod, a.nome from rota r join agentes a ON  a.cod = r.codAgente;
        var query = connection.query('select r.cod, a.nome, r.data from rota r join agentes a ON  a.cod = r.codAgente',function (error, results) {
        //var query = connection.query('SELECT * FROM rota ORDER BY cod',function (error, results) {
            //console.log(query.sql);
            if(error) throw error;
          
            callback(results)
        });

    },

    getRoute:function(dados, callback){
        console.log("rdasr:"+dados);
        connection.query('SELECT * FROM rota WHERE cod = ?' , [dados], function (error, results) {
            if (error) throw error;
            
            callback(results);
        });
    }
}
module.exports = rotaService;