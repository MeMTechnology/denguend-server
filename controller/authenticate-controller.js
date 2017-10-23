var connection = require('../app/conexao.js');

var autentica = {

authenticate:function(req,res){
    
    var login = req.body.login;
    var senha= req.body.senha;
    var query = connection.query('SELECT * FROM administrador WHERE login = ?',[login], function (error, results, fields) {
        console.log("PPP: " + query.sql);
        if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            if(senha==results[0].senha){
                res.redirect("/home");
            }else{
                res.redirect("/");
            }
         
        }
        else{
            res.redirect("/");
        }
      }
    });
}
}
module.exports = autentica;