// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Allocate a new Buffer with 8 bytes of memory
const buf = Buffer.alloc(8);

// Define a 64-bit unsigned integer using BigInt
// The "n" suffix indicates that this is a BigInt value
const value = 0xDECACAFECAFEBABEn;

// Write the BigInt value into the buffer using
// Little-Endian byte order (least significant byte first)
// Returns the number of bytes written (8)
const bytesWritten = buf.writeBigUInt64LE(value);

// Display the number of bytes written to the buffer
console.log('Bytes written:', bytesWritten);

// Display the raw Buffer object
console.log('Buffer:', buf);

// Display the buffer contents as a hexadecimal string
console.log('Hex:', buf.toString('hex'));

// Read the 64-bit unsigned integer back from the buffer
// using Little-Endian byte order
const valueRead = buf.readBigUInt64LE();

// Display the original value in hexadecimal format
console.log('Original value:', value.toString(16));

// Display the value read from the buffer in hexadecimal format
console.log('Read value:', valueRead.toString(16));

// Verify that the original value and the value read
// from the buffer are exactly the same
console.log('Values are equal?', value === valueRead);