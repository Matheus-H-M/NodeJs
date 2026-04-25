// Import the Buffer class from Node.js buffer module
const { Buffer } = require('node:buffer');

// Function to store data into a fixed-size buffer
function armazenarDados(dadosEntrada){

    // Allocate a buffer of 10 bytes WITHOUT initialization
    // (memory may contain old/unknown data)
    const buf = Buffer.allocUnsafeSlow(10);

    // Log the buffer before writing anything into it
    console.log('Before filling:', buf);

    // Copy data from the input buffer into our new buffer
    // - buf: destination buffer
    // - 0: start writing at position 0 in destination
    // - 0: start reading at position 0 in source
    // - Math.min(...): ensures we copy at most 10 bytes
    dadosEntrada.copy(buf, 0, 0, Math.min(dadosEntrada.length, 10));

    // Log the buffer after copying data
    console.log('After copy:', buf);

    // Return the resulting buffer
    return buf;
}

// Create a buffer from a string (UTF-8 encoded by default)
const dados = Buffer.from('Olá mundo!!!');

// Call the function to store part of the data
const armazenado = armazenarDados(dados);

// Print the final stored buffer
console.log('Final stored buffer:', armazenado);