// Import the async_hooks module to track asynchronous resources
const async_hooks = require('async_hooks');

// Import fs module to write logs synchronously (avoids async interference)
const fs = require('fs');

// Create a hook to listen to lifecycle events of async operations
const hook = async_hooks.createHook({
    // The init callback is called when a new async resource is created
    init(asyncId, type, triggerAsyncId){
        // Write information about the async resource to stdout (fd = 1)
        fs.writeSync(
            1,
            `INIT -> asyncId: ${asyncId}, type: ${type}, triggerAsyncId: ${triggerAsyncId}\n`
        );
    }
});

// Enable the hook so it starts tracking async operations
hook.enable();

// Example using setTimeout (a timer async resource)
setTimeout(() => {
    // Get the ID of the resource that triggered this callback
    const currentTriggerId = async_hooks.triggerAsyncId();

    // Print the triggerAsyncId to the console
    console.log(`TriggerAsyncId inside setTimeout: ${currentTriggerId}`);
}, 100);

// Example using Promise (microtask async resource)
Promise.resolve().then(() => {
    // Get the ID of the resource that triggered this callback
    const currentTriggerId = async_hooks.triggerAsyncId();

    // Print the triggerAsyncId to the console
    console.log(`TriggerAsyncId inside Promise: ${currentTriggerId}`);
});