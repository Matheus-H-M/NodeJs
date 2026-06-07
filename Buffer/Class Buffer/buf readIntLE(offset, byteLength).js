// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a Buffer containing 4 bytes
// Hex values: FF FE FD FC
const buf = Buffer.from([0xFF, 0xFE, 0xFD, 0xFC]);

// Read a signed integer in Little-Endian format
// Start reading at offset 0
// Read a total of 4 bytes
const valor = buf.readIntLE(0, 4);

// Print the value as a decimal number
console.log('Decimal value:', valor);

// Print the value as a hexadecimal string
console.log('Hexadecimal value:', valor.toString(16));