#include <node_api.h>

/*
 * This function is called from JavaScript.
 *
 * It creates and throws a JavaScript SyntaxError using
 * the Node-API function node_api_throw_syntax_error().
 *
 * @param env The N-API environment in which the function is running.
 * @param info Information about the JavaScript function call.
 *
 * @return NULL because an exception is being thrown.
 */
napi_value gerar_erro(napi_env env, napi_callback_info info) {

    /*
     * Throw a JavaScript SyntaxError.
     *
     * The first argument is the N-API environment.
     * The second argument is an optional error code.
     * The third argument is the error message.
     */
    node_api_throw_syntax_error(
        env,
        "MEU_SYNTAX_ERROR",
        "Erro de sintaxe gerado pelo addon N-API!"
    );

    /*
     * Return NULL because the function has thrown
     * a JavaScript exception.
     */
    return NULL;
}

/*
 * This function initializes the native addon.
 *
 * It creates the JavaScript function "gerarErro"
 * and exports it so that JavaScript code can call:
 *
 *     addon.gerarErro();
 *
 * @param env The N-API environment.
 * @param exports The object that will be exported to JavaScript.
 *
 * @return The exports object.
 */
napi_value Init(napi_env env, napi_value exports) {

    /*
     * This variable will hold the JavaScript function
     * created by napi_create_function().
     */
    napi_value fn;

    /*
     * Create a JavaScript function named "gerarErro".
     *
     * The native C function gerar_erro will be executed
     * whenever JavaScript calls addon.gerarErro().
     */
    napi_create_function(
        env,
        "gerarErro",
        NAPI_AUTO_LENGTH,
        gerar_erro,
        NULL,
        &fn
    );

    /*
     * Add the native function to the exports object.
     *
     * This makes the function available to JavaScript as:
     *
     *     addon.gerarErro()
     */
    napi_set_named_property(env, exports, "gerarErro", fn);

    /*
     * Return the exports object containing the
     * exported JavaScript function.
     */
    return exports;
}

/*
 * Register the Init function as the entry point
 * of the Node.js native addon.
 *
 * NODE_GYP_MODULE_NAME is provided by node-gyp
 * when the addon is compiled.
 */
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
