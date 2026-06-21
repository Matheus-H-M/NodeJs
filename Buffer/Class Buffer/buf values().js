const { Buffer } = require('node:buffer');

// Create a Buffer from the string "Hello"
const buf = Buffer.from('Hello');

// Create an iterator that returns each byte value from the Buffer
const iterator = buf.values();

// Print a heading for the values() example
console.log('Buffer bytes using values():');

// Iterate through all byte values returned by the iterator
for (const value of iterator) {
    // Print the current byte value
    console.log(value);
}

// Print a blank line and a heading for the for...of example
console.log('\nBuffer bytes using for...of:');

// A Buffer is iterable, so for...of automatically uses buf.values()
for (const value of buf) {
    // Print the current byte value
    console.log(value);
}