
#include <node.h>

namespace demo {

// Import commonly used V8 types into the current namespace.
// This allows us to write "Isolate" instead of "v8::Isolate", etc.
using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

// This function is the actual C++ function that will be called
// when the JavaScript function is executed.
void SayHello(const FunctionCallbackInfo<Value>& args) {

    // Get the current V8 isolate.
    // The isolate represents an independent instance of the V8 engine.
    Isolate* isolate = args.GetIsolate();

    // Set the value that will be returned to JavaScript.
    //
    // String::NewFromUtf8() creates a JavaScript string from a
    // UTF-8 encoded C++ string.
    //
    // ToLocalChecked() extracts the Local<String> from the
    // MaybeLocal<String> returned by NewFromUtf8().
    args.GetReturnValue().Set(
        String::NewFromUtf8(
            isolate,
            "Hello! This message came from C++."
        ).ToLocalChecked()
    );
}

// This is the Function Factory.
//
// Instead of directly exporting SayHello to JavaScript,
// this function creates a new JavaScript function and returns it.
void CreateFunction(const FunctionCallbackInfo<Value>& args) {

    // Get the current V8 isolate.
    Isolate* isolate = args.GetIsolate();

    // Get the current JavaScript execution context.
    //
    // A Context contains the environment in which JavaScript
    // objects and functions are executed.
    Local<Context> context = isolate->GetCurrentContext();

    // Create a FunctionTemplate.
    //
    // The FunctionTemplate describes a JavaScript function
    // whose implementation is the C++ function SayHello.
    Local<FunctionTemplate> tpl =
        FunctionTemplate::New(isolate, SayHello);

    // Convert the FunctionTemplate into an actual JavaScript Function.
    //
    // The resulting function can be returned to JavaScript
    // and called normally from JavaScript code.
    Local<Function> fn =
        tpl->GetFunction(context).ToLocalChecked();

    // Give the generated JavaScript function a name.
    //
    // This is useful when inspecting the function or debugging.
    fn->SetName(
        String::NewFromUtf8(
            isolate,
            "sayHello"
        ).ToLocalChecked()
    );

    // Return the newly created JavaScript function.
    //
    // JavaScript will receive this function as the result
    // of calling the addon.
    args.GetReturnValue().Set(fn);
}

// This function initializes the Node.js addon.
//
// "exports" represents the module exports object.
// "module" represents the Node.js module itself.
void Init(Local<Object> exports, Local<Object> module) {

    // Replace module.exports with the CreateFunction function.
    //
    // This means that when JavaScript uses:
    //
    //     require('./build/Release/addon')
    //
    // the returned value will be the CreateFunction function.
    NODE_SET_METHOD(module, "exports", CreateFunction);
}

// Register the addon with Node.js.
//
// NODE_MODULE() connects the native C++ addon with Node.js
// and tells Node.js which initialization function to execute.
NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}


#JavaScript usage

js
// Load the compiled native addon.
const createFunction = require('./build/Release/addon');

// Call the C++ factory function.
// It creates and returns a JavaScript function.
const fn = createFunction();

// Execute the function that was created by the C++ factory.
console.log(fn());

// Output:
// Hello! This message came from C++.
```

### The important idea

The flow is:

```text
JavaScript
    |
    | createFunction()
    v
CreateFunction() [C++]
    |
    | FunctionTemplate::New()
    v
SayHello() [C++]
    |
    | creates JavaScript function
    v
JavaScript function
    |
    | fn()
    v
"Hello! This message came from C++."
```

This is called a **Function Factory** because `CreateFunction()` creates and returns a new JavaScript function.
