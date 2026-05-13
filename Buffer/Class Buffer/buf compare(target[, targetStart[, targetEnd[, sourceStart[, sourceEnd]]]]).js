// Create three buffers containing text data
const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('ABD');
const buf3 = Buffer.from('ABC');

// Display section title for simple comparisons
console.log('--- Simple Comparison ---');

// Compare buf1 with buf2
// Returns -1 because "ABC" comes before "ABD"
console.log(buf1.compare(buf2));

// Compare buf2 with buf1
// Returns 1 because "ABD" comes after "ABC"
console.log(buf2.compare(buf1));

// Compare buf1 with buf3
// Returns 0 because both buffers are equal
console.log(buf1.compare(buf3));

// Display section title for partial comparisons
console.log('\n--- Partial Comparison ---');

// Create two numeric buffers
const a = Buffer.from([1, 2, 3, 5]);
const b = Buffer.from([1, 2, 3, 5]);

// Compare only specific parts of the buffers
const resultado = a.compare(
    b, // Target buffer
    2, // targetStart: start position in buffer b
    4, // targetEnd: end position in buffer b (not inclusive)
    0, // sourceStart: start position in buffer a
    2  // sourceEnd: end position in buffer a (not inclusive)
);

// Print comparison result
console.log(resultado);

// Display section title for sorting buffers
console.log('\n--- Sorting Buffers ---');

// Create an array of buffers
const lista = [
    Buffer.from('C'),
    Buffer.from('A'),
    Buffer.from('B')
];

// Sort buffers alphabetically using Buffer.compare
lista.sort(Buffer.compare);

// Convert buffers to strings and print result
console.log(lista.map(c => c.toString()));