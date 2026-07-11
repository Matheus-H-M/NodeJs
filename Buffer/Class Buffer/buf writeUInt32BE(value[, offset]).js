// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Allocate a buffer with 8 bytes of memory
const buf = Buffer.alloc(8);

// Write the unsigned 32-bit integer 305419896 (0x12345678)
// starting at byte offset 0 using Little-Endian byte order
buf.writeUInt32LE(305419896, 0);

// Write the unsigned 32-bit integer 4277009102 (0xFEEDFACE)
// starting at byte offset 4 using Little-Endian byte order
buf.writeUInt32LE(4277009102, 4);

// Display the raw Buffer object
console.log("Buffer:", buf);

// Display the contents of the buffer as a hexadecimal string
console.log("Hex:", buf.toString("hex"));

// Read the first 4 bytes as an unsigned 32-bit integer
// using Big-Endian byte order
const value1 = buf.readUInt32BE(0);

// Read the last 4 bytes as an unsigned 32-bit integer
// using Big-Endian byte order
const value2 = buf.readUInt32BE(4);

// Print the values that were read from the buffer
console.log("Value 1:", value1);
console.log("Value 2:", value2);