#include <node_api.h>
#include <stdint.h>

// Function that creates a JavaScript number
napi_value example(napi_env env, napi_callback_info info) {
    // Stores the resulting JavaScript value
    napi_value result;

    // Declares an unsigned 32-bit integer
    uint32_t number = 123;

    // Converts uint32_t into a JavaScript Number
    napi_create_uint32(env, number, &result);

    // Returns the converted value
    return result;
}