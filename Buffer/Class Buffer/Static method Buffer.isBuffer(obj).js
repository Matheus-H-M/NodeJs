// Import the Buffer module from Node.js
const { Buffer } = require('node:buffer');

// Create a Buffer with 8 empty bytes
const buffer1 = Buffer.alloc(8);

// Create a Buffer from a string
const buffer2 = Buffer.from('Olá Node.js');

// Create a normal string
const texto = `Isto é uma string`;

// Create a JavaScript array
const array = [1, 2, 3];

// Create a Uint8Array with 16 positions
const uint8 = new Uint8Array(16);

// Function to check if a value is a Buffer
function verificarBuffer(valor, nome){

    // Display the variable name and the result
    console.log(`${nome}:`, Buffer.isBuffer(valor));
}

// Check if buffer1 is a Buffer
verificarBuffer(buffer1, 'buffer1');

// Check if buffer2 is a Buffer
verificarBuffer(buffer2, 'buffer2');

// Check if texto is a Buffer
verificarBuffer(texto, 'texto');

// Check if array is a Buffer
verificarBuffer(array, 'array');

// Check if uint8 is a Buffer
verificarBuffer(uint8, 'uint8');