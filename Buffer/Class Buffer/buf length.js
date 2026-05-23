// Import the Buffer module from Node.js
const { Buffer } = require('node:buffer');

// Create a buffer with 1234 bytes allocated
const buf = Buffer.alloc(1234);

// Print the initial size of the buffer
console.log('Initial buffer size:', buf.length);

// Write a string into the buffer using UTF-8 encoding
buf.write('Buffer size after writing:', 0, 'utf8');

// Print the buffer content as a UTF-8 string
console.log(buf.toString('utf8', 0, 28));