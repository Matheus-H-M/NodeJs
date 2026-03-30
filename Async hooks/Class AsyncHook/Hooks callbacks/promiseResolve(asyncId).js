const async_hooks = require('async_hooks'); // Import the async_hooks module to track async resources
const fs = require('fs'); // Import fs to write logs synchronously

// Helper function to log messages safely (sync to avoid async interference)
function log(msg) {
    fs.writeSync(1, msg + '\n'); // 1 = stdout
}

// Create a hook to monitor async lifecycle events
const hook = async_hooks.createHook({

    // Called when a new async resource is initialized
    init(asyncId, type, triggerAsyncId) {
        // We only care about Promises in this example
        if (type === 'PROMISE') {
            log(`init PROMISE id=${asyncId}, trigger=${triggerAsyncId}`);
        }
    },

    // Called right before the async resource callback is executed
    before(asyncId) {
        log(`before ${asyncId}`);
    },

    // Called right after the async resource callback finishes
    after(asyncId) {
        log(`after ${asyncId}`);
    },

    // Called when a Promise is resolved (resolve() is invoked)
    promiseResolve(asyncId) {
        log(`promiseResolve ${asyncId}`);
    }
});

// Enable the hook so it starts listening
hook.enable();

// Create a new Promise
new Promise((resolve) => {
    resolve(true); // Immediately resolve the Promise
})
.then((result) => {
    // This runs after the Promise is fulfilled
    log(`then received: ${result}`);
});