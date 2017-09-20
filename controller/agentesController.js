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
    editar: function (dados, cod, response) {
        agenteService.edit(dados, cod, function callback (id) {
            if(id) {
                response.redirect("/success");
            } else {
                response.redirect("/failed");
            }
        });
    },
    encontrarTodos: function (response) {
        agenteService.findAll(function callback (results) {
            if(results){
                response.status(200).send(results);
            }else{
                response.sendStatus(404);
            }
        })
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
                response.redirect("/relatorios");
            }else{
                response.redirect("/failed");
            }
        });
    },
    filtrarModal: function (cod, response){
        agenteService.filterModal(cod, function  callback (results) {
            if(results){
                response.status(200).send(results);
            }else{
                console.log("teste")
            }
        });
    },
};

module.exports = agentesController;