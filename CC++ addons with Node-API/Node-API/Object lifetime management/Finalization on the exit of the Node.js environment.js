
#include <node_api.h>

// Callback function that returns a string to JavaScript
napi_value Method(napi_env env, napi_callback_info info) {
    napi_value result;

    // Create a UTF-8 JavaScript string
    napi_status status = napi_create_string_utf8(
        env,
        "Hello! Node-API module is working!",
        NAPI_AUTO_LENGTH,
        &result
    );

    // Check whether the string was created successfully
    if (status != napi_ok) {
        return nullptr;
    }

    // Return the string to JavaScript
    return result;
}

// Initialize the module and register its exported functions
napi_value Init(napi_env env, napi_value exports) {
    // Describe the function that will be exposed to JavaScript
    napi_property_descriptor desc = {
        "hello",        // Name of the exported function
        nullptr,        // No explicit JavaScript value
        Method,         // Native callback function
        nullptr,        // No getter
        nullptr,        // No setter
        nullptr,        // No property value
        napi_default,   // Default property attributes
        nullptr         // No callback data
    };

    // Define the hello property on the exports object
    napi_status status = napi_define_properties(
        env,
        exports,
        1,
        &desc
    );

    // Stop initialization if registering the property fails
    if (status != napi_ok) {
        return nullptr;
    }

    // Return the exports object to JavaScript
    return exports;
}

// Register the native addon with Node.js
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
