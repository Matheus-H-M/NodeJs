#include <node_api.h>
#include <stdio.h>
#include <stdlib.h>

// A simple native data structure that will be
// associated with a JavaScript object.
struct Data {
    int value;
};

// Synchronous finalizer.
//
// `node_api_basic_env` is used here because this
// finalizer must only call Node-API functions that
// are safe to use without accessing the JavaScript
// engine state.
void basic_finalize(node_api_basic_env env, void* data, void* hint) {
    // Convert the generic void pointer back into
    // a pointer to our Data structure.
    Data* d = static_cast<Data*>(data);

    // Print the value stored in our native structure.
    printf("Finalizer executed. value = %d\n", d->value);

    // Release the memory that was allocated with malloc().
    free(d);

    // Do NOT call APIs here that access the JavaScript
    // engine state. This is a synchronous finalizer.
}

// This function is exposed to JavaScript as `createData()`.
//
// It creates a JavaScript object and attaches native
// C++ data to that object.
napi_value create_data(napi_env env, napi_callback_info info) {

    // Allocate memory for our native Data structure.
    Data* data = static_cast<Data*>(malloc(sizeof(Data)));

    // Store a value inside the native structure.
    data->value = 42;

    // This will hold the JavaScript object that
    // we are going to create.
    napi_value result;

    // Create an empty JavaScript object.
    napi_create_object(env, &result);

    // Associate the native `Data` pointer with
    // the JavaScript object.
    //
    // When the JavaScript object is garbage-collected,
    // `basic_finalize()` will be called automatically.
    napi_wrap(
        env,
        result,
        data,
        basic_finalize,
        nullptr,
        nullptr
    );

    // Return the JavaScript object to the caller.
    return result;
}

// Module initialization function.
//
// This function is called when Node.js loads
// the native addon.
napi_value Init(napi_env env, napi_value exports) {
    napi_value fn;

    // Create a JavaScript function named `createData`.
    //
    // When JavaScript calls createData(), the
    // native `create_data()` function will execute.
    napi_create_function(
        env,
        "createData",
        NAPI_AUTO_LENGTH,
        create_data,
        nullptr,
        &fn
    );

    // Add the `createData` function to the
    // module's exports object.
    //
    // JavaScript can then use:
    // const addon = require('./addon');
    // addon.createData();
    napi_set_named_property(
        env,
        exports,
        "createData",
        fn
    );

    // Return the exports object.
    return exports;
}

// Register the `Init` function as the initialization
// function for this Node.js native addon.
//
// NODE_GYP_MODULE_NAME is normally provided by node-gyp
// during compilation.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
