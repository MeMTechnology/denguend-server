"use strict"

const agenteService = require('../app/agenteService.js');

var agentesController = {
    cadastrar: function (dados, response) {
        agenteService.save(dados, function callback (id) {
            if(id) {
                response.redirect("/success");
            } else {
                response.redirect("/failed");
            }
        });
    },
    filtrar: function (nome, response) {
        agenteService.filter(nome, function callback (results) {
            if(results){
                response.status(200).send(results);
            }else{
                response.sendStatus(404);
            }
        })
    },
    deletar: function (cod, response){
        agenteService.delete(cod, function  callback (cod) {
            if(cod){
                response.redirect("/success");
            }else{
                response.redirect("/failed");
            }
        });
    }
};

module.exports = agentesController;