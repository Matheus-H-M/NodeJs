// Import the built-in async_hooks module to track async resources
const async_hooks = require('node:async_hooks');

// Import fs module to write logs safely
const fs = require('fs');

// Custom log function using synchronous write
// This avoids creating additional async operations inside hooks
function log(message){
    fs.writeSync(1, message + '\n'); // 1 = stdout
}

// Create an AsyncHook instance with lifecycle callbacks
const hook = async_hooks.createHook({

   // Called when a new async resource is created
   init(asyncId, type, triggerAsyncId){
    log(`INIT: id=${asyncId}, type=${type}, trigger=${triggerAsyncId}`);
   },

   // Called right before the async resource executes
   before(asyncId){
    log(`BEFORE: id=${asyncId}`);
   },

   // Called right after the async resource finishes execution
   after(asyncId){
    log(`AFTER: id=${asyncId}`);
   },

   // Called when the async resource is destroyed
   destroy(asyncId){
    log(`DESTROY: id=${asyncId}`);
   }

}).enable(); // Enable the hook immediately after creation

// Example async operation using setTimeout
setTimeout(() => {
    log('Running inside setTimeout');
}, 100);

// Example async operation using Promise
Promise.resolve().then(() => {
    log('Running inside Promise');
});