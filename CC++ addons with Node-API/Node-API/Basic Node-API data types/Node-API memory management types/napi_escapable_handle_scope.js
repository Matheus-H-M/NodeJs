#include <node_api.h>

/*
 * Creates a string inside an escapable handle scope
 * and returns it to the parent scope.
 */
napi_value criar_valor(napi_env env, napi_callback_info info) {

    /*
     * An escapable handle scope allows a value created
     * inside the scope to be returned to the parent scope.
     */
    napi_escapable_handle_scope scope;

    /* Handle for the JavaScript value we are going to create. */
    napi_value resultado;

    /*
     * Open the escapable handle scope.
     *
     * Any handles created inside this scope can be released
     * when the scope is closed, except for a handle that
     * is explicitly escaped.
     */
    napi_open_escapable_handle_scope(env, &scope);

    /*
     * Create a JavaScript string inside the current scope.
     */
    napi_create_string_utf8(
        env,
        "Hello N-API!",
        NAPI_AUTO_LENGTH,
        &resultado
    );

    /*
     * Escape the value so it can survive after the
     * escapable handle scope is closed.
     *
     * The escaped value becomes available in the parent scope.
     */
    napi_escape_handle(env, scope, resultado, &resultado);

    /*
     * Close the escapable handle scope.
     */
    napi_close_escapable_handle_scope(env, scope);

    /*
     * Return the escaped JavaScript value to Node.js.
     */
    return resultado;
}


/*
 * Initializes the native addon.
 *
 * This function is called when Node.js loads the addon.
 */
napi_value Init(napi_env env, napi_value exports) {

    /* Handle for the JavaScript function. */
    napi_value fn;

    /*
     * Create a JavaScript function named "criarValor"
     * that calls our native C function.
     */
    napi_create_function(
        env,
        "criarValor",
        NAPI_AUTO_LENGTH,
        criar_valor,
        NULL,
        &fn
    );

    /*
     * Export the function so it can be called from JavaScript.
     *
     * JavaScript usage:
     *     addon.criarValor()
     */
    napi_set_named_property(
        env,
        exports,
        "criarValor",
        fn
    );

    /* Return the addon exports object. */
    return exports;
}


/*
 * Register the Init function as the entry point
 * of the Node.js native addon.
 */
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
