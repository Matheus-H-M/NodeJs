#include <node_api.h>

// Callback function that retrieves a JavaScript value from a reference
napi_value GetReferenceValue(napi_env env, napi_callback_info info) {
    // Declare variables for the API status and JavaScript values
    napi_status status;
    napi_value result;
    napi_value message;

    // Create a JavaScript string
    status = napi_create_string_utf8(
        env,
        "Hello from Node.js!",
        NAPI_AUTO_LENGTH,
        &message
    );

    // Return NULL if string creation fails
    if (status != napi_ok) {
        return NULL;
    }

    // Declare a reference to the JavaScript value
    napi_ref ref;

    // Create a strong reference to the string
    status = napi_create_reference(env, message, 1, &ref);

    // Return NULL if reference creation fails
    if (status != napi_ok) {
        return NULL;
    }

    // Retrieve the JavaScript value associated with the reference
    status = napi_get_reference_value(env, ref, &result);

    // Delete the reference if retrieving the value fails
    if (status != napi_ok) {
        napi_delete_reference(env, ref);
        return NULL;
    }

    // Delete the reference after retrieving the value
    napi_delete_reference(env, ref);

    // Return the retrieved JavaScript value
    return result;
}

// Initialize the native module and define its exported functions
static napi_value Init(napi_env env, napi_value exports) {
    // Declare a variable for the JavaScript function
    napi_value fn;

    // Create a JavaScript function named getReferenceValue
    napi_create_function(
        env,
        "getReferenceValue",
        NAPI_AUTO_LENGTH,
        GetReferenceValue,
        NULL,
        &fn
    );

    // Export the function so it can be called from JavaScript
    napi_set_named_property(env, exports, "getReferenceValue", fn);

    // Return the module exports
    return exports;
}

// Register the module initialization function with Node.js
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)