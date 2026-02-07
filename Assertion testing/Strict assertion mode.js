// Import the Node.js assert module in strict mode
const assert = require('node:assert/strict');

// Function that returns the sum of two numbers
function soma(a, b){
    return a + b;
}

// Assertion that checks if the result of soma(2, 2) is equal to 5
// This test will FAIL because 2 + 2 equals 4
assert.equal(soma(2, 2), 5);

// Object representing the current (actual) data
const objetoAtual = {
    nome: 'joão',
    idade: 30,
    habilidades: ['js', 'Node']
};

// Object representing the expected data
const objetoEsperado = {
    nome: 'joão',
    idade: 30,
    habilidades: ['JS', 'Node']
};

// Deep comparison between two objects
// This will FAIL because 'js' is not strictly equal to 'JS'
assert.deepEqual(objetoAtual, objetoEsperado);

// Deep comparison of nested arrays
// This will FAIL because number 3 is not strictly equal to string "3"
assert.deepEqual(
    [[[1, 2, 3]], 4, 5],
    [[[1, 2, "3"]], 4, 5]
);

// This message will only be printed if all assertions pass
console.log("Todos os testes passaram!");
