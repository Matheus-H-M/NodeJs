// Import the Buffer class from the Node.js buffer module
const { Buffer } = require('node:buffer');

// Allocate a buffer with 8 bytes of memory
const buf = Buffer.alloc(8);

// Write the unsigned 32-bit integer 1234567890
// starting at byte offset 0 using Little-Endian byte order
buf.writeUInt32LE(1234567890, 0);

// Write the hexadecimal unsigned 32-bit integer 0xFEEDFACE
// starting at byte offset 4 using Little-Endian byte order
buf.writeUInt32LE(0xFEEDFACE, 4);

// Display the raw Buffer contents
console.log("Buffer:", buf);

// Display the Buffer as a hexadecimal string
console.log("Hex:", buf.toString("hex"));

// Read the first unsigned 32-bit integer from offset 0
const number1 = buf.readUInt32LE(0);

// Read the second unsigned 32-bit integer from offset 4
const number2 = buf.readUInt32LE(4);

// Display the first number in decimal format
console.log("Number 1:", number1);

// Display the second number in hexadecimal format
console.log("Number 2 (Hex):", "0x" + number2.toString(16).toUpperCase());