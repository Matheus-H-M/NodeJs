// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Allocate a buffer with 8 bytes of memory.
// Each float occupies 4 bytes, so this buffer can store two floats.
const buf = Buffer.alloc(8);

// Define two floating-point values.
const temperature = 36.5;
const speed = 123.75;

// Write the first float to the buffer starting at byte offset 0.
// The value is stored using Little-Endian byte order.
buf.writeFloatLE(temperature, 0);

// Write the second float to the buffer starting at byte offset 4.
// This begins immediately after the first float.
buf.writeFloatLE(speed, 4);

// Display the raw buffer contents.
console.log('Buffer:', buf);

// Display the buffer as a hexadecimal string.
console.log('Hex:', buf.toString('hex'));

// Read the first float back from the buffer.
const readTemperature = buf.readFloatLE(0);

// Read the second float back from the buffer.
const readSpeed = buf.readFloatLE(4);

// Print the values that were read from the buffer.
console.log('Temperature:', readTemperature);
console.log('Speed:', readSpeed);