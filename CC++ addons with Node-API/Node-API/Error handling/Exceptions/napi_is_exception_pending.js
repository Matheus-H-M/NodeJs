#include <node_api.h>

// Checks whether a JavaScript exception is currently pending.
napi_value CheckException(napi_env env, napi_callback_info info) {
    // Stores whether an exception is pending.
    bool pending = false;

    // Check the current N-API environment for a pending exception.
    napi_status status = napi_is_exception_pending(env, &pending);

    // If the API call itself failed, throw a JavaScript error.
    if (status != napi_ok) {
        napi_throw_error(env, nullptr, "Error checking for a pending exception");
        return nullptr;
    }

    // Convert the C++ boolean into a JavaScript boolean value.
    napi_value result;
    napi_get_boolean(env, pending, &result);

    // Return true if an exception is pending, otherwise false.
    return result;
}
