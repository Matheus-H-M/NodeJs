// Import AsyncLocalStorage from the Node.js async_hooks module
// This module allows tracking asynchronous resources and contexts
const { AsyncLocalStorage } = require("async_hooks");

// Create an instance of AsyncLocalStorage
// This will hold data that persists across asynchronous operations
const asyncLocalStorage = new AsyncLocalStorage();

// Function that logs a message with context information
function logWithContext(message){

    // getStore() retrieves the current context store
    // If called outside a context created with run() or enterWith(),
    // it will return undefined
    const store = asyncLocalStorage.getStore();

    // If a context exists, print the requestId stored in the context
    if(store){
        console.log(`[requestId=${store.requestId}] ${message}`);
    }else{
        // If there is no context, print a default message
        console.log(`[no-context] ${message}`);
    }
}

// Function that simulates an asynchronous operation
function simulateAsyncOperation(){

    // setTimeout is used here to simulate an async task
    setTimeout(() => {

        // Even though this runs asynchronously,
        // AsyncLocalStorage keeps the context available
        logWithContext("Async operation finished");

    }, 100); // Runs after 100 milliseconds
}

// run() creates a new asynchronous context
// The first argument is the store object we want to share
// across async calls inside this callback
asyncLocalStorage.run({ requestId: "abc123" }, () => {

    // This log runs inside the async context
    logWithContext("Starting operation");

    // Call the simulated async function
    // The context will still be available inside it
    simulateAsyncOperation();
});

// This setTimeout runs outside the AsyncLocalStorage context
setTimeout(() => {

    // Since this is outside run(), getStore() will return undefined
    logWithContext("Running outside the context");

}, 200); // Runs after 200 millisecond