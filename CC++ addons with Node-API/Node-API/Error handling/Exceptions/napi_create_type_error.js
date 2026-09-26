#include <node_api.h>

// Creates a TypeError and throws it to the JavaScript environment.
napi_value MiFuncion(napi_env env, napi_callback_info info) {
    // Stores the error code, such as "ERR_TIPO_INVALIDO".
    napi_value code;

    // Stores the error message that will be shown to JavaScript.
    napi_value msg;

    // Stores the TypeError object created by napi_create_type_error().
    napi_value error;

    // Create a JavaScript string containing the error code.
    napi_create_string_utf8(
        env,
        "ERR_TIPO_INVALIDO",
        NAPI_AUTO_LENGTH,
        &code
    );

    // Create a JavaScript string containing the error message.
    napi_create_string_utf8(
        env,
        "El valor proporcionado debe ser un número",
        NAPI_AUTO_LENGTH,
        &msg
    );

    // Create a JavaScript TypeError using the error code and message.
    napi_create_type_error(
        env,
        code,
        msg,
        &error
    );

    // Throw the TypeError so it can be caught by JavaScript.
    napi_throw(env, error);

    // Return nullptr because an exception has been thrown.
    return nullptr;
}
