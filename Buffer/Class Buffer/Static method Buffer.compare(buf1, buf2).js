// Import the Buffer class from Node.js built-in 'buffer' module
const { Buffer } = require('node:buffer');

// Create Buffer instances from strings
const buf1 = Buffer.from('banana');   // Buffer containing "banana"
const buf2 = Buffer.from('maça');     // Buffer containing "maça"
const buf3 = Buffer.from('abacaxi');  // Buffer containing "abacaxi"

// Store the buffers in an array
const buffers = [buf1, buf2, buf3];

// Sort the array of buffers using Buffer.compare
// This compares the binary (byte) values of each buffer
buffers.sort(Buffer.compare);

// Print a header message
console.log('Sorted buffers:');

// Loop through each buffer and print its string representation
buffers.forEach((b) => {
    console.log(b.toString()); // Convert buffer back to string for display
});

// Compare buf1 and buf2 directly
const resultado = Buffer.compare(buf1, buf2);

// Check the comparison result
// If result < 0, buf1 comes before buf2
if (resultado < 0) {
    console.log('buf1 comes before buf2');
}
// If result > 0, buf1 comes after buf2
else if (resultado > 0) {
    console.log('buf1 comes after buf2');
}
// If result === 0, both buffers are equal
else {
    console.log('buf1 is equal to buf2');
}