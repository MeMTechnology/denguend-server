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
    }
};

module.exports = rotaController;