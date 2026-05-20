// Import the Buffer module from Node.js
const { Buffer } = require('node:buffer');

// Create a buffer from a string
const buf = Buffer.from('Node.js Buffer Example');

// Search for the word "Node" inside the buffer
// Returns the index where the word starts
console.log(buf.indexOf('Node'));

// Search for the word "Buffer"
// Returns the starting position of the word
console.log(buf.indexOf('Buffer'));

// Search for the character "e"
// Start searching from index 5
console.log(buf.indexOf('e', 5));

// Search for the character "e"
// Search only between index 0 and 10
console.log(buf.indexOf('e', 0, 10));

// Create another buffer containing the word "Buffer"
const searchBuffer = Buffer.from('Buffer');

// Search for the ASCII byte value 66
// 66 is the ASCII code for the letter "B"
console.log(buf.indexOf(66));

// Create a UTF-16LE encoded buffer
const utf16Buffer = Buffer.from('Olá Mundo', 'utf16le');

// Search for the word "Mundo" using UTF-16LE encoding
console.log(
    utf16Buffer.indexOf('Mundo', 0, 'utf16le')
);

// Search for a word that does not exist in the buffer
// Returns -1 if not found
console.log(buf.indexOf('Python'));

// Search for an empty string
// Returns 0 because the empty string exists at the beginning
console.log(buf.indexOf(''));