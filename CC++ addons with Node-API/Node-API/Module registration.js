
#include <node_api.h>

// Defines the method that will be called from JavaScript.
napi_value Method(napi_env env, napi_callback_info info) {
    // Stores the JavaScript string returned by this method.
    napi_value result;

    // Creates a UTF-8 JavaScript string.
    napi_status status = napi_create_string_utf8(
        env,
        "Hello! Node-API module is working!",
        NAPI_AUTO_LENGTH,
        &result
    );

    // Checks whether the string creation was successful.
    if (status != napi_ok) {
        return NULL;
    }

    // Returns the created string to JavaScript.
    return result;
}

// Initializes the module and defines its exported properties.
napi_value Init(napi_env env, napi_value exports) {
    // Describes the JavaScript function to be exported.
    napi_property_descriptor desc = {
        "hello",        // Name of the exported JavaScript function.
        NULL,           // No explicit JavaScript value is provided.
        Method,         // Native C++ callback executed when hello() is called.
        NULL,           // No getter function.
        NULL,           // No setter function.
        NULL,           // No predefined value.
        napi_default,   // Uses the default property attributes.
        NULL            // No callback data.
    };

    // Adds the hello function to the module's exports object.
    napi_status status = napi_define_properties(
        env,
        exports,
        1,      // Number of properties being defined.
        &desc   // Pointer to the property descriptor.
    );

    // Stops initialization if defining the property fails.
    if (status != napi_ok) {
        return NULL;
    }

    // Returns the exports object to JavaScript.
    return exports;
}

// Registers the native Node-API module with Node.js.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
