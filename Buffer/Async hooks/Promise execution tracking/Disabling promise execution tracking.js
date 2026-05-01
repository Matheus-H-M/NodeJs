// Import createHook from the async_hooks module
const { createHook } = require('node:async_hooks');

// Import writeSync from the fs module (used for synchronous logging)
const { writeSync } = require('node:fs');

// Create an async hook instance
const hook = createHook({
    // The init hook is called when a new async resource is created
    init(asyncId, type, triggerAsyncId, resource) {
        // Write a message to stdout (file descriptor 1)
        // showing the type of async resource initialized
        writeSync(1, `init hook triggered for ${type} \n`);
    },

    // Disable tracking of Promises to reduce performance overhead
    trackPromise: false,
});

// Enable the hook so it starts listening to async events
hook.enable();

// Create and resolve a Promise
Promise.resolve(1729).then((value) => {
    // Log the resolved value of the Promise
    console.log('Resolved:', value);
});

// Use setTimeout as another async example
setTimeout(() => {
    // Log a message after 100ms delay
    console.log('Timeout executed');
}, 100);