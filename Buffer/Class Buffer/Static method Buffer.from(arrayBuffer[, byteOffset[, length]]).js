// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a new ArrayBuffer with 8 bytes
const arrayBuffer = new ArrayBuffer(8);

// Create a Uint8Array view over the ArrayBuffer
// This allows us to read/write individual bytes
const uint8 = new Uint8Array(arrayBuffer);

// Fill the array with values from 1 to 8
for (let i = 0; i < uint8.length; i++) {
    uint8[i] = i + 1;
}

// Create a Buffer that shares memory with the ArrayBuffer
// No data is copied here
const bufferCompleto = Buffer.from(arrayBuffer);

console.log('Full buffer:', bufferCompleto);
// Expected: <Buffer 01 02 03 04 05 06 07 08>

// Create a partial Buffer using byteOffset (2) and length (4)
// This will expose bytes [3,4,5,6]
const bufferParcial = Buffer.from(arrayBuffer, 2, 4);

console.log('Partial buffer:', bufferParcial);
// Expected: <Buffer 03 04 05 06>

// Modify the original Uint8Array
// Since memory is shared, Buffers will reflect this change
uint8[3] = 99;

console.log('After modification:');
console.log('Array:', uint8);
console.log('Full buffer:', bufferCompleto);
console.log('Partial buffer:', bufferParcial);