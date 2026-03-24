const async_hooks = require('async_hooks'); // Import the async_hooks module to track async resources
const fs = require('fs'); // Import fs to write logs synchronously

// Simple logging function using synchronous write
// This avoids creating new async operations (which would cause infinite loops)
function log(msg){
    fs.writeSync(1, msg + '\n'); // Write directly to stdout (file descriptor 1)
}

// Create an AsyncHook instance with lifecycle callbacks
const asyncHook = async_hooks.createHook({

    // Called when a new async resource is initialized
    init(asyncId, type, triggerAsyncId){
        log(`INIT: id=${asyncId}, type=${type}, trigger=${triggerAsyncId}`);
    },

    // Called right before the async callback executes
    before(asyncId){
        log(`BEFORE: id=${asyncId}`);
    },

    // Called right after the async callback finishes
    after(asyncId){
        log(`AFTER: id=${asyncId}`);
    },

    // Called when the async resource is destroyed
    destroy(asyncId){
        log(`DESTROY: id=${asyncId}`);
    }
});

// Enable the hook so it starts receiving events
asyncHook.enable();

// Create an async operation (setTimeout)
setTimeout(() => {
    log('Executing first setTimeout');

    // Disable the hook
    // After this, no more async lifecycle events will be logged
    asyncHook.disable();

    // This async operation will NOT trigger hook callbacks
    setTimeout(() => {
        log('Second timeout (hook disabled)');
    }, 100);

}, 100);