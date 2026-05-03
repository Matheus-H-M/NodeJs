// Import the Buffer class from the Node.js buffer module
const { Buffer } = require('node:buffer');

// Define an array of byte values (ASCII codes for "Hello")
const bytes = [72, 101, 108, 108, 111];

// Create a Buffer from the array of bytes
const buf = Buffer.from(bytes);

// Log the raw buffer (hex representation)
console.log(buf); // <Buffer 48 65 6c 6c 6f>

// Convert the buffer to a UTF-8 string and print it
console.log(buf.toString()); // Hello

// Define an array with invalid byte values (outside 0–255 range)
const invalidBytes = [300, -10, 256];

// Create a Buffer from the invalid values
// Values will be truncated to fit into the 0–255 range
const buf2 = Buffer.from(invalidBytes);

// Log the resulting buffer after truncation
console.log(buf2); // <Buffer 2c f6 00>