// Import the Buffer class from Node.js buffer module
const { Buffer } = require('node:buffer');

// Create a buffer from an array of numbers
// (Note: Buffer.from expects an array [], not {})
const buf = Buffer.from([10, 20, 30, 40]);

// Iterate over buffer values using for...of
console.log('--- Using for...of ---');
for (const value of buf) {
    // Each iteration gives a single byte value from the buffer
    console.log(value);
}

// Iterate using the values() method
console.log('\n--- Using buf.values() ---');
for (const value of buf.values()) {
    // values() returns an iterator of the buffer's values
    console.log(value);
}

// Iterate over buffer indices using keys()
console.log('\n--- Using buf.keys() (indices) ---');
for (const index of buf.keys()) {
    // keys() returns an iterator of indices (0, 1, 2, ...)
    console.log(index);
}

// Iterate using entries() to get both index and value
console.log('\n--- Using buf.entries() (index + value) ---');
for (const [index, value] of buf.entries()) {
    // entries() returns [index, value] pairs
    console.log(`Index: ${index}, Value: ${value}`);
}