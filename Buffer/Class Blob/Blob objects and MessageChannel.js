// Import Blob from Node.js buffer module
const { Blob } = require('node:buffer');

// Import MessageChannel for communication between threads/ports
const { MessageChannel } = require('node:worker_threads');

// Import a promise-based delay function
const { setTimeout: delay } = require('node:timers/promises');

// Create a Blob containing a simple string
const blob = new Blob(['Olá do Node.js']);

// Create two independent message channels
const mc1 = new MessageChannel();
const mc2 = new MessageChannel();

// Listener for the first channel
mc1.port1.on('message', async (data) => {
    console.log('Channel 1 received...');

    // Convert Blob data into an ArrayBuffer (data is copied here)
    const buffer = await data.arrayBuffer();

    // Convert buffer to string and print it
    console.log('Channel 1 content:', Buffer.from(buffer).toString());

    // Close the port after use
    mc1.port1.close();
});

// Listener for the second channel (with delay)
mc2.port1.on('message', async (data) => {
    console.log('Channel 2 received (with delay)...');

    // Wait 1.5 seconds before reading the data
    await delay(1500);

    // Convert Blob data into an ArrayBuffer
    const buffer = await data.arrayBuffer();

    // Convert buffer to string and print it
    console.log('Channel 2 content:', Buffer.from(buffer).toString());

    // Close the port after use
    mc2.port1.close();
});

// Send the same Blob to both channels
mc1.port2.postMessage(blob);
mc2.port2.postMessage(blob);

// The Blob is still usable after being sent
blob.text().then((text) => {
    console.log('Original Blob still available:', text);
});