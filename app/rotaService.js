const connection = require('./conexao.js')

var rotaService = {
    save: function (dados, callback) {
        
        console.log(dados.body);
        var json = dados.body;
    
        var sql = "INSERT INTO rota (nome, codAgente, status, pontosRota) VALUES ('"+json.nome+"','"+json.codAgente+"','"+json.status+"','"+json.pontosRota+"')";
        connection.query(sql,function(err,result){
            if (err) throw err;
            callback(result.affectedRows); 
        });
      
    },

    listarUtimasRotas: function(callback){

        var query = connection.query('select r.cod, a.nome, r.data from rota r join agentes a ON  a.cod = r.codAgente',function (error, results) {
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
    },

    getWorkRouteByAgente: function(dados, callback){
        console.log("DADOS: "+dados);
        var x = parseInt(dados);
      //select r.pontosRota, r.cod from rota r join agentes a ON a.cod = r.codAgente where a.cod = 3 ORDER BY r.cod LIMIT 1;
        var query = connection.query('select r.cod, r.pontosRota from rota r join agentes a ON  a.cod = r.codAgente where a.cod = '+x+' order by r.cod limit 1',[x],function (error, results) {
            console.log(query.sql);
            if(error) throw error;
            //console.log("RESULT^: "+results);
            callback(results)
        });

    },
}
module.exports = rotaService;