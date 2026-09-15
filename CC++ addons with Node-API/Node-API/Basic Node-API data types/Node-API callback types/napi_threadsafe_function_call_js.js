// addon.cc

// Node-API header.
// Provides the C API used to create native Node.js addons.
#include <node_api.h>

// Provides std::thread for creating a secondary/native thread.
#include <thread>

// Provides std::chrono for time-related utilities.
#include <chrono>

// Provides general-purpose C standard library utilities.
#include <cstdlib>


// Structure used to store data that will be sent
// from the worker thread to the JavaScript thread.
struct Data {
  int value;
};


// This callback is executed by Node.js on the main JavaScript thread.
//
// Its purpose is to take data produced by a secondary thread,
// convert that native data into JavaScript values, and call
// the JavaScript callback function.
//
// Signature required by napi_threadsafe_function_call_js:
//
// napi_env env
//   The Node-API environment used to interact with JavaScript.
//
// napi_value js_callback
//   The JavaScript function that should be called.
//
// void* context
//   Optional context data provided when the thread-safe function
//   was created.
//
// void* data
//   Data sent from the worker/secondary thread.
void CallJs(napi_env env,
            napi_value js_callback,
            void* context,
            void* data) {

  // Convert the generic void* pointer back into our Data structure.
  //
  // The worker thread created this object using new,
  // so this callback is responsible for deleting it.
  Data* item = static_cast<Data*>(data);


  // During thread-safe function teardown, Node-API can call this
  // callback with env == nullptr and/or js_callback == nullptr.
  //
  // In that situation, JavaScript cannot be called.
  // We only need to release the native data.
  if (env == nullptr || js_callback == nullptr) {
    delete item;
    return;
  }


  // Create a JavaScript number from the native C++ integer.
  //
  // item->value is a C++ int.
  // napi_create_int32() converts it into a JavaScript Number value.
  napi_value value;

  napi_create_int32(
    env,
    item->value,
    &value
  );


  // Get the JavaScript 'undefined' value.
  //
  // This will be used as the 'this' value when calling
  // the JavaScript callback.
  napi_value undefined;

  napi_get_undefined(
    env,
    &undefined
  );


  // This will receive the return value of the JavaScript function.
  //
  // We do not use the return value in this example,
  // but napi_call_function() requires a location for it.
  napi_value result;


  // Call the JavaScript callback.
  //
  // The arguments are:
  //
  // env          -> current Node-API environment
  // undefined    -> value used as JavaScript 'this'
  // js_callback  -> JavaScript function to call
  // 1            -> number of arguments
  // &value       -> pointer to the argument
  // &result      -> receives the JavaScript return value
  napi_call_function(
    env,
    undefined,
    js_callback,
    1,
    &value,
    &result
  );


  // The Data object was allocated by the worker thread
  // and is no longer needed after the JavaScript callback
  // has received its value.
  //
  // Therefore, we must free the native memory.
  delete item;
}


// Global thread-safe function handle.
//
// This handle allows secondary/native threads to safely send
// data to the JavaScript thread.
napi_threadsafe_function tsfn;


// Worker function.
//
// This function runs on a secondary/native thread,
// not on the main JavaScript thread.
void Worker() {

  // Produce 10 values: 1 through 10.
  for (int i = 1; i <= 10; i++) {

    // Allocate a Data object on the heap.
    //
    // The object must remain alive until Node.js processes
    // the item on the JavaScript thread.
    Data* data = new Data();


    // Store the value produced by this worker thread.
    data->value = i;


    // Send the data to the thread-safe function queue.
    //
    // IMPORTANT:
    // This does NOT call JavaScript directly.
    //
    // Instead, Node.js places the data into an internal queue.
    // Later, on the main JavaScript thread, Node.js invokes
    // the CallJs() callback.
    //
    // napi_tsfn_nonblocking means the worker thread will not
    // wait if the queue is full.
    napi_call_threadsafe_function(
      tsfn,
      data,
      napi_tsfn_nonblocking