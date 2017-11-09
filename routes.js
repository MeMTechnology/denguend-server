const dir = __dirname + '/public/';
const agentesController = require('./controller/agentesController.js');
const getAuth = require ('./controller/authenticate-controller.js');
const setRoute = require ('./controller/rotaController.js');

var router = function (app) {

    app.post('/auth0', function (request, response) {
        getAuth.authenticate(request,response);
    });
    app.get('/', function (request, response) {
        response.sendFile('index.html')
    });

    app.get('/home', function(request, response){
        response.sendFile(dir + '/home.html')
    });

    app.get('/cadastroAgente', function(request, response){
        response.sendFile(dir + '/cadastroAgente.html')
    });

    app.get('/getRouteByAgente/:codAgente', function(request, response){
        setRoute.getWorkRouteByAgente(request.params.codAgente, response);
    });

    app.get('/ultimasRotas', function(request, response){
        setRoute.listarUltimasRotas(response);
    });

    app.get('/todasRotas', function(request, response){
        setRoute.listarTodasRotas(response);
    });


    app.get('/getSelectedRoute/:cod', function(request, response){
        setRoute.getRoute(request.params.cod, response);
    });

    app.post('/cadastroRotas', function(request,response){
        response.sendFile(dir + '/cadastroRotas.html');
    })
	
	app.post('/cadastroVisita', function(request, response){
		setRoute.setVisita(request.body, response);
	});

    app.get('/cadastroRotas', function(request, response){
        response.sendFile(dir + '/cadastroRotas.html')
    });

    app.post("/cadastroRotaMapa", function(request, response){
        setRoute.cadastrar(request, response);
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

    app.post("/editar/:cod", function (request, response) {
        let cod = request.params.cod;
        agentesController.editar(request.body,cod, response);
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