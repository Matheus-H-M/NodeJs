// Import AsyncLocalStorage from Node.js async_hooks module
// AsyncLocalStorage allows storing data that persists across async operations
import { AsyncLocalStorage } from "node:async_hooks";

// Create a new AsyncLocalStorage instance
// The "name" option (available in newer Node.js versions) assigns a label
// to the instance, useful for debugging and observability tools
const asyncLocalStorage = new AsyncLocalStorage({
    name: "request-context"
});

// Print the name of the AsyncLocalStorage instance
// The property asyncLocalStorage.name returns the name defined above
console.log("Instance name:", asyncLocalStorage.name);

// Run a new asynchronous context
// The object { userId: 123 } becomes the store associated with this async context
asyncLocalStorage.run({ userId: 123 }, () => {

    // Simulate an asynchronous operation (e.g., database call, API request)
    setTimeout(() => {

        // Retrieve the current store associated with this async context
        const store = asyncLocalStorage.getStore();

        // Print the stored context data
        console.log("Stored context:", store);

    }, 1000); // Wait 1 second before executing the callback
});