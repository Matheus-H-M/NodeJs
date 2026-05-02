const { Buffer } = require('node:buffer');
// Import the Buffer class from Node.js

// Create buffers from strings
const buf1 = Buffer.from('Olá ');
const buf2 = Buffer.from('mundo ');
const buf3 = Buffer.from('Node.js!');

// Concatenate buffers (must be passed as an array, not an object)
const resultado1 = Buffer.concat([buf1, buf2, buf3]);
// If totalLength is not provided, it is calculated automatically

// Convert the resulting buffer to string and print it
console.log(resultado1.toString());
// Output: "Olá mundo Node.js!"

// Print the total length of the concatenated buffer
console.log(resultado1.length);

// Create a total length larger than needed
const totalMaior = resultado1.length + 5;

// Concatenate again, forcing a larger total length
const resultado2 = Buffer.concat([buf1, buf2, buf3], totalMaior);
// Extra space will be filled with zero bytes

// Print the raw buffer (will include zero-filled bytes at the end)
console.log(resultado2);

// Print the new buffer length (larger than original)
console.log(resultado2.length);

// Create a smaller total length (will cause truncation)
const totalMenor = 10;

// Concatenate with a smaller total length
const resultado3 = Buffer.concat([buf1, buf2, buf3], totalMenor);
// The result will be truncated to fit the specified length

// Convert truncated buffer to string and print
console.log(resultado3.toString());

// Print the truncated buffer length
console.log(resultado3.length);