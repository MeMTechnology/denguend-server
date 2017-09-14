const dir = __dirname + '/public/';
const agentesController = require('./controller/agentesController.js');

var router = function (app) {
    app.get('/', function (request, response) {
        response.sendFile('index.html')
    });

    app.get('/home', function(request, response){
        response.sendFile(dir + '/home.html')
    });

    app.get('/cadastroAgente', function(request, response){
        response.sendFile(dir + '/cadastroAgente.html')
    });

    app.get('/cadastroRotas', function(request, response){
        response.sendFile(dir + '/cadastroRotas.html')
    });

    app.get('/relatorios', function(request, response){
        response.sendFile(dir + '/relatorios.html')
    });

    app.get('/usuarios/', function(request, response){
        agentesController.encontrarTodos(response);
    });

    app.get('/relatorios/:nome', function(request, response){
        let nome = request.params.nome;
        agentesController.filtrar(nome, response);
    });

    app.post("/cadastrar", function (request, response) {
        agentesController.cadastrar(request.body, response);
     });

    app.post("/editar", function (request, response) {
        agentesController.editar(request, response);
     });

     app.get("/success", function(request, response) {
        response.sendFile(dir + "/home.html");
    });

    app.get("/failed", function(request, response) {
        response.sendFile(dir + "/failed.html");
    });
    
    app.get("/deletar/:cod", function (request, response){
        let cod = request.params.cod;
        agentesController.deletar(cod, response);
    });

    app.get('/filtrarModal/:cod', function(request, response){
        let cod = request.params.cod;
        agentesController.filtrarModal(cod, response);
    });

    app.get("/")

}

module.exports = router