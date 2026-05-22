// Import the Buffer class from the Node.js buffer module
const { Buffer } = require('node:buffer');

// Create a Buffer from a string
const buf = Buffer.from('nodejs buffer buffer example');

// Find the last occurrence of the string "buffer"
console.log(buf.lastIndexOf('buffer'));
// Output: 14

// Find the last occurrence using another Buffer as the search value
console.log(buf.lastIndexOf(Buffer.from('buffer')));
// Output: 14

// Find the last occurrence of the ASCII byte value 101 ("e")
console.log(buf.lastIndexOf(101));
// Output: 25

// Search for "buffer" starting backwards from index 10
console.log(buf.lastIndexOf('buffer', 10));
// Output: 7

// Search for a value that does not exist in the Buffer
console.log(buf.lastIndexOf('python'));
// Output: -1

// Create a UTF-16LE encoded Buffer with Greek characters
const utf16 = Buffer.from('ΑΒΓΔΑΒΓ', 'utf16le');

// Search for the last occurrence of "Γ" using UTF-16LE encoding
console.log(
    utf16.lastIndexOf('Γ', undefined, 'utf16le')
);
// Output: 10

// Searching for an empty string returns the buffer length
console.log(buf.lastIndexOf(''));
// Output: 28

// Create another Buffer
const b = Buffer.from('abcdef');

// Numbers are converted to valid byte values
// 99.9 becomes 99, which is ASCII "c"
console.log(b.lastIndexOf(99.9));
// Output: 2

// 256 + 99 also becomes 99 after byte conversion
console.log(b.lastIndexOf(256 + 99));
// Output: 2

// {} becomes NaN, so the whole Buffer is searched
console.log(b.lastIndexOf('b', {}));
// Output: 1

// null becomes 0, so the search starts at index 0
console.log(b.lastIndexOf('b', null));
// Output: -1