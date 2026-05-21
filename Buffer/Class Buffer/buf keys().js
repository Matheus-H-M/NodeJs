// Import the Buffer class from the Node.js buffer module
const { Buffer } = require('node:buffer');

// Create a Buffer containing the string "NodeJS"
const buf = Buffer.from('NodeJS');

// Print a title to the console
console.log('Buffer Indexes:');

// Loop through all indexes (keys) of the Buffer
for (const key of buf.keys()) {

    // Print the current index and its corresponding character
    console.log(`Index: ${key} | Value: ${String.fromCharCode(buf[key])}`);
}