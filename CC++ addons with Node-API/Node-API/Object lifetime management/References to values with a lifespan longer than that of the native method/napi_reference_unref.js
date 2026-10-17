#include <node_api.h>
#include <stdint.h>

// JavaScript callback that demonstrates napi_reference_unref.
napi_value Example(napi_env env, napi_callback_info info) {
    napi_value object;
    napi_ref reference;
    uint32_t result;

    // Create a JavaScript object.
    napi_create_object(env, &object);

    // Create a reference with an initial reference count of 1.
    napi_create_reference(env, object, 1, &reference);

    // Decrement the reference count and retrieve the new count.
    napi_status status = napi_reference_unref(
        env,
        reference,
        &result
    );

    napi_value output;

    // Return the new reference count if the operation succeeds.
    if (status == napi_ok) {
        napi_create_uint32(env, result, &output);
    } else {
        // Return undefined if the operation fails.
        napi_get_undefined(env, &output);
    }

    // Delete the native reference.
    napi_delete_reference(env, reference);

    // Return the result to JavaScript.
    return output;
}

// Initialize the native module and export the Example function.
napi_value Init(napi_env env, napi_value exports) {
    napi_value function;

    // Create a JavaScript function named "example".
    napi_create_function(
        env,
        "example",
        NAPI_AUTO_LENGTH,
        Example,
        nullptr,
        &function
    );

    // Add the function to the module exports.
    napi_set_named_property(env, exports, "example", function);

    // Return the initialized exports object.
    return exports;
}

// Register the module initialization function.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)