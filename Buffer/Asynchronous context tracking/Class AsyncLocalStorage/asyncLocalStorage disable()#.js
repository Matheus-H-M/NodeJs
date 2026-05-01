// Import AsyncLocalStorage from the async_hooks module
const { AsyncLocalStorage } = require('async_hooks');

// Create a new AsyncLocalStorage instance
const asyncLocalStorage = new AsyncLocalStorage();

// Function that demonstrates how AsyncLocalStorage works
function exemplo(){

    // run() creates a new asynchronous context
    // The object passed ({ usuario: "Carlos" }) becomes the store for this context
    asyncLocalStorage.run({ usuario: "Carlos" }, () => {

        // getStore() returns the current context store
        // At this point the store exists because we are inside run()
        console.log("Store inside the context:", asyncLocalStorage.getStore());

        // Simulate an asynchronous operation
        setTimeout(() => {

            // The store is still available because AsyncLocalStorage
            // propagates the context across async operations
            console.log("Store before disable:", asyncLocalStorage.getStore());

            // disable() exits all current contexts linked to this instance
            // After this call, getStore() will return undefined
            asyncLocalStorage.disable();

            // Since AsyncLocalStorage was disabled, the store no longer exists
            console.log("Store after disable:", asyncLocalStorage.getStore());

        }, 100);
    });
}

// Execute the example function
exemplo();