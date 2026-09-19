#include <node_api.h>

// This function throws a JavaScript value using the N-API.
napi_value throwError(napi_env env, napi_callback_info info) {
    // Variable that will hold the JavaScript value to be thrown.
    napi_value error;

    // Create a JavaScript string containing the error message.
    // The created string is stored in the 'error' variable.
    napi_create_string_utf8(
        env,
        "An error occurred!",
        NAPI_AUTO_LENGTH,
        &error
    );

    // Throw the JavaScript value created above.
    // This causes JavaScript execution to receive an exception.
    napi_throw(env, error);

    // Return nullptr because the function is throwing an exception.
    return nullptr;
}
