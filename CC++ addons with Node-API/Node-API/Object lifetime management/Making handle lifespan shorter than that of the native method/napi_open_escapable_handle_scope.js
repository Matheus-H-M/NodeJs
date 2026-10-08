#include <node_api.h>

// Native function that creates and returns a JavaScript object.
napi_value CriarObjeto(napi_env env, napi_callback_info info) {
    // Declare an escapable handle scope.
    // This scope allows one value created inside it to be promoted
    // to the outer scope.
    napi_escapable_handle_scope scope;

    // This will hold the JavaScript object we create.
    napi_value objeto;

    // Open a new escapable handle scope.
    // Objects created inside this scope are normally valid only
    // while the scope is open.
    napi_open_escapable_handle_scope(env, &scope);

    // Create a new empty JavaScript object.
    napi_create_object(env, &objeto);

    // Declare a value that will contain a JavaScript string.
    napi_value valor;

    // Create a UTF-8 JavaScript string.
    napi_create_string_utf8(
        env,
        "Ola N-API!",
        NAPI_AUTO_LENGTH,
        &valor
    );

    // Add the string as the "mensagem" property of the object.
    napi_set_named_property(env, objeto, "mensagem", valor);

    // This will hold the value that is promoted outside
    // of the current escapable handle scope.
    napi_value resultado;

    // Escape the object from the current scope.
    // This allows the object to remain valid after the scope
    // is closed and makes it available to the outer scope.
    napi_escape_handle(env, scope, objeto, &resultado);

    // Close the escapable handle scope.
    // The escaped value remains available through "resultado".
    napi_close_escapable_handle_scope(env, scope);

    // Return the escaped JavaScript object.
    return resultado;
}