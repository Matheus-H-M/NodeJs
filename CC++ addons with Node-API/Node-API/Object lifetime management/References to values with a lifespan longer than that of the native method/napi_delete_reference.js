#include <node_api.h>

// Callback function exposed to JavaScript.
// It creates a JavaScript object, creates a reference to it,
// deletes the reference, and returns a success message.
napi_value CreateReference(napi_env env, napi_callback_info info) {
    // Stores the status returned by N-API functions.
    napi_status status;

    // Represents the JavaScript object.
    napi_value object;

    // Represents the string returned to JavaScript.
    napi_value result;

    // Stores the reference to the JavaScript object.
    napi_ref reference;

    // Create a new JavaScript object.
    status = napi_create_object(env, &object);

    // Check whether the object was created successfully.
    if (status != napi_ok) {
        napi_throw_error(env, nullptr, "Failed to create object");
        return nullptr;
    }

    // Create a persistent reference to the object.
    // The initial reference count is 1.
    status = napi_create_reference(env, object, 1, &reference);

    // Check whether the reference was created successfully.
    if (status != napi_ok) {
        napi_throw_error(env, nullptr, "Failed to create reference");
        return nullptr;
    }

    // Delete the reference to the JavaScript object.
    status = napi_delete_reference(env, reference);

    // Check whether the reference was deleted successfully.
    if (status != napi_ok) {
        napi_throw_error(env, nullptr, "Failed to delete reference");
        return nullptr;
    }

    // Create a JavaScript string containing a success message.
    napi_create_string_utf8(
        env,
        "Reference deleted successfully!",
        NAPI_AUTO_LENGTH,
        &result
    );

    // Return the success message to JavaScript.
    return result;
}

// Initialize the native addon and define its exported functions.
napi_value Init(napi_env env, napi_value exports) {
    // Stores the JavaScript function.
    napi_value function;

    // Create a native function named "createReference".
    napi_create_function(
        env,
        "createReference",
        NAPI_AUTO_LENGTH,
        CreateReference,
        nullptr,
        &function
    );

    // Export the function so it can be called from JavaScript.
    napi_set_named_property(env, exports, "createReference", function);

    // Return the module exports.
    return exports;
}

// Register the initialization function for the native addon.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)