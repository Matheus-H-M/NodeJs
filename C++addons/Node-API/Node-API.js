#include <node_api.h>  // Node-API (N-API) header
#include <assert.h>    // Standard C assertion library

// Native function that adds two numbers passed from JavaScript
napi_value Sum(napi_env env, napi_callback_info info) {
    // Number of expected arguments
    size_t argc = 2;

    // Array that will store the JavaScript arguments
    napi_value args[2];

    // Retrieve callback information and arguments
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    // Variables to store converted C++ values
    double a, b;

    // Convert the first JavaScript argument to a C++ double
    napi_get_value_double(env, args[0], &a);

    // Convert the second JavaScript argument to a C++ double
    napi_get_value_double(env, args[1], &b);

    // Variable that will hold the JavaScript return value
    napi_value result;

    // Create a JavaScript Number containing the sum
    napi_create_double(env, a + b, &result);

    // Return the result back to JavaScript
    return result;
}

// Module initialization function
napi_value Init(napi_env env, napi_value exports) {
    // Variable that will hold the JavaScript function
    napi_value fn;

    // Create a JavaScript function named "sum"
    napi_create_function(
        env,               // Node-API environment
        "sum",             // Function name visible in JavaScript
        NAPI_AUTO_LENGTH,  // Automatically determine string length
        Sum,               // Native callback function
        nullptr,           // Optional user data (none)
        &fn                // Output JavaScript function
    );

    // Export the function as "sum"
    napi_set_named_property(env, exports, "sum", fn);

    // Return the exports object
    return exports;
}

// Register the module with Node.js
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)