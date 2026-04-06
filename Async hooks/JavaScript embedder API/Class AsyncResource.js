// Import the AsyncResource class from Node.js async_hooks module
const { AsyncResource } = require('async_hooks');

// Create a custom async resource class
class MeuRecursoAsync extends AsyncResource {
    constructor() {
        // Call the parent constructor with a name for this async resource
        super('MeuRecursoAsync');
    }

    executar(callback) {
        // Execute the callback within the async context of this resource
        // This preserves async tracking (useful for debugging, tracing, etc.)
        this.runInAsyncScope(callback);
    }
}

// Create an instance of the custom async resource
const recurso = new MeuRecursoAsync();

// A simple function to be executed
function minhaFuncao() {
    // Log a message showing execution inside AsyncResource context
    console.log('Running inside AsyncResource context');
}

// Execute the function using the async resource
recurso.executar(minhaFuncao);

// Simulate an asynchronous operation with setTimeout
setTimeout(() => {
    // Execute another callback after the timeout
    recurso.executar(() => {
        // This still runs within the async resource context
        console.log('Running after timeout while preserving context');
    });
}, 1000);