// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Allocate a new Buffer with a size of 4 bytes
const buf = Buffer.alloc(4);

// Write unsigned 8-bit integer values into the Buffer
// The second argument specifies the byte offset
buf.writeUInt8(10, 0);   // Write 10 at byte position 0
buf.writeUInt8(20, 1);   // Write 20 at byte position 1
buf.writeUInt8(30, 2);   // Write 30 at byte position 2
buf.writeUInt8(255, 3);  // Write 255 (maximum UInt8 value) at byte position 3

// Print the Buffer in hexadecimal format
console.log(buf);

// Read and print each unsigned 8-bit integer from the Buffer
console.log(buf.readUInt8(0)); // Reads the value at byte position 0
console.log(buf.readUInt8(1)); // Reads the value at byte position 1
console.log(buf.readUInt8(2)); // Reads the value at byte position 2
console.log(buf.readUInt8(3)); // Reads the value at byte position 3

// Convert the Buffer into a regular array of bytes and print it
console.log([...buf]);