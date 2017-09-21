var connection = require('../app/conexao.js');

var autentica = {
authenticate:function(req,res){
    //console.log("LOG: "+req.body.login);
    //console.log("KEY: "+req.body.senha);
    var login = req.body.login;
    var senha= req.body.senha;
    var query = connection.query('SELECT * FROM administrador WHERE login = ?',[login], function (error, results, fields) {
        console.log("PPP: "+query.sql);
        if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            if(senha==results[0].senha){
                res.redirect("/home");
                /*res.json({
                    status:true,
                    message:'successfully authenticated'
                })*/
            }else{
                res.redirect("/");
                /*res.json({
                  status:false,
                  message:"Email and password does not match"
                 });*/
            }
         
        }
        else{
            res.redirect("/");
          /*res.json({
              status:false,    
            message:"Email does not exits"
          });*/
        }
      }
    });
}
}
module.exports = autentica;