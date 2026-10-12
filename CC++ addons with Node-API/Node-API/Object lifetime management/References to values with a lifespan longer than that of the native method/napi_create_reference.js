#include <node_api.h>

napi_value CreateReference(napi_env env, napi_callback_info info) {
    napi_value object;
    napi_value result;
    napi_ref reference;

    // Create a new JavaScript object
    napi_create_object(env, &object);

    // Create a reference with an initial reference count of 1
    napi_status status = napi_create_reference(
        env,
        object,
        1,
        &reference
    );

    // Check whether the reference was created successfully
    if (status != napi_ok) {
        napi_throw_error(env, nullptr, "Failed to create reference");
        return nullptr;
    }

    // Retrieve the JavaScript value associated with the reference
    napi_get_reference_value(env, reference, &result);

    // Return the referenced JavaScript object
    return result;
}

napi_value Init(napi_env env, napi_value exports) {
    napi_value function;

    // Create a JavaScript function named "createReference"
    napi_create_function(
        env,
        "createReference",
        NAPI_AUTO_LENGTH,
        CreateReference,
        nullptr,
        &function
    );

    // Export the function so it can be called from JavaScript
    napi_set_named_property(env, exports, "createReference", function);

    return exports;
}

// Register the native module
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)