(function (){

$("#form-cadastro").on("submit", event =>{

    var dados = $("#form-cadastro").serialize();
    var cpf = $("#cpf").val();
    
    if(validaCPF(cpf)){

        $.ajax({
            method: "GET",
            url: "/relatorios/" + cpf
        }).done(agentes =>{
            if(agentes.length === 0) {
                cadastrarAgente(dados);
            }else{
                alert("CPF já cadastrado!!");
            }
        });
    }
    else{
        alert("CPF Inválido!");
    }
});

function cadastrarAgente(dados){
    
    $.ajax({
        url: "/cadastrar",
        type: "post",
        dataType: "json",
        async: true,
        data: dados
    })
};

function validaCPF(textCpf){
    
    let cpf = textCpf;
    
    let digitoVerificadorUm;
    let digitoVerificadorDois;
    
    let x = parseInt(cpf.charAt(0));
    let numEquals = true;

    for(var i = 1; i<14; i++){
        if(i==3 || i==7 || i==11)continue;//PULO OS PONTOS E O TRAÇO.(XXX.XXX.XXX-XX)
        
        if(x != parseInt(cpf.charAt(i))){
            numEquals = false;
            break;
        }
    }
    
    if(numEquals == true){
        console.log("Numeros iguais");
        return false;
    }
    
    digitoVerificadorUm = parseInt(cpf.charAt(0)) + 2 * parseInt(cpf.charAt(1)) + 3 * parseInt(cpf.charAt(2));
    digitoVerificadorUm += 4 * parseInt(cpf.charAt(4)) +  5 * parseInt(cpf.charAt(5)) + 6 * parseInt(cpf.charAt(6));
    digitoVerificadorUm += 7 * parseInt(cpf.charAt(8)) + 8 * parseInt(cpf.charAt(9)) + 9 * parseInt(cpf.charAt(10));
    
    digitoVerificadorUm = digitoVerificadorUm % 11;
    digitoVerificadorUm = digitoVerificadorUm % 10;
    
    digitoVerificadorDois = parseInt(cpf.charAt(1)) + 2 * parseInt(cpf.charAt(2)) + 3 * parseInt(cpf.charAt(4));
    digitoVerificadorDois += 4 * parseInt(cpf.charAt(5)) + 5 * parseInt(cpf.charAt(6)) + 6 * parseInt(cpf.charAt(8));
    digitoVerificadorDois += 7 * parseInt(cpf.charAt(9)) + 8 * parseInt(cpf.charAt(10)) + 9 * digitoVerificadorUm;
    digitoVerificadorDois = digitoVerificadorDois % 11;
    digitoVerificadorDois = digitoVerificadorDois % 10;
    
    if(digitoVerificadorUm == parseInt(cpf.charAt(12)) && digitoVerificadorDois == parseInt(cpf.charAt(13)))
        return true;
    
    else
        return false;

};
    
})()