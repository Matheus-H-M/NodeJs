// Import AsyncLocalStorage from Node.js async_hooks module
const { AsyncLocalStorage } = require('async_hooks');

// Create a new AsyncLocalStorage instance
// This will allow us to store data per asynchronous context
const asyncLocalStorage = new AsyncLocalStorage();

// Function that simulates an asynchronous operation
function asyncOperation(name, delay) {
    // setTimeout simulates async work with a delay
    setTimeout(() => {
        // Retrieve the current store (context data)
        const store = asyncLocalStorage.getStore();

        // Log the operation name and the request ID from the context
        console.log(`Operation: ${name}, Request ID: ${store.requestId}`);
    }, delay);
}

// Function that simulates handling a request
function handleRequest(requestId) {
    // Run a new async context with a store object
    // Here we store the requestId for this specific execution flow
    asyncLocalStorage.run({ requestId }, () => {
        // Log when the request starts
        console.log(`Starting request ${requestId}`);

        // Call async operations that will share the same context
        asyncOperation('A', 100);
        asyncOperation('B', 200);
    });
}

// Simulate multiple independent requests
handleRequest(1);
handleRequest(2);