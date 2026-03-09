// Import AsyncLocalStorage from the async_hooks module
// AsyncLocalStorage allows us to keep data tied to the current async execution context
const { AsyncLocalStorage } = require("async_hooks");

// Create a new AsyncLocalStorage instance
// This will manage our async context storage
const asyncLocalStorage = new AsyncLocalStorage();

// Simulates a database call that runs asynchronously
function fakeDatabaseCall(){

    // setTimeout simulates a delayed async operation (like a database query)
    setTimeout(() => {

        // Retrieve the current store associated with this async execution context
        const store = asyncLocalStorage.getStore();

        // Print the requestId stored in the async context
        console.log("DB access - requestId:", store.requestId);

    }, 100);
}

// Simulates handling an incoming request
function handleRequest(requestId){

    // Create a store object that contains data we want to share across async calls
    const store = { requestId };

    // Run a function inside a new async context
    // The provided store becomes available to all async operations created inside this callback
    asyncLocalStorage.run(store, () => [

        // Log the request start and access the requestId from the async context
        console.log("Start request:", asyncLocalStorage.getStore().requestId),

        // Call a simulated async database operation
        fakeDatabaseCall(),

        // Another async operation to show that the context persists
        setTimeout(() => {

            // Retrieve the context again inside this async callback
            const context = asyncLocalStorage.getStore();

            // Print the requestId stored in the context
            console.log("Async operation - requestId:", context.requestId);

        }, 50)
    ]);
}

// Simulate two separate requests with different IDs
// Each request will have its own isolated async context
handleRequest("REQ-1001");
handleRequest("REQ-2002");