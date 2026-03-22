// Import the async_hooks module to track asynchronous resources
const async_hooks = require('node:async_hooks');

// Import fs to perform file system operations (used for synchronous logging)
const fs = require('node:fs');

// Import util to format log messages
const util = require('node:util');

// Custom debug function that writes logs synchronously to a file
function debug(...args){
    // writeFileSync is synchronous, so it avoids triggering AsyncHook callbacks again
    fs.writeFileSync('logo.out', `${util.format(...args)}\n`, { flag: 'a'});
}

// Flag to prevent infinite recursion caused by logging inside AsyncHook callbacks
let logging = false;

// Create an AsyncHook instance with lifecycle callbacks
const hook = async_hooks.createHook({

    // Called when a new async resource is initialized
    init(asyncId, type, triggerAsyncId){
        // If we are already logging, skip to avoid recursion
        if(logging) return;

        logging = true;

        // Log initialization details
        debug(`INIT: id=${asyncId}, type=${type}, trigger=${triggerAsyncId}`);

        logging = false;
    },

    // Called just before the async resource executes
    before(asyncId){
        if(logging) return;

        logging = true;

        // Log before execution
        debug(`BEFORE: id=${asyncId}`);

        logging = false;
    },

    // Called immediately after the async resource has executed
    after(asyncId){
        if(logging) return;

        logging = true;

        // Log after execution
        debug(`AFTER: id=${asyncId}`);

        logging = false;
     },
});

// Enable the AsyncHook to start tracking async operations
hook.enable();

// Example async operation using setTimeout
setTimeout(() => {
    // This console.log is async and will trigger AsyncHook events
    console.log('Timeout executed');
}, 100);

// Example async operation using Promise
Promise.resolve().then(() => {
    console.log('Promise resolved');
});