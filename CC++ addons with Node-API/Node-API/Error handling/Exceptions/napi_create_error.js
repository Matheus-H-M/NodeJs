#include <node_api.h>

// Creates a JavaScript Error object using Node.js N-API.
napi_value createBrowserRouter(napi_env env) {
    // Stores the error code, for example: "ERR_USER".
    napi_value code;

    // Stores the error message that will be shown to JavaScript.
    napi_value msg;

    // Stores the JavaScript Error object created by napi_create_error().
    napi_value error;

    // Creates a JavaScript string containing the error code.
    napi_create_string_utf8(
        env,
        "ERR_USUARIO",
        NAPI_AUTO_LENGTH,
        &code
    );

    // Creates a JavaScript string containing the error message.
    napi_create_string_utf8(
        env,
        "El usuario no existe",
        NAPI_AUTO_LENGTH,
        &msg
    );

    // Creates a JavaScript Error object using the code and message.
    napi_create_error(
        env,
        code,
        msg,
        &error
    );

    // Returns the JavaScript Error object to the caller.
    return error;
}
