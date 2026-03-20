// Import the built-in EventEmitter class
const { EventEmitter } = require('events');

// Import AsyncResource to manage async execution context
const { AsyncResource } = require('async_hooks');

// Create a class that extends AsyncResource
class MyAsyncEmitter extends AsyncResource {
    constructor() {
        // Initialize AsyncResource with a custom type name
        super('MyAsyncEmitter');

        // Create an internal EventEmitter instance
        this.emitter = new EventEmitter();
    }

    // Method to register an event listener
    on(event, listener) {
        this.emitter.on(event, (...args) => {
            // Ensure the listener runs in the correct async context
            this.runInAsyncScope(listener, this, ...args);
        });
    }

    // Method to emit an event
    emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    // Cleanup method (important for async resource lifecycle)
    close() {
        this.emitDestroy();
    }
}

// Create an instance of the custom async emitter
const asyncEmitter = new MyAsyncEmitter();

// Function to simulate an asynchronous operation
function simulateAsyncOperation() {
    setTimeout(() => {
        // Emit a "data" event after a delay
        asyncEmitter.emit('data', 'Olá mundo!');
    }, 100);
}

// Register a listener for the "data" event
asyncEmitter.on('data', (msg) => {
    // Log the received message
    console.log('Received message:', msg);

    // Demonstrate that the async context is preserved
    console.log('Async context preserved correctly!');
});

// Run the async operation
simulateAsyncOperation();

// Close the async resource after some time
setTimeout(() => {
    asyncEmitter.close();
}, 500);