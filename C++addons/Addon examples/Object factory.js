
#include <node.h>

namespace demo {

// Import the V8 types we need from the Node.js/V8 API.
using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

// This function creates and returns a new JavaScript object.
//
// The first argument passed from JavaScript is converted to a string
// and stored in the object's "msg" property.
void CreateObject(const FunctionCallbackInfo<Value>& args) {
    // Get the current V8 isolate.
    // The isolate represents the V8 JavaScript engine instance.
    Isolate* isolate = args.GetIsolate();

    // Get the current JavaScript execution context.
    Local<Context> context = isolate->GetCurrentContext();

    // Create a new empty JavaScript object.
    Local<Object> obj = Object::New(isolate);

    // Convert the first argument passed from JavaScript to a string.
    //
    // For example:
    // createObject("Hello")
    //
    // args[0] contains "Hello".
    Local<String> message =
        args[0]->ToString(context).ToLocalChecked();

    // Add a "msg" property to the newly created object.
    //
    // The value of "msg" is the string received from JavaScript.
    obj->Set(
        context,
        String::NewFromUtf8(isolate, "msg").ToLocalChecked(),
        message
    ).FromJust();

    // Return the newly created object to JavaScript.
    args.GetReturnValue().Set(obj);
}

// Initialize the Node.js addon.
//
// This function tells Node.js which C++ function should be exported
// when the addon is loaded with require().
void Init(Local<Object> exports, Local<Object> module) {
    // Make CreateObject the module's exported function.
    //
    // This allows JavaScript to use:
    // const createObject = require('./build/Release/addon');
    NODE_SET_METHOD(module, "exports", CreateObject);
}

// Register the addon with Node.js.
//
// NODE_GYP_MODULE_NAME is automatically replaced with the name
// of the native addon when it is compiled.
NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

} // namespace demo
```

**JavaScript usage:**

```js
// Load the compiled C++ addon.
const createObject = require('./build/Release/addon');

// Create the first object using the C++ factory function.
const obj1 = createObject('Hello');

// Create a second, independent object.
const obj2 = createObject('World');

// Access the "msg" property created by the C++ code.
console.log(obj1.msg);
console.log(obj2.msg);

// Output:
// Hello
// World
```
