// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a buffer containing the correct password
const correctPassword = Buffer.from('1223456');

// Create a buffer containing the typed password
const typedPassword = Buffer.from('123456');

// Create a buffer containing an incorrect password
const wrongPassword = Buffer.from('654321');

// Compare the correct password with the typed password
// Returns true if both buffers contain exactly the same bytes
console.log(correctPassword.equals(typedPassword));

// Compare the correct password with the wrong password
// Returns false because the contents are different
console.log(correctPassword.equals(wrongPassword));

// Create a Uint8Array with ASCII byte values
const bytes = new Uint8Array([49, 50, 51, 52, 53, 54]);

// Compare the buffer with the Uint8Array
// Returns true only if all bytes match exactly
console.log(correctPassword.equals(bytes));