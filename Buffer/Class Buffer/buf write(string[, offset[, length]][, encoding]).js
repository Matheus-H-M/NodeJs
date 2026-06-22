// Import the Buffer class from Node.js's built-in buffer module
const { Buffer } = require('node:buffer');

// Create a buffer with a size of 20 bytes, initialized with zeros
const buf = Buffer.alloc(20);

// Write the string "NodeJS" into the buffer starting at byte offset 5
// Using UTF-8 encoding
// The method returns the number of bytes written
const bytesWritten = buf.write('NodeJS', 5, 'utf8');

// Display the number of bytes that were written to the buffer
console.log('Bytes written:', bytesWritten);

// Convert a portion of the buffer back into a string
// Read bytes from index 0 up to (but not including) index 11
console.log('Buffer content:', buf.toString('utf8', 0, 11));

// Display the raw buffer contents in hexadecimal format
console.log(buf);