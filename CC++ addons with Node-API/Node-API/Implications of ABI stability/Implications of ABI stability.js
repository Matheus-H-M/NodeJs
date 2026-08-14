// Include the official Node-API header.
// Node-API provides an ABI-stable interface for creating native Node.js addons.
#include <node_api.h>


// This function will be called when JavaScript invokes `addon.hello()`.
napi_value hello(napi_env env, napi_callback_info info) {
    // This variable will store the JavaScript string that we create.
    napi_value result;

    // Create a JavaScript UTF-8 string using Node-API.
    //
    // `env` represents the current Node.js environment.
    // The second argument is the string we want to create.
    // `NAPI_AUTO_LENGTH` tells Node-API to calculate the string length.
    // `&result` receives the newly created JavaScript value.
    napi_status status =
        napi_create_string_utf8(
            env,
            "Hello using Node-API with stable ABI!",
            NAPI_AUTO_LENGTH,
            &result
        );

    // Check whether the Node-API operation succeeded.
    if (status != napi_ok) {
        // Return NULL if creating the string failed.
        return NULL;
    }

    // Return the JavaScript string to the caller.
    return result;
}


// This function initializes the native addon.
//
// It is called when Node.js loads the addon with `require()` or `import`.
napi_value init(napi_env env, napi_value exports) {
    // This will hold the JavaScript function created by Node-API.
    napi_value fn;

    // Create a JavaScript function named "hello".
    //
    // `hello` is the native C function that will be executed
    // when JavaScript calls `addon.hello()`.
    napi_status status =
        napi_create_function(
            env,
            "hello",
            NAPI_AUTO_LENGTH,
            hello,
            NULL,
            &fn
        );

    // Check whether creating the function succeeded.
    if (status != napi_ok) {
        // Return NULL if the operation failed.
        return NULL;
    }

    // Add the native function to the `exports` object.
    //
    // After this operation, JavaScript can access the function as:
    //
    //     addon.hello()
    //
    status =
        napi_set_named_property(
            env,
            exports,
            "hello",
            fn
        );

    // Check whether adding the function to `exports` succeeded.
    if (status != napi_ok) {
        // Return NULL if the operation failed.
        return NULL;
    }

    // Return the exported object to Node.js.
    return exports;
}


// Register the addon initialization function with Node.js.
//
// `NODE_GYP_MODULE_NAME` is provided by node-gyp during compilation.
// `init` is the function Node.js calls when loading this native addon.
NAPI_MODULE(NODE_GYP_MODULE_NAME, init)