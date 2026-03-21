// Import the async_hooks module to track asynchronous resources
const async_hooks = require('async_hooks');

// Import fs to safely write logs (console.log is unsafe inside hooks)
const fs = require('fs');

// Simple logging function using synchronous write
function log(msg){
    // Writes directly to stdout (file descriptor 1)
    fs.writeSync(1, msg + '\n');
}

// Create an AsyncHook instance with lifecycle callbacks
const hook = async_hooks.createHook({

    // Called when a new async resource is initialized
    init(asyncId, type, triggerAsyncId){
        log(`ìnit: ${asyncId}, type: ${type}`); // Note: "ìnit" has a typo

        // Simulate an error when the resource type is 'Timeout'
        if(type === 'Timeout'){
            // Throwing here will crash the process intentionally
            throw new Error('Erro dentro do AsyncHook(init'); // Message in Portuguese
        }
    },

    // Called right before the async resource executes
    before(asyncId){
        log(`before: ${asyncId}`);
    },

    // Called right after the async resource executes
    after(asyncId){
        log(`after: ${asyncId}`);
    },

    // Called when the async resource is destroyed
    destroy(asyncId){
        log(`destroy: ${asyncId}`);
    }
});

// Enable the hook so it starts tracking async operations
hook.enable();

// Attempt to listen for uncaught exceptions
// NOTE: There are typos here:
// - 'uncaightExeception' should be 'uncaughtException'
// - 'nessage' should be 'message'
process.on('uncaightExeception', (err) => {
    log('uncaughtException capturado:' + err.nessage);
});

// Create a timeout to trigger async activity
setTimeout(() => {
    log('Executando timeout'); // "Executing timeout"
}, 100);