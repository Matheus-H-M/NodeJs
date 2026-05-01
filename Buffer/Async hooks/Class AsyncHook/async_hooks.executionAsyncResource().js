// Import the built-in HTTP module to create a server
const http = require('node:http');

// Import async_hooks to track async resources
const async_hooks = require('node:async_hooks');

// Extract specific functions from async_hooks
const { executionAsyncResource, createHook } = async_hooks;

// Create a unique symbol to store context data safely
// (avoids name collisions with internal properties)
const CONTEXT = Symbol('context');

// Create an async hook to propagate context between async operations
createHook({
    // The init hook runs whenever a new async resource is created
    init(asyncId, type, triggerAsyncId, resource) {

        // Get the current async resource (the one that triggered this new one)
        const current = executionAsyncResource();

        // If there is a current resource and it has context data
        if (current && current[CONTEXT]) {

            // Copy the context to the new async resource
            resource[CONTEXT] = current[CONTEXT];
        }
    }
}).enable(); // Enable the hook

// Create an HTTP server
const server = http.createServer((req, res) => {

    // Attach context data to the current async resource
    executionAsyncResource()[CONTEXT] = {
        url: req.url,              // Store request URL
        startTime: Date.now()      // Store request start time
    };

    // Simulate an asynchronous operation (e.g., DB call)
    setTimeout(() => {

        // Retrieve the context from the current async resource
        const ctx = executionAsyncResource()[CONTEXT];

        // Send HTTP response headers
        res.writeHead(200, { 'Content-Type': 'application/json' });

        // Send JSON response with preserved context data
        res.end(JSON.stringify({
            message: 'Context preserved!',
            url: ctx.url,
            duration: Date.now() - ctx.startTime // Calculate elapsed time
        }));

    }, Math.random() * 500); // Random delay to simulate async behavior
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});