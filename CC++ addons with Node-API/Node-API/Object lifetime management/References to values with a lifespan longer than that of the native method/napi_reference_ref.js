
#include <node_api.h>
#include <stdint.h>

// Increment the reference count of a JavaScript object.
napi_value IncrementReference(napi_env env, napi_callback_info info) {
    napi_status status;

    // Create a JavaScript object.
    napi_value object;
    status = napi_create_object(env, &object);

    if (status != napi_ok) {
        napi_throw_error(env, nullptr, "Failed to create object");
        return nullptr;
    }

    // Create a strong reference with an initial reference count of 1.
    napi_ref reference;
    status = napi_create_reference(env, object, 1, &reference);

    if (status != napi_ok) {
        napi_throw_error(env, nullptr, "Failed to create reference");
        return nullptr;
    }

    // Increment the reference count and retrieve the new count.
    uint32_t result = 0;
    status = napi_reference_ref(env, reference, &result);

    if (status != napi_ok) {
        napi_delete_reference(env, reference);
        napi_throw_error(
            env,
            nullptr,
            "Failed to increment reference count"
        );
        return nullptr;
    }

    // Convert the reference count to a JavaScript number.
    napi_value returnValue;
    status = napi_create_uint32(env, result, &returnValue);

    // Delete the native reference.
    napi_delete_reference(env, reference);

    if (status != napi_ok) {
        napi_throw_error(env, nullptr, "Failed to create result");
        return nullptr;
    }

    // Return the new reference count to JavaScript.
    return returnValue;
}

// Register the native function and expose it to JavaScript.
napi_value Init(napi_env env, napi_value exports) {
    napi_value function;

    napi_status status = napi_create_function(
        env,
        "incrementReference",
        NAPI_AUTO_LENGTH,
        IncrementReference,
        nullptr,
        &function
    );

    if (status != napi_ok) {
        napi_throw_error(env, nullptr, "Failed to create function");
        return nullptr;
    }

    status = napi_set_named_property(
        env,
        exports,
        "incrementReference",
        function
    );

    if (status != napi_ok) {
        napi_throw_error(env, nullptr, "Failed to export function");
        return nullptr;
    }

    return exports;
}

// Define the module entry point.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)