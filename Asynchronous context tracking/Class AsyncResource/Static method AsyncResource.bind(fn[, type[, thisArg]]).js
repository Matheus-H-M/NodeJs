const { AsyncResource } = require('async_hooks');

function minhaFuncao(){
    console.log("Executando dentro do contexto async!");
}

const funcaoBindada = AsyncResource.bind(minhaFuncao, "MeuTipoAsync");

setTimeout(() => {
    funcaoBindada();
}, 1000);