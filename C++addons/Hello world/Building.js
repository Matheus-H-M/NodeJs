// Include the main Node.js C++ API header.
// It provides the necessary definitions for creating native addons.
#include <node.h>

// Place all addon code inside a namespace to avoid naming conflicts.
namespace demo {

    // Import commonly used V8 types into the current namespace
    // so we don't have to write "v8::" every time.
    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Object;
    using v8::String;
    using v8::Value;

    // This function will be exposed to JavaScript.
    // It is called whenever JavaScript executes addon.hello().
    void Hello(const FunctionCallbackInfo<Value>& args) {

        // Get the current V8 isolate.
        // An Isolate represents an independent JavaScript engine instance.
        Isolate* isolate = args.GetIsolate();

        // Set the return value that will be sent back to JavaScript.
        args.GetReturnValue().Set(

            // Create a new JavaScript string from a C++ string.
            String::NewFromUtf8(isolate, "Hello from the C++ Addon!")
                .ToLocalChecked()
        );
    }

    // Initialization function.
    // Node.js calls this function when the addon is loaded with require().
    void Initialize(Local<Object> exports) {

        // Export the Hello() function to JavaScript
        // under the name "hello".
        NODE_SET_METHOD(exports, "hello", Hello);
    }

    // Register the addon with Node.js.
    // "addon" is the module name expected by Node.js.
    // Initialize is the function called when the module is loaded.
    NODE_MODULE(addon, Initialize)

} // namespace demo