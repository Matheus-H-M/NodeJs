// Import AsyncLocalStorage from the async_hooks module
// AsyncLocalStorage allows us to store data that persists
// across asynchronous operations (similar to thread-local storage)
const { AsyncLocalStorage } = require('async_hooks');

// Create a new AsyncLocalStorage instance
const asyncLocalStorage = new AsyncLocalStorage();

function test() {

    // run() creates a new asynchronous context
    // The object { userId: 123 } will be available to all async operations
    // created inside this callback
    asyncLocalStorage.run({ userId: 123 }, () => {

        // getStore() returns the current store object for this context
        console.log("Inside context:", asyncLocalStorage.getStore());

        try {

            // exit() temporarily leaves the current AsyncLocalStorage context
            // The callback will run WITHOUT access to the store
            asyncLocalStorage.exit(() => {

                // Because we exited the context, getStore() returns undefined
                console.log("Inside exit:", asyncLocalStorage.getStore());

                // Any async operations created here will also NOT have the context
                setTimeout(() => {
                    console.log("Timeout inside exit:", asyncLocalStorage.getStore());
                }, 10);

                // Throwing an error inside exit()
                // The error will propagate back to the caller
                throw new Error("Error inside exit");

            });

        } catch (err) {

            // The error thrown inside exit() is caught here
            console.log("Caught error:", err.message);

        }

        // After exit() finishes, the original context is restored
        // So getStore() returns the original store again
        console.log("After exit:", asyncLocalStorage.getStore());

    });
}

// Execute the test function
test();