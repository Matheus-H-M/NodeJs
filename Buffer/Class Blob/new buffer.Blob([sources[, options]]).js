// Import the Blob class from Node.js buffer module
const { Blob } = require('node:buffer');

// A simple string (will be encoded as UTF-8 inside the Blob)
const text = "Olá, mundo!\n";

// A Buffer containing some text data
const buffer = Buffer.from("Isso é um Buffer.");

// A TypedArray (Uint8Array) representing ASCII values (A, B, C)
const uint8 = new Uint8Array([65, 66, 67]);

// Create a new Blob using multiple data sources
const blob = new Blob(
    [
        text,   // string source
        buffer, // Buffer source
        uint8   // TypedArray source
    ],
    {
        type: 'text/plain', // MIME type of the Blob
        endings: 'native'   // convert line endings to OS default
    }
);

// Log the Blob MIME type
console.log("Type:", blob.type);

// Log the Blob size in bytes
console.log("Size (bytes):", blob.size);

// Read the Blob content as text (returns a Promise)
blob.text().then(content => {
    console.log("\nBlob content:");
    console.log(content);
});

// Read the Blob as an ArrayBuffer (binary data)
blob.arrayBuffer().then(ab => {
    console.log("\nArrayBuffer length:", ab.byteLength);
});