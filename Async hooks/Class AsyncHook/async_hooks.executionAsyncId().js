const async_hooks = require('node:async_hooks'); // Import module to track async execution context
const fs = require('node:fs'); // File system module
const http = require('node:http'); // HTTP server module

// Log the executionAsyncId of the main (bootstrap) context
console.log('Main executionAsyncId:', async_hooks.executionAsyncId());

// Helper function to log messages with the current async execution ID
function logWithId(msg){
    console.log(`[ID ${async_hooks.executionAsyncId()}] ${msg}`);
}

// Asynchronous file read example
fs.readFile(__filename, 'utf8', (err, data) => {
    if(err) throw err; // Handle error if file reading fails

    // This runs in a different async context
    logWithId('fs.readFile callback executed');
});

// setTimeout example (creates a new async context)
setTimeout(() => {
    logWithId('Inside setTimeout callback');
}, 100);

// Promise example (async context may behave differently)
Promise.resolve().then(() => {
    logWithId('Inside Promise then()');
});

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Each request runs in its own async context
    logWithId('Request received');

    res.end('OK'); // Send response
});

// Start the server on port 3000
server.listen(3000, () => {
    // This callback runs in a different async context (nextTick)
    logWithId('Server started on port 3000');
});