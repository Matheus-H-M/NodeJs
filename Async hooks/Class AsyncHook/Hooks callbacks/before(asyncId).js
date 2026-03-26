// Import the async_hooks module to track asynchronous resources
const async_hooks = require('async_hooks');

// Import the file system module
const fs = require('fs');

// Safe logging function (avoids recursion issues with async hooks)
function log(msg){
    // Write directly to stdout (file descriptor 1)
    fs.writeSync(1, msg + '\n');
}

// Create a hook to monitor async lifecycle events
const hook = async_hooks.createHook({

    // Called when a new async resource is initialized
    init(asyncId, type, triggerAsyncId){
        // asyncId: unique ID of the resource
        // type: type of async resource (e.g., Timeout, FSREQCALLBACK)
        // triggerAsyncId: ID of the resource that caused this one
        log(`init: id=${asyncId}, type=${type}, trigger=${triggerAsyncId}`);
    },

    // Called right before the async callback is executed
    before(asyncId){
        log(`before: Executing callback for asyncId=${asyncId}`);
    },

    // Called right after the async callback has finished executing
    after(asyncId){
        log(`after: Finished callback for asyncId=${asyncId}`);
    },

    // Called when the async resource is destroyed
    destroy(asyncId){
        log(`destroy: id=${asyncId}`);
    }
});

// Enable the hook so it starts tracking async operations
hook.enable();

// Example async operation: setTimeout
setTimeout(() => {
    log('setTimeout callback executed');
}, 100);

// Example async operation: reading the current file
fs.readFile(__filename, () => {
    log('File read completed');
});