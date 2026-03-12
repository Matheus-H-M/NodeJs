// Import AsyncLocalStorage and AsyncResource from Node.js async_hooks module
// AsyncLocalStorage allows storing data that persists across async operations
// AsyncResource allows manually linking async operations to the correct context
const { AsyncLocalStorage, AsyncResource } = require('async_hooks');

// Create an instance of AsyncLocalStorage to hold contextual data
const asyncLocalStorage = new AsyncLocalStorage();


// Simulated legacy async function that uses a callback instead of promises
// Some callback-based APIs may cause context loss in AsyncLocalStorage
function legacyAsyncOperation(callback) {
    // Simulate an asynchronous delay
    setTimeout(() => {
        callback();
    }, 100);
}


// Custom AsyncResource class to properly bind async operations
// to the current execution context
class LegacyAsyncResource extends AsyncResource {

    // Constructor defines the resource type name
    constructor() {
        super('LEGACY_ASYNC_OPERATION');
    }

    // Method that runs a callback inside the correct async context
    run(callback) {
        setTimeout(() => {

            // runInAsyncScope ensures the callback executes
            // with the correct AsyncLocalStorage context
            this.runInAsyncScope(callback);

        }, 100);
    }
}


// Demonstrates a scenario where context may be lost
function demoContextLoss() {

    // Start a new async context with a stored object
    asyncLocalStorage.run({ requestId: "REQ-123" }, () => {

        // Log the store at the beginning
        console.log("Initial store:", asyncLocalStorage.getStore());

        // Call a legacy async operation
        legacyAsyncOperation(() => {

            // In complex callback systems the store could become undefined
            console.log("After legacy operation:", asyncLocalStorage.getStore());

        });

    });
}


// Demonstrates the fixed version using AsyncResource
function demoFixedContext() {

    // Start a new async context
    asyncLocalStorage.run({ requestId: "REQ-456" }, () => {

        // Log initial store
        console.log("Initial store:", asyncLocalStorage.getStore());

        // Create a custom AsyncResource instance
        const resource = new LegacyAsyncResource();

        // Run the async operation inside the resource scope
        resource.run(() => {

            // Context is preserved here
            console.log("After operation (fixed):", asyncLocalStorage.getStore());

        });

    });
}


// Run the context loss demo
demoContextLoss();


// Run the fixed version after a short delay
setTimeout(() => {

    console.log('\n--- Fixed with AsyncResource ---\n');

    demoFixedContext();

}, 500);