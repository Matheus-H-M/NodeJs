// Import the Blob class and the resolveObjectURL function from the Node.js buffer module.
const { Blob, resolveObjectURL } = require('node:buffer');

// Create a new Blob containing plain text data.
const blob = new Blob(['Hello, world!'], {
    // Specify the MIME type of the Blob.
    type: 'text/plain'
});

// Generate a unique object URL that references the Blob.
const objectURL = URL.createObjectURL(blob);

// Resolve the object URL back into its original Blob instance.
const resolvedBlob = resolveObjectURL(objectURL);

// Check whether the resolved object is a Blob.
console.log(resolvedBlob instanceof Blob);

// Print the Blob's MIME type.
console.log('Type:', resolvedBlob.type);

// Print the Blob's size in bytes.
console.log('Size:', resolvedBlob.size);

// Read the Blob's contents as text.
resolvedBlob.text().then(text => {
    // Display the text stored in the Blob.
    console.log('Content:', text);

    // Release the object URL when it is no longer needed.
    URL.revokeObjectURL(objectURL);
});