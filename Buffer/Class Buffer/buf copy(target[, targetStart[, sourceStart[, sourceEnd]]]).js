// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a source buffer containing the text "Olá Mundo"
const origem = Buffer.from('Olá Mundo');

// Create a destination buffer with 20 bytes filled with "-"
const destino = Buffer.alloc(20, '-');

// Display the destination buffer before copying
console.log('Before copy:');
console.log(destino.toString());

// Copy part of the source buffer into the destination buffer
// Parameters:
// destino     -> target buffer
// 5            -> position in target buffer to start writing
// 4            -> start position in source buffer
// 9            -> end position in source buffer (not included)
//
// This copies the word "Mundo"
const bytesCopiados = origem.copy(destino, 5, 4, 9);

// Display the number of bytes copied
console.log('\nCopied bytes:', bytesCopiados);

// Display the destination buffer after copying
console.log('\nAfter copy:');
console.log(destino.toString());