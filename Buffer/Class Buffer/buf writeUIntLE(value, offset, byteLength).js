// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Allocate a new Buffer with 6 bytes, initialized with zeros
const buf = Buffer.alloc(6);

// Define a 48-bit unsigned integer value (6 bytes)
const value = 0x1234567890ab;

// Write the value into the buffer using Little-Endian byte order.
// Arguments:
//   value      -> the unsigned integer to write
//   0          -> starting offset in the buffer
//   6          -> number of bytes to write
// The method returns the next offset after the written bytes.
const nextOffset = buf.writeUIntLE(value, 0, 6);

// Print the raw Buffer object
console.log("Buffer:", buf);

// Print the buffer as a hexadecimal string
console.log("Hex:", buf.toString("hex"));

// Print the returned offset
console.log("Next offset:", nextOffset);

// Print each individual byte stored in the buffer
console.log("\nIndividual bytes:");

// Loop through every byte in the buffer
for (let i = 0; i < buf.length; i++) {
    // Display each byte in hexadecimal format
    console.log(`Byte ${i}: 0x${buf[i].toString(16).padStart(2, '0')}`);
}