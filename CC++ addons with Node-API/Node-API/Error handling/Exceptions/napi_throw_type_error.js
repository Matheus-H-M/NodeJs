#include <node_api.h>

// This function is exposed to JavaScript through Node.js N-API.
napi_value exemplo(napi_env env, napi_callback_info info) {
    // Throw a JavaScript TypeError.
    //
    // The first argument is the N-API environment.
    // The second argument is an optional error code.
    // The third argument is the error message.
    napi_throw_type_error(
        env,
        "ERR_TIPO_INVALIDO",
        "O valor precisa ser uma string."
    );

    // Return NULL because an exception was thrown.
    // JavaScript will receive the TypeError instead.
    return NULL;
}
