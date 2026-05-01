const async_hooks = require('async_hooks');

// Get the map of all available async providers
const providers = async_hooks.asyncWrapProviders;

// Print a header message
console.log('List of asyncWrapProviders:\n');

// Loop through each provider and log its name and numeric ID
for (const [name, id] of Object.entries(providers)) {
    console.log(`${name}: ${id}`);
}

// Create an async hook to track lifecycle events of async resources
const hook = async_hooks.createHook({
    // The 'init' event is called when a new async resource is created
    init(asyncId, type, triggerAsyncId) {

        // Check if the resource type is a Promise
        if (type === 'PROMISE') {
            console.log(`Init PROMISE -> asyncId: ${asyncId}, trigger: ${triggerAsyncId}`);
        }
    }
});

// Enable the hook so it starts listening to async events
hook.enable();

// Create a resolved Promise to trigger async activity
Promise.resolve().then(() => {
    console.log('Promise executed');
});

// Create a timeout to trigger another async resource
setTimeout(() => {
    console.log('Timeout executed');
}, 100);
