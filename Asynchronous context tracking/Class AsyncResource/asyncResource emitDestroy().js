// Import AsyncResource from the async_hooks module
const { AsyncResource } = require('async_hooks');

// Create a custom async resource class
class MinhaTarefaAsync extends AsyncResource {

    // Constructor initializes the async resource
    constructor() {
        // Call the parent constructor with a resource name
        super('MinhaTarefaAsync');
    }

    // Method to execute an asynchronous task
    executar(callback) {

        // Simulate an async operation using setTimeout
        setTimeout(() => {

            // Run the callback inside the async resource scope
            this.runInAsyncScope(callback);

            // Manually trigger destroy hooks for this resource
            // IMPORTANT: This must be called only once
            this.emitDestroy();

        }, 1000); // Delay of 1 second
    }
}

// Create an instance of the custom async resource
const tarefa = new MinhaTarefaAsync();

// Execute the async task and pass a callback function
tarefa.executar(() => {
    // This will run after the async operation completes
    console.log('Tarefa concluída!'); // "Task completed!"
});
