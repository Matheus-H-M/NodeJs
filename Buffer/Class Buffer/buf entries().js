// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Function to analyze a text string as a Buffer
function analyzeBuffer(text) {

    // Convert the text into a Buffer object
    const buf = Buffer.from(text);

    // Iterate through all [index, byte] pairs in the buffer
    for (const [index, byte] of buf.entries()) {

        // Print information about each byte
        console.log({

            // Position of the byte in the buffer
            index,

            // Numeric value of the byte
            byte,

            // Convert the byte into its corresponding character
            character: String.fromCharCode(byte)
        });
    }
}

// Call the function with a sample string
analyzeBuffer("Olá");