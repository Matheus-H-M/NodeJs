// Import AsyncLocalStorage from Node.js async_hooks module
// It allows us to store data that persists across asynchronous calls
import { AsyncLocalStorage } from "async_hooks";

// Create an instance of AsyncLocalStorage
// This will hold our per-request context (like requestId)
const asyncLocalStorage = new AsyncLocalStorage();

// Simulates a database call
async function fakeDatabaseCall(){

    // Simulate async delay (like a DB query)
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Retrieve the current context store
    const store = asyncLocalStorage.getStore();

    // Read the requestId stored in the current async context
    console.log("DB requestId:", store.get("requestId"));
}

// Function that represents some request processing logic
async function processRequest(){

    // Get the current async context store
    const store = asyncLocalStorage.getStore();

    // Log the requestId associated with this request
    console.log("Process requestId:", store.get("requestId"));

    // Call another async function (context will still be preserved)
    await fakeDatabaseCall();
}

// Function that handles an incoming request
async function handleRequest(requestId){

    // Create a new async context for this request
    // new Map() will store data specific to this request
    await asyncLocalStorage.run(new Map(), async () => {

        // Get the context store created above
        const store = asyncLocalStorage.getStore();

        // Save the requestId in the store
        // Any async function inside this context can access it
        store.set("requestId", requestId);

        // Run the request processing logic
        await processRequest();
    });
}

// Main function that simulates multiple concurrent requests
async function main(){

    // Run two requests at the same time
    // Each request will have its own independent context
    await Promise.all([
        handleRequest("req-1"),
        handleRequest("req-2")
    ]);
}

// Start the program
main();