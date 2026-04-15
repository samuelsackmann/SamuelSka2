
function adicionar(valor){
    let resultado = document.getElementById("resultado")

resultado.value += valor;
}
function limpar(){
    let resultado = document.getElementById("resultado")

resultado.value =""
}
function calcular(){
    let resultado = document.getElementById("resultado")

    resultado.value = eval (resultado.value);
}