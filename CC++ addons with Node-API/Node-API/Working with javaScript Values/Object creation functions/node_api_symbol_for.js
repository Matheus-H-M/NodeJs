#include <node_api.h>

// Initialize the addon
napi_value Init(napi_env env, napi_value exports) {
    napi_value symbol;

    // Create or retrieve a global symbol
    node_api_symbol_for(
        env,
        "my.symbol",
        NAPI_AUTO_LENGTH,
        &symbol
    );

    // Export the symbol to JavaScript
    napi_set_named_property(env, exports, "symbol", symbol);

    return exports;
}

// Register the addon module
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)