#include <node_api.h>

// Gets the TypedArray data type.
napi_value GetType(napi_env env, napi_callback_info info) {
    napi_value args[1];
    size_t argc = 1;

    // Gets the function arguments.
    napi_get_cb_info(env, info, &argc, args, NULL, NULL);

    napi_typedarray_type type;
    size_t length;
    void* data;
    napi_value buffer;
    size_t offset;

    // Retrieves TypedArray information.
    napi_get_typedarray_info(
        env, args[0], &type, &length,
        &data, &buffer, &offset
    );

    napi_value result;

    // Returns the TypedArray type as an integer.
    napi_create_int32(env, type, &result);

    return result;
}

// Initializes the Node.js addon.
NAPI_MODULE_INIT() {
    napi_value fn;

    // Exposes the getType function to JavaScript.
    napi_create_function(env, "getType", NAPI_AUTO_LENGTH, GetType, NULL, &fn);
    napi_set_named_property(env, exports, "getType", fn);

    return exports;
}