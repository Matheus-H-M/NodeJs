// Import AsyncLocalStorage from Node.js async_hooks module
const { AsyncLocalStorage } = require("async_hooks");

// Create a new AsyncLocalStorage instance
// This will allow us to store and access data across async operations
const asyncLocalStorage = new AsyncLocalStorage();

// Function that logs the current request ID
function logRequestId() {
    // Get the current store (context) associated with this async execution
    const store = asyncLocalStorage.getStore();

    // Log the requestId stored in the current context (if it exists)
    console.log('Request ID:', store?.requestId);
}

// Function that simulates handling a request
function handleRequest(requestId) {

    // Create a new async context and store the requestId inside it
    asyncLocalStorage.run({ requestId }, () => {

        // Log when the request starts
        console.log("Starting request:", requestId);

        // Bind the function to the current async execution context
        // This ensures that when logRequestId runs later,
        // it still has access to the correct requestId
        const boundLog = AsyncLocalStorage.bind(logRequestId);

        // Simulate an asynchronous operation (like a database call)
        // Even though this runs later, it will preserve the context
        setTimeout(boundLog, 100);
    });
}

// Simulate two separate requests
handleRequest('REQ-1');
handleRequest('REQ-2');