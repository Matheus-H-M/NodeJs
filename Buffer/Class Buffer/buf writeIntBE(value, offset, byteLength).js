// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Allocate a new Buffer with 6 bytes
const buf = Buffer.alloc(6);

// Define a 48-bit signed integer value to write into the Buffer
const value = 0x1234567890ab;

// Write the integer to the Buffer in Big-Endian format
// Arguments:
//   value      -> the integer to write
//   0          -> start writing at offset 0
//   6          -> write exactly 6 bytes
// Returns the offset plus the number of bytes written
const bytesWritten = buf.writeIntBE(value, 0, 6);

// Display the number of bytes written
console.log("Bytes written:", bytesWritten);

// Display the raw Buffer contents
console.log("Buffer:", buf);

// Display the Buffer as a hexadecimal string
console.log("Hex:", buf.toString("hex"));

// Read the signed 48-bit integer back from the Buffer
const valueRead = buf.readIntBE(0, 6);

// Display the value that was read in hexadecimal format
console.log("Value read:", "0x" + valueRead.toString(16));