var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var pontos= [];
var marker;
var request;
var caminhoPontos;

function initialize(pLocX, pLocY) {	
	directionsDisplay = new google.maps.DirectionsRenderer();
	var latlng = new google.maps.LatLng(pLocX, pLocY);
	
    var options = {
        zoom: 16,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		
	};

	
	map = new google.maps.Map(document.getElementById("mapa"), options);

	//***************Adicionar Marcadores */
	google.maps.event.addListener(map, 'click', function(event) {
		placeMarker(event.latLng);
	 });
	 
	 function placeMarker(location) {
		 marker = new google.maps.Marker({
			 position: location, 
			 map: map
		 });
		 pontos.push(marker);//guardo a posição do marcador no array.
	 }
	 //************************** */
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("trajeto-texto"));
	//$("#txtEnderecoPartida").val("R. Cap Antônio Carlos, 196, Gonçalves - MG, 37680-000, Brasil");
	//Acho que vou precisar desse código abaixo para implementar o envio do formulário na posição do GPS
	/*
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {

			pontoPadrao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(pontoPadrao);
			
			var geocoder = new google.maps.Geocoder();
			
			geocoder.geocode({
				"location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					//var json = JSON.stringify(results[0]);
					//console.log("vamo ver" +json);
					$("#txtEnderecoPartida").val(results[0].formatted_address);
				}
            });
		});
	}*/
}

initialize(-22.65918, -45.8532757847999);

function localizar(){
	var geocoder = new google.maps.Geocoder();
	var address = $('#localizarInicio').val();
	
	geocoder.geocode( { 'address': address}, function(results, status) {
	
	if (status == google.maps.GeocoderStatus.OK) {
		var latitude = results[0].geometry.location.lat();
		var longitude = results[0].geometry.location.lng();
		//jQuery('#coordinates').val(latitude+', '+longitude);
		//console.log("Lat: "+latitude+" LON: "+longitude);
		initialize(latitude, longitude);
		} 
	}); 

}

function pegaTodosPontos(){//desmembra o objeto pontos em um objeto menor só com as coordenadas.
	//Se dermos um console log em pontos, como abaixo, veremos os membros do objeto.
	//console.log(pontos[1]);
	var retornaString = "[";
	for(var i = 0; i < pontos.length; i++){

		retornaString += '{"location":{"lat":'+pontos[i].position.lat(0)+',"lng":'+pontos[i].position.lng(0)+ '}}'; 
		if (i + 1 < pontos.length)
			retornaString += ",";
	}
	retornaString += "]";
	
	return retornaString;
}

function pontosInter(x){
	var intermediarios = [];
	for(var i = 1; i<x.length - 1; i++){
		intermediarios.push(x[i]);
	}
	//console.log(JSON.stringify(intermediarios));
	//return (JSON.stringify(intermediarios));
	return intermediarios;
}

//$("form").submit(function(event) {
	//event.preventDefault();
	function geraRota(){
	
	caminhoPontos = pegaTodosPontos();//pontos intermediarios
	console.log(caminhoPontos);
	var myTest = JSON.parse(caminhoPontos);
	
	var enderecoPartida = myTest[0].location;
	var enderecoChegada = myTest[myTest.length - 1].location;
	
	//console.log(pontosInter(myTest));
	request = {
		origin: enderecoPartida,
		destination: enderecoChegada,
		//waypoints: [{location: pontos[1]}, {location: pontos[2]}],
		waypoints: pontosInter(myTest),
		travelMode: google.maps.TravelMode.DRIVING
	};
	
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
	});

	cleanMarcadores();//Testando...
}

function cleanMarcadores(){
	for (var i = 0; i < pontos.length; i++) {
		pontos[i].setMap(null);
	  }
	pontos = [];
//directionsDisplay.setDirections(null);
//console.log(request.waypoints[0]);
}

function enviarDados(){
	cadastro.cadastrarRota(caminhoPontos);
}

//
//https://developers.google.com/maps/documentation/javascript/examples/marker-remove?hl=pt-br

