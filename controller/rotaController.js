"use strict"

const rotaService = require('../app/rotaService.js');
const visitaService = require('../app/visitaService.js');

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
    },

    getWorkRouteByAgente: function(dados,response){
        rotaService.getWorkRouteByAgente(dados, function callback (results){
            if(results){
                response.status(200).send(results);
            }else{
                response.sendStatus(404);
            }
        });
    },
	
	setVisita: function(dados, response){
		//console.log("Chega os dados***: "+JSON.stringify(dados));
		visitaService.cadastrarVisita(dados, function callback (results){
			if(results){
				response.status(200).send(results);
			}
			else{
				response.setStatus(404);
			}
		});
		
	}
};

module.exports = rotaController;