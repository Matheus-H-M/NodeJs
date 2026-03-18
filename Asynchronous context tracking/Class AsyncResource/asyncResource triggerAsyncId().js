// Import AsyncResource and executionAsyncId from the async_hooks module
const { AsyncResource, executionAsyncId } = require('async_hooks');

// Create a custom class that extends AsyncResource
class MeuRecursoAsync extends AsyncResource {

    // Constructor method
    constructor() {
        // Call the parent (AsyncResource) constructor
        // 'MEU_RECURSO' is the type/name of this async resource
        // triggerAsyncId is set to the current execution async ID
        super('MEU_RECURSO', {
            triggerAsyncId: executionAsyncId()
        });
    }

    // Method to display the trigger async ID
    mostrarTriggerId() {
        // Print the triggerAsyncId associated with this resource
        console.log('Trigger Async ID:', this.triggerAsyncId());
    }
}

// Create an instance of the custom async resource
const recurso = new MeuRecursoAsync();

// Call the method to display the trigger async ID
recurso.mostrarTriggerId();