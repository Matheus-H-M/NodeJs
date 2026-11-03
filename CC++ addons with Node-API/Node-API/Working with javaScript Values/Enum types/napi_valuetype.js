#include <node_api.h>

// Identifies the type of a JavaScript value.
napi_value CheckType(napi_env env, napi_callback_info info) {
    napi_value args[1];
    size_t argc = 1;
    napi_valuetype type;

    // Retrieves the function arguments.
    napi_get_cb_info(env, info, &argc, args, NULL, NULL);

    // Gets the type of the first argument.
    napi_typeof(env, args[0], &type);

    napi_value result;

    // Returns the type as an integer.
    napi_create_int32(env, type, &result);

    return result;
}

// Initializes the native Node.js module.
NAPI_MODULE_INIT() {
    napi_value function;

    // Creates the JavaScript-accessible function.
    napi_create_function(env, "checkType",
        NAPI_AUTO_LENGTH, CheckType, NULL, &function);

    // Exports the function.
    napi_set_named_property(env, exports, "checkType", function);

    return exports;
}