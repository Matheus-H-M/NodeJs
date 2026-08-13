// Include the node-addon-api library.
// This provides a C++ wrapper around Node-API.
#include <napi.h>

// This function will be exposed to JavaScript.
// It creates and returns a JavaScript object.
Napi::Object CreateObject(const Napi::CallbackInfo& info) {

    // Get the current Node.js environment.
    // The environment is required when creating JavaScript values.
    Napi::Env env = info.Env();

    // Create a new empty JavaScript object.
    Napi::Object obj = Napi::Object::New(env);

    // Add a property named "foo" to the object.
    // The value of the property is the JavaScript string "bar".
    obj["foo"] = Napi::String::New(env, "bar");

    // Return the JavaScript object to the caller.
    return obj;
}

// This function initializes the addon.
// Node.js calls this function when the native addon is loaded.
Napi::Object Init(Napi::Env env, Napi::Object exports) {

    // Add the CreateObject function to the exports object.
    // JavaScript will be able to call it as:
    // addon.criarObjeto()
    exports.Set(
        "criarObjeto",
        Napi::Function::New(env, CreateObject)
    );

    // Return the exports object so Node.js can use it.
    return exports;
}

// Register the addon with Node.js.
// "addon" is the name of the native module.
// "Init" is the initialization function that Node.js will call.
NODE_API_MODULE(addon, Init)