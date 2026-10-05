#include <node_api.h>

// Native function exposed to Node.js
napi_value MinhaFuncao(napi_env env, napi_callback_info info) {

    // Handle scope used to manage the lifetime of napi_value handles
    napi_handle_scope scope;

    // Variable that will store the string created by N-API
    napi_value resultado;

    // Open a new handle scope
    napi_status status = napi_open_handle_scope(env, &scope);

    // Check whether the handle scope was opened successfully
    if (status != napi_ok) {
        return nullptr;
    }

    // Create a JavaScript string inside the current handle scope
    napi_create_string_utf8(
        env,
        "Olá N-API!",
        NAPI_AUTO_LENGTH,
        &resultado
    );

    // Close the handle scope when we are finished with it
    napi_close_handle_scope(env, scope);

    // Return the JavaScript value to Node.js
    return resultado;
}
