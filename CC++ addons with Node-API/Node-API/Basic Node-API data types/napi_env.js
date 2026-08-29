#include <node_api.h>

// Native function exposed to JavaScript.
// The napi_env parameter represents the current Node.js environment.
// The napi_callback_info parameter contains information about the call,
// such as arguments passed from JavaScript.
napi_value Hello(napi_env env, napi_callback_info info) {

    // This will hold the JavaScript string value that we want to return.
    napi_value result;

    // Create a JavaScript string using the current napi_env.
    // The same env received by this native function is passed to
    // the Node-API function.
    napi_status status = napi_create_string_utf8(
        env,
        "Hello from native code!",
        NAPI_AUTO_LENGTH,
        &result
    );

    // Check whether the Node-API call was successful.
    if (status != napi_ok) {

        // Throw a JavaScript error if creating the string failed.
        // The same napi_env is used here as well.
        napi_throw_error(
            env,
            nullptr,
            "Failed to create the string"
        );

        // Return nullptr because an error occurred.
        return nullptr;
    }

    // Return the JavaScript string to the caller.
    return result;
}

// Initializes the native addon.
// Node.js calls this function when the addon is loaded.
napi_value Init(napi_env env, napi_value exports) {

    // This will hold the JavaScript function that we create.
    napi_value fn;

    // Create a JavaScript function named "hello".
    // The function will call our native Hello function when invoked.
    napi_create_function(
        env,
        "hello",
        NAPI_AUTO_LENGTH,
        Hello,
        nullptr,
        &fn
    );

    // Add the "hello" function to the module's exports object.
    // This makes it accessible from JavaScript as addon.hello().
    napi_set_named_property(
        env,
        exports,
        "hello",
        fn
    );

    // Return the exports object.
    return exports;
}

// Register the Init function as the entry point of the Node.js addon.
// Node.js calls Init when this native addon is loaded.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
