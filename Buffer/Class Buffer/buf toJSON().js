// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a Buffer from a UTF-8 string
const buf = Buffer.from('Olá Node.js!', 'utf8');

// Convert the Buffer into a JSON-compatible object
const jsonObj = buf.toJSON();

// Display the JSON representation of the Buffer
console.log('JSON Object:');
console.log(jsonObj);

/*
Expected output:

{
  type: 'Buffer',
  data: [79, 108, 195, 161, 32, 78, 111, 100, 101, 46, 106, 115, 33]
}
*/

// Reconstruct a Buffer from the JSON object
const newBuffer = Buffer.from(jsonObj);

// Display the reconstructed Buffer
console.log('\nReconstructed Buffer:');
console.log(newBuffer);

// Convert the reconstructed Buffer back to a UTF-8 string
console.log('\nOriginal Text:');
console.log(newBuffer.toString('utf8'));