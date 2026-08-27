// Include the Node.js Node-API header.
// This provides the types and functions needed to create a native Node.js addon.
#include <node_api.h>

// This function will be exposed to JavaScript.
// `env` represents the current Node.js environment.
// `info` contains information about the JavaScript function call.
napi_value exemplo(napi_env env, napi_callback_info info) {

    // This variable will store the JavaScript string value.
    napi_value resultado;

    // Call the Node-API function that creates a UTF-8 JavaScript string.
    // The returned `napi_status` tells us whether the operation succeeded.
    napi_status status = napi_create_string_utf8(
        env,                  // Current Node.js environment.
        "Hello, Node.js!",    // UTF-8 string to create.
        NAPI_AUTO_LENGTH,     // Automatically calculate the string length.
        &resultado            // Store the created JavaScript value here.
    );

    // Check whether the Node-API operation failed.
    if (status != napi_ok) {

        // Pointer to additional information about the last N-API error.
        const napi_extended_error_info* error_info;

        // Get detailed information about the last N-API error.
        napi_get_last_error_info(env, &error_info);

        // Throw a JavaScript error using the error message provided by N-API.
        napi_throw_error(
            env,                       // Current Node.js environment.
            NULL,                      // No custom error code.
            error_info->error_message   // Detailed error message.
        );

        // Return NULL because the operation failed.
        return NULL;
    }

    // Return the JavaScript string to the JavaScript caller.
    return resultado;
}


// This function initializes the native addon.
// It is called by Node.js when the addon is loaded.
napi_value init(napi_env env, napi_value exports) {

    // This variable will hold the JavaScript function.
    napi_value fn;

    // Create a JavaScript function that calls the native `exemplo` function.
    napi_create_function(
        env,                  // Current Node.js environment.
        "exemplo",            // Name of the JavaScript function.
        NAPI_AUTO_LENGTH,     // Automatically calculate the function name length.
        exemplo,              // Native C function to execute.
        NULL,                 // Optional user-provided data.
        &fn                   // Store the created JavaScript function here.
    );

    // Add the function to the addon exports object.
    // JavaScript will be able to call it as `addon.exemplo()`.
    napi_set_named_property(
        env,                  // Current Node.js environment.
        exports,              // The module's exports object.
        "exemplo",            // Property name visible to JavaScript.
        fn                    // Function assigned to that property.
    );

    // Return the exports object.
    return exports;
}


// Define the entry point of the Node.js native addon.
// Node.js will call `init` when the addon is loaded.
NAPI_MODULE(NODE_GYP_MODULE_NAME, init)
