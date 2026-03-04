// Import AsyncLocalStorage from Node.js async_hooks module
import { AsyncLocalStorage } from "node:async_hooks";

// Create a new AsyncLocalStorage instance
// This will store values across asynchronous operations
const asyncLocalStorage = new AsyncLocalStorage();

class Foo {

    // Declare a private field to store the snapshot function
    #runInAsyncScope;

    constructor() {
        // Capture the current async execution context
        // snapshot() returns a function that allows us to run
        // any callback inside the captured context later
        this.#runInAsyncScope = AsyncLocalStorage.snapshot();
    }

    get() {
        // Execute the provided function inside the captured context
        // Even if called from another async context,
        // it will return the value from the original one
        return this.#runInAsyncScope(() => asyncLocalStorage.getStore());
    }
}

// Create a Foo instance inside an async context with value 123
// This means the snapshot will capture the value 123
const foo = asyncLocalStorage.run(123, () => new Foo());

// Run another async context with value 321
// But foo.get() will execute inside the previously captured context (123)
const result = asyncLocalStorage.run(321, () => foo.get());

// Print the result
// Expected output: 123
console.log("Class Result:", result);