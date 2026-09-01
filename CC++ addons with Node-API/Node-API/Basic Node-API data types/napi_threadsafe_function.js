// Include the Node-API header.
// This provides the N-API types and functions used to communicate
// between native C/C++ code and JavaScript.
#include <node_api.h>

// Include the C++ thread library.
// This allows us to create a native worker thread.
#include <thread>


// Global handle representing the JavaScript function that can safely
// be called from another native thread.
//
// napi_threadsafe_function allows a native thread to send data back
// to JavaScript without directly accessing the JavaScript environment
// from the worker thread.
napi_threadsafe_function toFontString;


// This function runs on a native C++ thread.
//
// The worker cannot directly call JavaScript. Instead, it sends data
// to the JavaScript thread through napi_call_threadsafe_function().
void Worker()
{
    // Simulate some work by sending five values to JavaScript.
    for (int i = 0; i < 5; i++) {

        // Allocate an integer on the heap.
        //
        // We use dynamic memory because the worker thread needs to
        // pass this data to the JavaScript callback asynchronously.
        int* value = new int(i);


        // Send the value to the thread-safe function queue.
        //
        // napi_tsfn_nonblocking means that this call should not block
        // the worker thread if the queue is full.
        napi_call_threadsafe_function(
            toFontString,
            value,
            napi_tsfn_nonblocking
        );
    }


    // Release our reference to the thread-safe function.
    //
    // napi_tsfn_release tells Node.js that this thread is finished
    // using the thread-safe function.
    napi_release_threadsafe_function(
        toFontString,
        napi_tsfn_release
    );
}


// This function is executed by Node.js when data sent from the worker
// thread is ready to be delivered to JavaScript.
//
// IMPORTANT:
// This callback runs in the JavaScript/Node.js environment, so it is
// safe to use N-API functions that interact with JavaScript.
void CallJS(
    napi_env env,             // Current Node.js environment.
    napi_value js_callback,   // The JavaScript function provided by the user.
    void* context,            // Optional user-defined context.
    void* data                // Data sent by the worker thread.
)
{
    // Convert the generic void* pointer back into an integer pointer
    // and read the value sent by the worker.
    int value = *(int*)data;


    // Free the memory allocated with new in Worker().
    //
    // This prevents a memory leak.
    delete (int*)data;


    // Create a JavaScript Number/Integer value from the C++ integer.
    napi_value arg;

    napi_create_int32(
        env,
        value,
        &arg
    );


    // Call the JavaScript callback.
    //
    // The callback receives one argument: the integer created above.
    napi_call_function(
        env,
        nullptr,       // JavaScript 'this' value.
        js_callback,   // JavaScript callback function.
        1,             // Number of arguments.
        &arg,           // Array containing the argument.
        nullptr        // Optional return value.
    );
}


// This function is exposed to JavaScript as "start".
//
// JavaScript can call:
//
//     addon.start(callback)
//
// The function creates the thread-safe function and starts the
// native worker thread.
napi_value startTransition(
    napi_env env,
    napi_callback_info info
)
{
    // This will store the JavaScript callback passed to addon.start().
    napi_value callback;


    // We expect one argument: the JavaScript callback.
    size_t argc = 1;


    // Get the arguments passed from JavaScript.
    //
    // callback will contain the first argument passed to start().
    napi_get_cb_info(
        env,
        info,
        &argc,
        &callback,
        nullptr,
        nullptr
    );


    // Create a name for the asynchronous resource.
    //
    // This name can be useful for debugging and diagnostic tools.
    napi_value resource_name;

    napi_create_string_utf8(
        env,
        "Worker",
        NAPI_AUTO_LENGTH,
        &resource_name
    );


    // Create the thread-safe function.
    //
    // This connects the native worker thread with the JavaScript
    // callback.
    napi_create_threadsafe_function(
        env,

        // The JavaScript function that should eventually be called.
        callback,

        // Optional async_resource object.
        nullptr,

        // Name of the async resource.
        resource_name,

        // Maximum size of the queue.
        // 0 means an unlimited queue.
        0,

        // Initial thread count.
        1,

        // Optional finalizer data.
        nullptr,

        // Optional finalizer callback.
        nullptr,

        // Optional context passed to CallJS().
        nullptr,

        // Function Node.js calls when data arrives from the worker.
        CallJS,

        // Output: receives the created thread-safe function.
        &toFontString
    );


    // Start the native worker thread.
    //
    // detach() allows the worker to run independently from the
    // JavaScript function that created it.
    std::thread(Worker).detach();


    // Return undefined to JavaScript.
    return nullptr;
}


// Initialize the native addon.
//
// Node.js calls this function when the .node addon is loaded.
napi_value Init(
    napi_env env,
    napi_value exports
)
{
    // This will hold the JavaScript function "start".
    napi_value start;


    // Create a JavaScript function that points to our native
    // startTransition() function.
    napi_create_function(
        env,
        "start",
        NAPI_AUTO_LENGTH,
        startTransition,
        nullptr,
        &start
    );


    // Add the function to module.exports.
    //
    // JavaScript will therefore be able to do:
    //
    //     const addon = require("./addon.node");
    //     addon.start(...);
    napi_set_named_property(
        env,
        exports,
        "start",
        start
    );


    // Return the exported object.
    return exports;
}


// Register the Init() function as the entry point of the Node.js addon...
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
