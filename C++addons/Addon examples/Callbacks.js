#include <node.h>  // Main Node.js header for creating native addons

namespace demo {

// Import commonly used V8 types into the current namespace
using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Null;
using v8::Object;
using v8::String;
using v8::Value;

// Native function that will be exposed to JavaScript
void RunCallback(const FunctionCallbackInfo<Value>& args) {

    // Get the current V8 isolate (the JavaScript engine instance)
    Isolate* isolate = args.GetIsolate();

    // Get the current execution context
    Local<Context> context = isolate->GetCurrentContext();

    // Get the first argument passed from JavaScript
    // and cast it to a JavaScript function
    Local<Function> callback = Local<Function>::Cast(args[0]);

    // Number of arguments that will be passed to the callback
    const unsigned argc = 1;

    // Create an array containing the callback arguments
    Local<Value> argv[argc] = {
        // Create a JavaScript string
        String::NewFromUtf8(isolate, "Hello from C++!")
            .ToLocalChecked()
    };

    // Call the JavaScript callback function
    // Parameters:
    // 1. Current execution context
    // 2. 'this' value (null)
    // 3. Number of arguments
    // 4. Array of arguments
    callback->Call(context, Null(isolate), argc, argv).ToLocalChecked();
}

// Initialization function called when the addon is loaded
void Init(Local<Object> exports, Local<Object> module) {

    // Replace module.exports with the native function
    NODE_SET_METHOD(module, "exports", RunCallback);
}

// Register the addon with Node.js
NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

} // namespace demo