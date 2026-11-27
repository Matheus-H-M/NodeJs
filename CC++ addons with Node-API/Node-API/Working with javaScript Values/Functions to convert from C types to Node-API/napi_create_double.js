#include <node_api.h>

// Creates a JavaScript number from a C++ double.
napi_value CreateDouble(napi_env env, napi_callback_info info) {
    // Stores the resulting JavaScript value.
    napi_value result;

    // Converts the double value into a JavaScript Number.
    napi_create_double(env, 123.456, &result);

    // Returns the JavaScript number.
    return result;
}