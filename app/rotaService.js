const connection = require('./conexao.js')

var rotaService = {
    save: function (dados, callback) {
        
        console.log(dados.body);
        var json = dados.body;

        var teste = 0;
        rotaService.encerraRota(json,function callback (results){
            if(!results){
                throw error;
            }
        });
       
        var sql = "INSERT INTO rota (nome, codAgente, status, pontosRota) VALUES ('"+json.nome+"','"+json.codAgente+"','"+json.status+"','"+json.pontosRota+"')";
            connection.query(sql,function(err,result){
                if (err) throw err;
                callback(result.affectedRows); 
            });
      
         
      
    },

    encerraRota: function(dados, callback){
        //Função interna que seta o status como 1 ou seja acabado antes de inserir a nova rota.
        //Além de inserir a data de hoje como sendo a data de encerramento da rota. Ou seja. A rota encerra quando adiciono outra
        var mData = new Date();
        var hoje = mData.toISOString().substring(0, 10);
        
        var sql = "UPDATE rota SET status = true, data = '"+hoje+"'where codAgente = "+dados.codAgente+" order by cod desc limit 1";

        connection.query(sql, function (error, results){   
            if(error) throw error;
            callback(results)
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
        var query = connection.query('select r.cod, r.pontosRota from rota r join agentes a ON  a.cod = r.codAgente where a.cod = '+x+' order by r.cod desc limit 1',[x],function (error, results) {
            console.log(query.sql);
            if(error) throw error;
            //console.log("RESULT^: "+results);
            callback(results)
        });

    },
}
module.exports = rotaService;