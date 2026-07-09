// Import the Buffer class from the built-in Node.js 'buffer' module.
const { Buffer } = require('node:buffer');

// Allocate a buffer with 6 bytes of memory.
// Each unsigned 16-bit integer (UInt16) uses 2 bytes,
// so this buffer can store exactly three UInt16 values.
const buf = Buffer.alloc(6);

// Write the unsigned 16-bit integer 1000 at byte offset 0.
// Big-endian (BE) stores the most significant byte first.
buf.writeUInt16BE(1000, 0);

// Write the unsigned 16-bit integer 50000 at byte offset 2.
buf.writeUInt16BE(50000, 2);

// Write the maximum possible unsigned 16-bit integer (65535)
// at byte offset 4.
buf.writeUInt16BE(65535, 4);

// Display the raw Buffer object.
console.log("Buffer:", buf);

// Display the buffer contents as a hexadecimal string.
console.log("Hex:", buf.toString("hex"));

// Read the first UInt16 value from byte offset 0.
console.log("Value 1:", buf.readUInt16BE(0));

// Read the second UInt16 value from byte offset 2.
console.log("Value 2:", buf.readUInt16BE(2));

// Read the third UInt16 value from byte offset 4.
console.log("Value 3:", buf.readUInt16BE(4));