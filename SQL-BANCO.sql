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

	CONSTRAINT pk_rota PRIMARY KEY (cod)
)
/*Tabela residência: Inicialmente pensamos em juntar em uma tabela só, residência e formulário
//mas para se obter um bom relatório temos uma residência, q poderá receber 1 ou mais visitas.
//Podemos gerar um relatório por exemplo de quantas visitas já foram realizadas em uma residência.
*/


	/*Tabela visita: irá ter todos os dados referentes a uma visita*/
CREATE TABLE visita(
	/* ID */
	id INTEGER NOT NULL AUTO_INCREMENT,
	/* Identificação do local */
	endereco VARCHAR (60) NOT NULL,
	numero VARCHAR (10) NOT NULL,
	complemento VARCHAR (20),
	rotaId INTEGER NOT NULL,
	pontoLocal VARCHAR (80) NOT NULL,
	
	/*Data da Visita */
	dataPreenchimento DATE NOT NULL,
	
	/*Relativo a visita*/
	nomeDoMorador VARCHAR(50),
	focoDeDengue BOOLEAN,
	descricaoFocos VARCHAR(100),

	/*Visita realizada ou não???*/
	visitaNaoRealizada BOOLEAN NOT NULL,
	motivoImpedimento VARCHAR(50),

	CONSTRAINT pk_visita PRIMARY KEY (id)
);