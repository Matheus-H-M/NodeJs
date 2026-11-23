
#include <node_api.h>

// Function that creates a JavaScript number
napi_value CreateNumber(napi_env env, napi_callback_info info) {

    // Declare a variable to store the JavaScript value
    napi_value result;

    // Convert the C int32_t value (100) into a JavaScript Number
    napi_create_int32(env, 100, &result);

    // Return the created JavaScript number
    return result;
}
