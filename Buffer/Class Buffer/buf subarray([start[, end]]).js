// Import the Buffer module from Node.js
const { Buffer } = require('node:buffer');

// Create a Buffer containing the text "Hello World"
const buf = Buffer.from('Hello World');

// Create a subarray from index 0 to 5 (end index is not included)
// This will contain the bytes representing "Hello"
const sub = buf.subarray(0, 5);

// Display the contents of the original Buffer
console.log('Original:', buf.toString());

// Display the contents of the subarray
console.log('Subarray:', sub.toString());

// Modify the first byte of the subarray
// 74 is the ASCII value for the letter 'J'
sub[0] = 74;

// Because subarray() shares memory with the original Buffer,
// changing the subarray also changes the original Buffer
console.log('\nAfter modifying the subarray:');

// Display the modified original Buffer ("Jello World")
console.log('Original:', buf.toString());

// Display the modified subarray ("Jello")
console.log('Subarray:', sub.toString());

// Create a subarray using a negative index
// -5 means start 5 bytes from the end of the Buffer
const endPart = buf.subarray(-5);

// Display the last 5 characters of the Buffer ("World")
console.log('\nLast 5 characters:');
console.log(endPart.toString());