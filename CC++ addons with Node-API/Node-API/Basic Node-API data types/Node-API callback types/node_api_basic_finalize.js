#include <node_api.h>
#include <stdlib.h>
#include <stdio.h>

// Structure used to store data owned by the native addon.
//
// This data will be associated with a JavaScript object.
// When the JavaScript object is garbage-collected,
// the finalize_callback function will be called so we can
// release this native memory.
typedef struct {
    int valueOrDefault;
} MyData;


// Finalizer callback.
//
// This function is called when the JavaScript object associated
// with the external native data is garbage-collected.
//
// IMPORTANT:
// At this point, JavaScript execution may not be available.
// Therefore, only Node-API functions that accept
// node_api_basic_env should be used here.
void finalize_callback(
    node_api_basic_env env,
    void* finalize_data,
    void* finalize_hint
) {
    // Convert the generic void pointer back to our MyData structure.
    MyData* data = (MyData*)finalize_data;

    // Print a message showing that the native data is being released.
    printf(
        "Garbage Collector: freeing MyData (%d)\n",
        data->valueOrDefault
    );

    // Release the memory that was allocated with malloc().
    free(data);

    // finalize_hint is not used in this example.
    // env is also not used because we are only freeing native memory.
}


// Function exposed to JavaScript.
//
// JavaScript will be able to call:
//
//     addon.createObject()
//
// This function creates a JavaScript object and associates
// native data with that object.
napi_value create_object(
    napi_env env,
    napi_callback_info info
) {
    // Variable that will hold the JavaScript object.
    napi_value object;

    // Create a new empty JavaScript object.
    napi_create_object(env, &object);


    // Allocate native memory for our MyData structure.
    //
    // malloc() allocates memory outside of the JavaScript heap.
    MyData* data = (MyData*)malloc(sizeof(MyData));

    // Store a value inside our native structure.
    data->valueOrDefault = 123;


    // Associate the native data with the JavaScript object.
    //
    // When the JavaScript object becomes unreachable and is
    // garbage-collected, Node.js can call finalize_callback().
    napi_status status = napi_wrap(
        env,                 // Current Node.js environment.
        object,              // JavaScript object.
        data,                // Native data associated with the object.
        finalize_callback,   // Function called during cleanup.
        NULL,                // Optional finalize hint.
        NULL                 // Optional reference.
    );


    // Check whether napi_wrap() was successful.
    if (status != napi_ok) {

        // If wrapping failed, we must manually free the memory
        // because the finalizer will never be called.
        free(data);

        // Throw a JavaScript error.
        napi_throw_error(
            env,
            NULL,
            "Could not associate native memory with the object"
        );

        // Return NULL because the operation failed.
        return NULL;
    }


    // Return the JavaScript object to the caller.
    return object;
}


// Module initialization function.
//
// This function is called when Node.js loads the native addon.
// It adds our createObject() function to the module exports.
napi_value Init(
    napi_env env,
    napi_value exports
) {
    // This will hold the JavaScript function.
    napi_value fn;


    // Create a JavaScript function named "createObject".
    //
    // When JavaScript calls createObject(),
    // Node.js will execute the native create_object() function.
    napi_create_function(
        env,
        "createObject",
        NAPI_AUTO_LENGTH,
        create_object,
        NULL,
        &fn
    );


    // Add the function to module.exports.
    //
    // JavaScript can then use:
    //
    //     const addon = require("./build/Release/addon");
    //     addon.createObject();
    napi_set_named_property(
        env,
        exports,
        "createObject",
        fn
    );


    // Return the module exports object.
    return exports;
}


// Register the native addon with Node.js.
//
// "Init" is the initialization function that Node.js will call
// when the addon is loaded.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
