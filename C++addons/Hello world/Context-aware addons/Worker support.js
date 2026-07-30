// Import the communication channel used to exchange messages
// between the main thread and this Worker thread.
const { parentPort } = require('worker_threads');

// Listen for messages sent from the main thread.
parentPort.on('message', (number) => {

    // Variable that will store the final result.
    let result = 0;

    // Simulate a CPU-intensive task by repeatedly
    // adding the received number one million times.
    for (let i = 0; i < 1_000_000; i++) {
        result += number;
    }

    // Send the computed result back to the main thread.
    parentPort.postMessage({
        // Indicates that the task completed successfully.
        success: true,

        // Return the calculated value.
        result,
    });
});