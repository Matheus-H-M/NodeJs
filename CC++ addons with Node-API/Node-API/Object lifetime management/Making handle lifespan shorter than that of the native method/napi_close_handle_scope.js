#include <node_api.h>

// This function is called when the JavaScript function "example" is invoked.
napi_value Example(napi_env env, napi_callback_info info) {

    // Declare a handle scope.
    napi_handle_scope scope;

    // Create a new handle scope.
    // All napi_values created inside this scope belong to it.
    napi_open_handle_scope(env, &scope);

    // Declare a napi_value that will hold our string.
    napi_value message;

    // Create a JavaScript string.
    // The string is created inside the current handle scope.
    napi_create_string_utf8(
        env,
        "Hello, Node.js!",
        NAPI_AUTO_LENGTH,
        &message
    );

    // Close the handle scope.
    // The scope must be closed after all operations using it are completed.
    napi_close_handle_scope(env, scope);

    // Return the JavaScript string to the caller.
    return message;
}

// This function initializes the Node.js addon.
napi_value Init(napi_env env, napi_value exports) {

    // Describe the JavaScript function that will be exported.
    napi_property_descriptor desc = {
        "example",      // Name of the function in JavaScript.
        nullptr,        // No getter function.
        Example,        // Native C/C++ function to call.
        nullptr,        // No setter function.
        nullptr,        // No value.
        nullptr,        // No data pointer.
        napi_default,   // Default property attributes.
        nullptr         // No additional data.
    };

    // Add the "example" function to the module exports.
    napi_define_properties(env, exports, 1, &desc);

    // Return the exports object.
    return exports;
}

// Register the addon initialization function with Node.js.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
