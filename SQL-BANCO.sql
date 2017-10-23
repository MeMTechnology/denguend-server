CREATE TABLE agentes(

	cod INTEGER NOT  NULL AUTO_INCREMENT,
	
	nome VARCHAR(100) NOT NULL,
	sexo VARCHAR(30) NOT NULL,
	cpf VARCHAR(30) NOT NULL,
    cel VARCHAR(30) NOT NULL,
    senha VARCHAR(30) NOT NULL,

	CONSTRAINT pk_agentes PRIMARY KEY (cod)
);

CREATE TABLE administrador(
	login VARCHAR(30) NOT NULL,
	senha VARCHAR(30) NOT NULL,

	CONSTRAINT pk_administrador PRIMARY KEY (login)
);

//Tabela Rota: status: se já foi ou não executada. PontosRota: são os pontos que compõe a rota.
//pode ter 2 ou mais pontos, em forma de JSON. (Acredito q tamanho 1000 caberá uns 8 pontos. )
//Acho q nem vamos usar tudo isso, o máximo é uns 3 ou 4 só.
//data da execução.
CREATE TABLE rota(
	cod INTEGER NOT NULL AUTO_INCREMENT,
	nome VARCHAR (50) NOT NULL, /*Facilita para buscar e reutilizar futuramente a mesma rota.*/
	codAgente INTEGER,
	status BOOLEAN NOT NULL,
	pontosRota VARCHAR(1000) NOT NULL,
	data DATE,

	CONSTRAINT pk_rota PRIMARY KEY (cod),
)
/*Tabela residência: Inicialmente pensamos em juntar em uma tabela só, residência e formulário
//mas para se obter um bom relatório temos uma residência, q poderá receber 1 ou mais visitas.
//Podemos gerar um relatório por exemplo de quantas visitas já foram realizadas em uma residência.
*/
CREATE TABLE residencia(
	id INTEGER NOT NULL AUTO_INCREMENT,
	endereco VARCHAR(200) NOT NULL,
	coordenada VARCHAR (100),
	responsavelCasa VARCHAR(50),
	
	CONSTRAINT pk_residencia PRIMARY KEY (id)
)

	/*Tabela visita: irá ter todos os dados referentes a uma visita*/
CREATE TABLE visita(
	/*Idenficação Geral*/
	id INTEGER NOT NULL AUTO_INCREMENT,
	dataPreenchimento date,
	codRota INTEGER NOT NULL, /*FK DE ROTA*/
	idResidencia INTEGER NOT NULL, /*FK DE residência*/

	/*Visita realizada ou não???*/
	visitaRealizada BOOLEAN NOT NULL,
	motivoImpedimento VARCHAR(50),

	/*Dados obtidos durante a visita*/
	nomeMorador VARCHAR(50),
	dengue BOOLEAN,/* Se tiver foco será true*/
	observacoes VARCHAR(200),/*Considerações sobre a visita*/

	CONSTRAINT pk_visita PRIMARY KEY (id),
)