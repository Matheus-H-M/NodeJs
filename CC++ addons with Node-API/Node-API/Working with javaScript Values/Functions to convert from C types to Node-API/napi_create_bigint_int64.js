#include <node_api.h>
#include <stdint.h>

// Creates a JavaScript BigInt from a 64-bit integer
napi_value CreateBigInt(napi_env env, napi_callback_info info) {
    napi_value result;

    // Define a 64-bit integer
    int64_t number = 9007199254740993LL;

    // Convert int64_t to JavaScript BigInt
    napi_create_bigint_int64(env, number, &result);

    return result;
}

// Initialize the Node.js native module
NAPI_MODULE_INIT() {
    napi_value function;

    // Create the JavaScript function
    napi_create_function(
        env, "createBigInt",
        NAPI_AUTO_LENGTH, CreateBigInt, NULL, &function
    );

    // Export the function
    napi_set_named_property(env, exports, "createBigInt", function);

    return exports;
}