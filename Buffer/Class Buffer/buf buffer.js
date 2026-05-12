// Import the Buffer class from the Node.js buffer module
const { Buffer } = require('node:buffer');

// Create a new ArrayBuffer with 8 bytes of memory
const arrayBuffer = new ArrayBuffer(8);

// Create a Buffer using the ArrayBuffer
const buffer = Buffer.from(arrayBuffer);

// Write ASCII values into the Buffer
buffer[0] = 65; // ASCII for 'A'
buffer[1] = 66; // ASCII for 'B'
buffer[2] = 67; // ASCII for 'C'

// Display the raw Buffer contents
console.log('Buffer content:', buffer);

// Convert the first 3 bytes into a UTF-8 string
console.log('As text:', buffer.toString('utf8', 0, 3));

// Check if the Buffer uses the same underlying ArrayBuffer
console.log('Same ArrayBuffer?', buffer.buffer === arrayBuffer);

// Create a Uint8Array view using the Buffer's ArrayBuffer
const uint8 = new Uint8Array(buffer.buffer);

// Display the Uint8Array values
console.log('Uint8Array:', uint8);

// Modify the first byte using Uint8Array
uint8[0] = 90; // ASCII for 'Z'

// Show the updated Buffer content as text
console.log(
  'Buffer after ArrayBuffer modification:',
  buffer.toString('utf8', 0, 3)
);