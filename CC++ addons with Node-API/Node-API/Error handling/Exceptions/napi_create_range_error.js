#include <node_api.h>

// Creates and returns a JavaScript RangeError.
napi_value createError(napi_env env, napi_callback_info info) {
    // Stores the error code associated with the error.
    napi_value code;

    // Stores the error message.
    napi_value msg;

    // Stores the RangeError created by N-API.
    napi_value result;

    // Creates a JavaScript string containing the error code.
    napi_create_string_utf8(
        env,
        "ERR_NUMERO_INVALIDO",
        NAPI_AUTO_LENGTH,
        &code
    );

    // Creates a JavaScript string containing the error message.
    napi_create_string_utf8(
        env,
        "El numero esta fuera del rango permitido",
        NAPI_AUTO_LENGTH,
        &msg
    );

    // Creates a JavaScript RangeError using the specified
    // error code and error message.
    napi_create_range_error(env, code, msg, &result);

    // Returns the created RangeError to JavaScript.
    return result;
}
