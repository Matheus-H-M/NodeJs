// async-local-example.js

// Import AsyncLocalStorage from the async_hooks module
const { AsyncLocalStorage } = require('async_hooks');

// Create a new AsyncLocalStorage instance with options
const asyncLocal = new AsyncLocalStorage({
  // Default value used when no context store is active
  defaultValue: { requestId: 'NO_CONTEXT' },

  // Optional name for debugging/identification purposes
  name: 'MyAsyncContext'
});

// Function that simulates an asynchronous operation
function asyncOperation() {
  setTimeout(() => {
    // Retrieve the current store (context data)
    const store = asyncLocal.getStore();

    // Log the store available inside this async callback
    console.log('Inside setTimeout:', store);
  }, 100);
}

// -------------------------
// 1️⃣ Using run()
// -------------------------

// run() creates a new async context for the duration of the callback
asyncLocal.run({ requestId: 'REQ-123' }, () => {

  // Access the store inside the run context
  console.log('Inside run():', asyncLocal.getStore());

  // Call an async function that will preserve this context
  asyncOperation();
});

// -------------------------
// 2️⃣ Using enterWith()
// -------------------------

setTimeout(() => {

  // enterWith() sets the current execution context
  // without wrapping it in a callback like run()
  asyncLocal.enterWith({ requestId: 'REQ-456' });

  // Access the store after setting it with enterWith()
  console.log('After enterWith():', asyncLocal.getStore());

  // Async operation will now use this context
  asyncOperation();

}, 300);

// -------------------------
// 3️⃣ Using AsyncLocalStorage.bind()
// -------------------------

setTimeout(() => {

  // Create a new context using run()
  asyncLocal.run({ requestId: 'REQ-789' }, () => {

    function myFunction() {
      // This function will later access the captured context
      console.log('Bound function:', asyncLocal.getStore());
    }

    // Capture the current execution context
    // and bind it to myFunction
    const boundFunction = AsyncLocalStorage.bind(myFunction);

    // Execute later while preserving the original context
    setTimeout(boundFunction, 100);
  });

}, 600);

// -------------------------
// 4️⃣ Testing defaultValue
// -------------------------

setTimeout(() => {

  // Outside of any run() or enterWith() context
  // getStore() will return the defaultValue
  console.log('Outside any context:', asyncLocal.getStore());

}, 1000);