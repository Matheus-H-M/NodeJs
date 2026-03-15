// Import AsyncResource from the async_hooks module
// async_hooks is used to track asynchronous resources in Node.js
const { AsyncResource } = require("async_hooks");

// Create a custom class that extends AsyncResource
// This allows us to manually control async context tracking
class MyAsyncResource extends AsyncResource {

    // Constructor runs when a new instance is created
    constructor(){
        // Call the parent constructor
        // The string is the type/name of this async resource
        super("MY_ASYNCRESOURCE");
    }

    // Method that runs a task using this async resource
    runTask(callback){

        // Bind the callback function to this AsyncResource's context
        // This ensures the function executes within this async scope
        const boundCallback = this.bind(callback);

        // Simulate an asynchronous operation using setTimeout
        setTimeout(() => {

            // Execute the bound callback
            // Even though setTimeout creates a different async context,
            // bind() ensures the callback still runs in this AsyncResource context
            boundCallback("Running inside the AsyncResource context");

        }, 100);
    }
}

// Create an instance of our custom AsyncResource
const resource = new MyAsyncResource();

// Define a function that will be executed later
// This function receives a message and prints it
function minhaFuncao(msg){
    console.log(msg);
}

// Run the asynchronous task and pass the function as callback
resource.runTask(minhaFuncao);