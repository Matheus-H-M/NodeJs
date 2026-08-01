// Include the main Node.js API.
#include <node.h>

// Include the V8 JavaScript engine API.
#include <v8.h>

// Everything is placed inside the "demo" namespace
// to avoid symbol name conflicts.
namespace demo {

    // Import commonly used V8 types into the current namespace.
    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Object;
    using v8::String;
    using v8::Value;

    // This function will be exposed to JavaScript.
    // It returns a simple string to the caller.
    void Hello(const FunctionCallbackInfo<Value>& args) {

        // Get the current V8 isolate (execution context).
        Isolate* isolate = args.GetIsolate();

        // Set the return value that JavaScript will receive.
        args.GetReturnValue().Set(

            // Create a new V8 string from a UTF-8 C string.
            String::NewFromUtf8(
                isolate,
                "Hello from a C++ addon using V8!"
            ).ToLocalChecked()
        );
    }

    // This function is called when the addon is loaded.
    // It exports native functions to JavaScript.
    void Initialize(Local<Object> exports) {

        // Export the native C++ function "Hello"
        // as "hello" in JavaScript.
        NODE_SET_METHOD(exports, "hello", Hello);
    }

    // Register the initialization function so Node.js
    // can load this addon.
    NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

} // namespace demo