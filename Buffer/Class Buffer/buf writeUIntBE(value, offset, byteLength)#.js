// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Allocate a buffer with 8 bytes, initialized to 0
const buf = Buffer.alloc(8);

// Define an unsigned integer value to write into the buffer
const value = 0x123456;

// Write the value using Big-Endian byte order
// - value: the unsigned integer to write
// - offset: start writing at byte index 2
// - byteLength: write exactly 3 bytes
// The method returns the next available offset (offset + byteLength)
const nextOffset = buf.writeUintBE(value, 2, 3);

// Display the raw buffer contents
console.log("Buffer:", buf);

// Display the buffer as a hexadecimal string
console.log("Hex:", buf.toString("hex"));

// Display the offset returned by writeUintBE()
console.log("Next offset:", nextOffset);

// Read back the 3-byte unsigned integer from offset 2
const readValue = buf.readUIntBE(2, 3);

// Display the value in hexadecimal to verify it matches the original
console.log("Read value:", "0x" + readValue.toString(16));