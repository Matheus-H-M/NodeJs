#include <node_api.h>

// Creates and returns a new empty JavaScript object
napi_value CriarObjeto(napi_env env, napi_callback_info info) {
    napi_value resultado;

    // Creates a new JavaScript object
    napi_create_object(env, &resultado);

    // Returns the newly created object
    return resultado;
}

// Initializes the Node.js native module
napi_value Init(napi_env env, napi_value exports) {
    napi_value func;

    // Creates a JavaScript function named "criarObjeto"
    napi_create_function(
        env,
        "criarObjeto",
        NAPI_AUTO_LENGTH,
        CriarObjeto,
        nullptr,
        &func
    );

    // Exports the function so it can be accessed from JavaScript
    napi_set_named_property(env, exports, "criarObjeto", func);

    // Returns the module exports
    return exports;
}

// Registers the module initialization function
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)