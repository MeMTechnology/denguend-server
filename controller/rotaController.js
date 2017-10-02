"use strict"

const rotaService = require('../app/rotaService.js');

var rotaController = {
    cadastrar: function (dados, response) {
        rotaService.save(dados, function callback (results) {
            if(results) {
              response.redirect("/success");
            } else {
              response.redirect("/failed");
            }
        });
    },

    listarUltimasRotas: function(response){
        rotaService.listarUtimasRotas(function callback (results){
            if(results){
                response.status(200).send(results);
            }else{
                response.sendStatus(404);
            }
        });
    },

    getRoute: function(dados,response){
        rotaService.getRoute(dados, function callback (results){
            if(results){
                response.status(200).send(results);
            }else{
                response.sendStatus(404);
            }
        });
    }
};

module.exports = rotaController;