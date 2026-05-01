// Import AsyncLocalStorage from the async_hooks module
const { AsyncLocalStorage } = require('async_hooks');

// Create a new AsyncLocalStorage instance
const asyncLocalStorage = new AsyncLocalStorage();

// Function to log messages with the requestId from the async context
function log(message) {
    // Get the current store (context data)
    const store = asyncLocalStorage.getStore();

    // Print the requestId and message to the console
    // Optional chaining prevents errors if store is undefined
    console.log(`[requestId: ${store?.requestId}] ${message}`);
}

// Function that simulates an asynchronous operation
function fakeAsyncOperation(callback) {
    // setTimeout represents an async task (like a DB call or API request)
    setTimeout(() => {
        callback();
    }, 100);
}

// Function that simulates handling a request
function handleRequest(requestId) {
    // Create a context object to store request-specific data
    const store = { requestId };

    // Enter the async context with the given store
    // This makes the store available to all async operations triggered here
    asyncLocalStorage.enterWith(store);

    // Log the start of the request
    log("Starting request");

    // Run an asynchronous operation
    fakeAsyncOperation(() => {
        // The same store is still available here
        log("Inside async operation");
    });
}

// Simulate two different requests
handleRequest(1);
handleRequest(2);