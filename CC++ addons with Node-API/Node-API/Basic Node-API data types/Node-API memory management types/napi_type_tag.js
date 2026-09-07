#include <node_api.h> // Includes the Node-API functions and types.

// Defines a unique 128-bit type tag.
// The value is composed of two unsigned 64-bit integers.
static const napi_type_tag pessoa_tag = {
    0x1234567890ABCDEFULL, // Lower 64 bits.
    0xFEDCBA0987654321ULL  // Upper 64 bits.
};

// Creates a new JavaScript object and assigns the type tag to it.
napi_value criar(napi_env env, napi_callback_info info) {

    napi_value obj; // Stores the JavaScript object.

    // Creates an empty JavaScript object.
    napi_create_object(env, &obj);

    // Assigns our unique type tag to the object.
    napi_type_tag_object(env, obj, &pessoa_tag);

    // Returns the tagged object to JavaScript.
    return obj;
}

// Checks whether a JavaScript object has our type tag.
napi_value verificar(napi_env env, napi_callback_info info) {

    size_t argc = 1;       // We expect one argument.
    napi_value args[1];    // Stores the JavaScript argument.

    // Gets the arguments passed to the function.
    napi_get_cb_info(
        env,
        info,
        &argc,
        args,
        nullptr,
        nullptr
    );

    bool possui_tag = false; // Stores whether the object has the tag.

    // Checks if the first argument contains our type tag.
    napi_check_object_type_tag(
        env,
        args[0],
        &pessoa_tag,
        &possui_tag
    );

    napi_value resultado; // Stores the JavaScript boolean result.

    // Converts the C++ boolean into a JavaScript boolean.
    napi_get_boolean(
        env,
        possui_tag,
        &resultado
    );

    // Returns true or false to JavaScript.
    return resultado;
}

// Initializes and exports the native functions.
napi_value Init(napi_env env, napi_value exports) {

    // Defines the functions that will be available in JavaScript.
    napi_property_descriptor props[] = {
        {"criar", nullptr, criar},
        {"verificar", nullptr, verificar}
    };

    // Adds the functions to the module exports.
    napi_define_properties(
        env,
        exports,
        2,
        props
    );

    // Returns the module exports.
    return exports;
}

// Registers the Init function as the Node.js native module entry point.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
