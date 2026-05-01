// Import Worker threads API to run code in parallel threads
const { Worker } = require('node:worker_threads');

// Import AsyncResource to properly track async execution context
const { AsyncResource } = require('node:async_hooks');

// Inline worker code (runs in another thread)
const workerCode = `
const { parentPort } = require('node:worker_threads');

// Listen for messages from the main thread
parentPort.on('message', (task) => {
  // Send back the result (sum of two numbers)
  parentPort.postMessage(task.a + task.b);
});
`;

// Custom async resource to track each task execution
class Task extends AsyncResource {
  constructor(cb) {
    // Name of this async resource
    super('Task');
    this.cb = cb; // Store callback
  }

  // Called when the task is finished
  done(err, result) {
    // Execute callback in correct async scope
    this.runInAsyncScope(this.cb, null, err, result);

    // Mark resource as destroyed (important for async tracking tools)
    this.emitDestroy();
  }
}

// Create a small pool of workers (2 threads)
const workers = Array.from({ length: 2 }, () =>
  new Worker(workerCode, { eval: true }) // eval allows inline code
);

let i = 0; // Used for round-robin worker selection

// Function to run a task using the worker pool
function runTask(task, cb) {
  // Pick a worker in round-robin fashion
  const w = workers[i++ % workers.length];

  // Wrap callback in AsyncResource
  const t = new Task(cb);

  // Listen for result from worker
  w.once('message', (result) => t.done(null, result));

  // Listen for errors
  w.once('error', (err) => t.done(err));

  // Send task to worker
  w.postMessage(task);
}

// Run 5 example tasks
for (let i = 0; i < 5; i++) {
  runTask({ a: 1, b: 2 }, (err, result) => {
    console.log(i, result);
  });
}