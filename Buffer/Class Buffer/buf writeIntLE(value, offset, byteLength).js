// Import the Buffer class from the built-in Node.js buffer module.
const { Buffer } = require("node:buffer");

// Allocate a new Buffer with a size of 12 bytes.
// All bytes are initialized to 0.
const buf = Buffer.alloc(12);

// Keep track of the current write position inside the Buffer.
let offset = 0;

// Write the signed integer -300 using 2 bytes in little-endian format.
// The method returns the next available offset (0 + 2 = 2).
offset = buf.writeIntLE(-300, offset, 2);

// Write the value 0x1234567890AB using only 4 bytes.
// Since the value is larger than 4 bytes, only the lowest 4 bytes are stored.
// The offset moves from 2 to 6.
offset = buf.writeIntLE(0x1234567890AB, offset, 4);

// Write the same value again, this time using the full 6 bytes.
// This preserves the complete 48-bit integer.
// The offset moves from 6 to 12.
offset = buf.writeIntLE(0x1234567890AB, offset, 6);

// Display the raw Buffer object.
console.log("Buffer:", buf);

// Display the Buffer contents as a hexadecimal string.
console.log("Hex:", buf.toString("hex"));

// Read the first 2 bytes as a signed little-endian integer.
console.log("2 bytes :", buf.readIntLE(0, 2));

// Read the next 4 bytes as a signed little-endian integer.
console.log("4 bytes :", buf.readIntLE(2, 4));

// Read the last 6 bytes as a signed little-endian integer.
console.log("6 bytes :", buf.readIntLE(6, 6));