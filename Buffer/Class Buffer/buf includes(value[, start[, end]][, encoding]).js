// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a text string
const text = 'Node.js Buffer Example';

// Convert the string into a Buffer
const buf = Buffer.from(text);

// Print the Buffer object
console.log('Buffer:', buf);

// Print the original text
console.log('Original text:', text);

console.log('\n=== Searching strings ===');

// Check if the buffer contains the string "Node"
console.log(buf.includes('Node')); // true

// Check if the buffer contains the string "Buffer"
console.log(buf.includes('Buffer')); // true

// Check if the buffer contains the string "JavaScript"
console.log(buf.includes('JavaScript')); // false

console.log('\n=== Using start position ===');

// Search for "Node" starting at index 0
console.log(buf.includes('Node', 0)); // true

// Search for "Node" starting at index 5
console.log(buf.includes('Node', 5)); // false

// Search for "Example" starting at index 10
console.log(buf.includes('Example', 10)); // true

console.log('\n=== Searching with another Buffer ===');

// Create another Buffer to search
const searchBuffer = Buffer.from('Buffer');

// Check if the main buffer contains the search buffer
console.log(buf.includes(searchBuffer)); // true

console.log('\n=== Searching using ASCII code ===');

// Search for ASCII code 66 ("B")
console.log(buf.includes(66)); // true

// Search for ASCII code 120 ("x")
console.log(buf.includes(120)); // false

console.log('\n=== Using encoding ===');

// Create a UTF-8 encoded buffer
const utf8Buf = Buffer.from('Olá Mundo', 'utf8');

// Search using UTF-8 encoding
console.log(utf8Buf.includes('Olá', 0, utf8Buf.length, 'utf8')); // true

console.log('\n=== Equivalent comparison ===');

// buf.includes(value) is equivalent to:
console.log(buf.indexOf('Buffer') !== -1); // true