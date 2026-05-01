const { AsyncResource } = require('async_hooks');

// Create a custom asynchronous resource
class MyAsyncResource extends AsyncResource {
  constructor() {
    // Initialize the resource with a type name
    super('MY_ASYNC_RESOURCE');
  }

  execute(callback) {
    // Run the callback within this async resource's scope
    this.runInAsyncScope(callback);
  }
}

// Instantiate the resource
const resource = new MyAsyncResource();

// Get the unique asyncId assigned to this resource
const id = resource.asyncId();

console.log('Async ID:', id);

// Use the resource to execute a function
resource.execute(() => {
  console.log('Running inside resource with asyncId:', resource.asyncId());
});