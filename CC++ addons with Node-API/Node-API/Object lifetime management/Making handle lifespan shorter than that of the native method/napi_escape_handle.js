#include <node_api.h>

// Callback function that creates and returns a JavaScript object.
napi_value CriarObjeto(napi_env env, napi_callback_info info) {
    // Declare variables for the operation status and JavaScript handles.
    napi_status status;
    napi_value resultado;
    napi_value objeto;
    napi_value mensagem;
    napi_escapable_handle_scope scope;

    // Open an escapable handle scope.
    // This allows a handle created inside this scope to be promoted
    // to the outer scope using napi_escape_handle().
    status = napi_open_escapable_handle_scope(env, &scope);
    if (status != napi_ok) return nullptr;

    // Create a new JavaScript object.
    status = napi_create_object(env, &objeto);
    if (status != napi_ok) {
        // Close the escapable scope before returning on failure.
        napi_close_escapable_handle_scope(env, scope);
        return nullptr;
    }

    // Create a JavaScript string containing "Escaped object!".
    status = napi_create_string_utf8(
        env, "Escaped object!", NAPI_AUTO_LENGTH, &mensagem
    );
    if (status != napi_ok) {
        // Close the escapable scope before returning on failure.
        napi_close_escapable_handle_scope(env, scope);
        return nullptr;
    }

    // Set the object's "mensagem" property to the created string.
    // The resulting JavaScript object will have a property named "mensagem".
    status = napi_set_named_property(env, objeto, "mensagem", mensagem);
    if (status != napi_ok) {
        // Close the escapable scope before returning on failure.
        napi_close_escapable_handle_scope(env, scope);
        return nullptr;
    }

    // Escape the object handle into the outer scope.
    // The handle stored in "resultado" remains valid after the current
    // escapable scope is closed.
    // This function can be called only once per escapable handle scope.
    status = napi_escape_handle(env, scope, objeto, &resultado);
    if (status != napi_ok) {
        // Close the escapable scope before returning on failure.
        napi_close_escapable_handle_scope(env, scope);
        return nullptr;
    }

    // Close the escapable handle scope.
    // The escaped handle remains valid in the outer scope.
    napi_close_escapable_handle_scope(env, scope);

    // Return the escaped JavaScript object to the caller.
    return resultado;
}

// Initialization function called when the native addon is loaded.
napi_value Init(napi_env env, napi_value exports) {
    // Declare a handle for the JavaScript function.
    napi_value func;

    // Create a JavaScript function named "criarObjeto"
    // and associate it with the native callback CriarObjeto.
    napi_create_function(
        env, "criarObjeto", NAPI_AUTO_LENGTH,
        CriarObjeto, nullptr, &func
    );

    // Export the function so it can be called from JavaScript.
    napi_set_named_property(env, exports, "criarObjeto", func);

    // Return the exports object to Node.js.
    return exports;
}

// Register the addon's initialization function with Node.js.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)