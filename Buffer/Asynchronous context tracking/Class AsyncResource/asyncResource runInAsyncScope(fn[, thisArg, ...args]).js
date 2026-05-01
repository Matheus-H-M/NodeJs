// Import the async_hooks module from Node.js
const async_hooks = require('async_hooks');

// Extract the AsyncResource class from async_hooks
// AsyncResource allows us to create our own async resources
const { AsyncResource } = async_hooks;

// Create a custom async resource class
class MyAsyncTask extends AsyncResource {

    // Constructor runs when a new instance is created
    constructor() {
        // Call the parent constructor and define the resource type
        // This name will appear in async hooks (init event)
        super('MY_ASYNC_TASK');
    }

    // Method that executes a function inside this async resource context
    runTask(fn) {
        // runInAsyncScope executes the function inside the async resource
        // Parameters:
        // fn -> function to execute
        // null -> thisArg (the "this" value inside the function)
        // "Olá", "Node.js" -> arguments passed to the function
        this.runInAsyncScope(fn, null, "Olá", "Node.js");
    }
}

// Create an async hook to observe lifecycle events of async resources
const hook = async_hooks.createHook({

    // Called when a new async resource is initialized
    init(asyncId, type, triggerAsyncId) {
        console.log(`init: id=${asyncId} type=${type} trigger=${triggerAsyncId}`);
    },

    // Called right before the async resource callback runs
    before(asyncId) {
        console.log(`before: ${asyncId}`);
    },

    // Called right after the async resource callback finishes
    after(asyncId) {
        console.log(`after: ${asyncId}`);
    },

    // Called when the async resource is destroyed
    destroy(asyncId) {
        console.log(`destroy: ${asyncId}`);
    }
});

// Enable the async hook so it starts listening to events
hook.enable();

// Create an instance of the custom async task
const task = new MyAsyncTask();

// Run a function inside the async resource context
task.runTask((msg1, msg2) => {

    // This function receives the arguments passed in runInAsyncScope
    console.log(`Executing function: ${msg1} ${msg2}`);

});