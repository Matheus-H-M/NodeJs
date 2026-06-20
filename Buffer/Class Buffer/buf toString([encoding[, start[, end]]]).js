// Import the Buffer class from Node.js's built-in buffer module
const { Buffer } = require('node:buffer');

// Create a Buffer containing the UTF-8 encoded text "Olá, Node.js!"
const buf = Buffer.from('Olá, Node.js!');

// Convert the entire Buffer to a UTF-8 string
// UTF-8 is the default encoding when none is specified
console.log(buf.toString());

// Convert only a portion of the Buffer to a string
// Starts at byte offset 0 and stops before byte offset 3
// Note: The encoding should be 'utf8', not 'utf'
console.log(buf.toString('utf8', 0, 3));

// Convert the Buffer contents to a hexadecimal string representation
// Each byte is represented by two hexadecimal characters
console.log(buf.toString('hex'));