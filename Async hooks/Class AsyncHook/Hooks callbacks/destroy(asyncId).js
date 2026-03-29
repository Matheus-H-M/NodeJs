// Import the async_hooks module to track asynchronous resources
const async_hooks = require('async_hooks');

// Import fs to write logs synchronously (avoids recursion issues)
const fs = require('fs');

// Simple logging function using synchronous write
function log(msg) {
    // Write directly to stdout (fd = 1)
    fs.writeSync(1, msg + '\n');
}

// Create a hook instance to monitor async lifecycle events
const hook = async_hooks.createHook({

    // Called when a new async resource is initialized
    init(asyncId, type, triggerAsyncId) {
        log(`INIT: id=${asyncId}, type=${type}, trigger=${triggerAsyncId}`);
    },

    // Called when the async resource is destroyed
    destroy(asyncId) {
        log(`DESTROY: id=${asyncId}`);
    }
});

// Enable the hook so it starts tracking
hook.enable();

// Example async operation using setTimeout
setTimeout(() => {
    log('Timeout executed');
}, 100);

// Example async operation using Promise
Promise.resolve().then(() => {
    log('Promise resolved');
});