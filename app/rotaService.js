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

    listarPorTipo: function(req, callback){
        var json = JSON.parse(req);
        var dados = json.id;

        /*var textoVisita = 'select v.id, v.endereco, v.numero, v.complemento, a.nome AS nomeAgente,'+
        ' v.dataPreenchimento, v.focoDeDengue, v.visitaNaoRealizada from visita v'+
        ' join rota i ON v.rotaId = i.cod join agentes a ON a.cod = i.cod';*/

        var textoVisita = 'select v.id, v.endereco, v.numero, v.complemento, v.dataPreenchimento, v.focoDeDengue, v.visitaNaoRealizada,v.descricaoFocos, v.motivoImpedimento, result.agente from visita v join'+
        '(select a.cod as agenteCod, a.nome as agente, r.cod as rota from agentes a join rota r ON a.cod = r.codAgente) as result ON v.rotaId = result.rota'
        
        //console.log("CHEGA:"+req);
        var sql;
        switch (dados){
            case "all":
                sql = 'select r.cod, r.nome, a.nome as nomeAgente, r.status, r.data  from rota r join agentes a ON a.cod = r.codAgente';
            break;

            case "abertas":
                sql = 'select r.cod, r.nome, a.nome as nomeAgente, r.status, r.data  from rota r join agentes a ON a.cod = r.codAgente where r.status = 0';
            break;

            case "concluidas":
                sql = 'select r.cod, r.nome, a.nome as nomeAgente, r.status, r.data  from rota r join agentes a ON a.cod = r.codAgente where r.status = 1';
            break;

            case "allVisita":
                sql = textoVisita;
            break;

            case "allVisitaFoco":
                sql = textoVisita+ ' where v.focoDeDengue = 1';
            break;

            case "visitaIncompleta":
                sql = textoVisita + ' where v.visitaNaoRealizada = 1';
            break;

            case "visitaCompleta":
                sql = textoVisita+ ' where v.visitaNaoRealizada = 0';
            break;

            case "visitaPorAgente":
            sql = textoVisita+'  where result.agenteCod = '+json.par;
        break;
        };

        connection.query(sql,function(error,results){
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
        var query = connection.query('select r.cod,r.status, r.pontosRota from rota r join agentes a ON  a.cod = r.codAgente where a.cod = '+x+' order by r.cod desc limit 1',[x],function (error, results) {
            console.log(query.sql);
            if(error) throw error;
            //console.log("RESULT^: "+results);
            callback(results)
        });

    },
}
module.exports = rotaService;