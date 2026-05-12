// Import Buffer from the Node.js buffer module
const { Buffer } = require('node:buffer');

// Create a Buffer with numbers from 0 to 9
const nodeBuffer = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

// Show the Buffer contents
console.log('Buffer:', nodeBuffer);

// Show the byteOffset value
console.log('byteOffset:', nodeBuffer.byteOffset);

// Show the Buffer length
console.log('length:', nodeBuffer.length);

// Access the underlying ArrayBuffer
console.log('Underlying ArrayBuffer:', nodeBuffer.buffer);

// WRONG way:
// This may include unrelated memory outside the Buffer range
const wrongArray = new Int8Array(nodeBuffer.buffer);

console.log('Wrong Int8Array:', wrongArray);

// CORRECT way:
// Use byteOffset and length to map only the Buffer memory region
const correctArray = new Int8Array(
  nodeBuffer.buffer,
  nodeBuffer.byteOffset,
  nodeBuffer.length
);

console.log('Correct Int8Array:', correctArray);

// Modify the typed array
correctArray[0] = 99;

// The Buffer changes too because they share memory
console.log('Updated Buffer:', nodeBuffer);