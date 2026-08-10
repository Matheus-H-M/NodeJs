```cpp
#include <node.h>
#include <node_object_wrap.h>

namespace demo {

// Import the V8 types that we will use throughout the addon.
using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;


// MyObject is a C++ class that can be wrapped and exposed
// as a JavaScript object.
//
// By inheriting from node::ObjectWrap, we can associate
// a C++ object with a JavaScript object.
class MyObject : public node::ObjectWrap {
 public:

  // Constructor.
  //
  // The value passed from JavaScript is stored in value_.
  explicit MyObject(double value)
      : value_(value) {}

  // Destructor.
  //
  // This is called when the C++ object is destroyed.
  ~MyObject() {}

  // Initializes the MyObject constructor and methods
  // that will be exposed to JavaScript.
  static void Init(Local<Object> exports) {

    // Get the V8 isolate associated with the current JavaScript context.
    Isolate* isolate = exports->GetIsolate();

    // Get the current JavaScript execution context.
    Local<Context> context = isolate->GetCurrentContext();

    // Create a function template for the MyObject constructor.
    //
    // The New function will be called when JavaScript executes:
    //
    // const obj = new addon.MyObject(10);
    //
    Local<FunctionTemplate> tpl =
        FunctionTemplate::New(isolate, New);

    // Set the class name that will appear in JavaScript
    // and in debugging tools.
    tpl->SetClassName(
        String::NewFromUtf8(
            isolate,
            "MyObject"
        ).ToLocalChecked()
    );

    // Tell V8 that every MyObject JavaScript instance
    // has one internal field.
    //
    // This field is used by ObjectWrap to store the
    // connection between the JavaScript object and
    // the C++ MyObject instance.
    tpl->InstanceTemplate()->SetInternalFieldCount(1);

    // Add the plusOne() method to the JavaScript prototype.
    //
    // JavaScript usage:
    //
    // obj.plusOne();
    NODE_SET_PROTOTYPE_METHOD(
        tpl,
        "plusOne",
        PlusOne
    );

    // Create the actual JavaScript constructor function
    // from the function template.
    Local<Function> constructor =
        tpl->GetFunction(context).ToLocalChecked();

    // Export MyObject from the native addon.
    //
    // This allows JavaScript to use:
    //
    // const addon = require('./build/Release/addon');
    // const obj = new addon.MyObject(10);
    exports
        ->Set(
            context,
            String::NewFromUtf8(
                isolate,
                "MyObject"
            ).ToLocalChecked(),
            constructor
        )
        .Check();
  }

 private:

  // JavaScript constructor callback.
  //
  // This function is called when JavaScript executes:
  //
  // new addon.MyObject(10);
  static void New(
      const FunctionCallbackInfo<Value>& args) {

    // Get the current V8 isolate.
    Isolate* isolate = args.GetIsolate();

    // Make sure MyObject is being called with "new".
    //
    // Without this check, someone could incorrectly call:
    //
    // addon.MyObject(10);
    //
    // instead of:
    //
    // new addon.MyObject(10);
    if (!args.IsConstructCall()) {

      // Throw a JavaScript exception if "new" was not used.
      isolate->ThrowException(
          String::NewFromUtf8(
              isolate,
              "MyObject must be called with new"
          ).ToLocalChecked()
      );

      return;
    }

    // Default value for the C++ object.
    double value = 0;

    // Check whether JavaScript provided a first argument
    // and whether that argument is a number.
    //
    // Example:
    //
    // new addon.MyObject(10);
    //
    // args[0] contains the value 10.
    if (args.Length() > 0 && args[0]->IsNumber()) {

      // Convert the JavaScript number to a C++ double.
      value =
          args[0]
              ->NumberValue(
                  isolate->GetCurrentContext()
              )
              .FromMaybe(0);
    }

    // Create the C++ MyObject instance.
    MyObject* obj = new MyObject(value);

    // Connect the C++ object to the JavaScript object.
    //
    // After this call, V8 knows that args.This()
    // represents this C++ MyObject instance.
    obj->Wrap(args.This());

    // Return the JavaScript object to the caller.
    args.GetReturnValue().Set(args.This());
  }

  // JavaScript method callback for plusOne().
  //
  // JavaScript usage:
  //
  // obj.plusOne();
  //
  // If the current value is 10, this method changes it
  // to 11 and returns 11.
  static void PlusOne(
      const FunctionCallbackInfo<Value>& args) {

    // Get the current V8 isolate.
    Isolate* isolate = args.GetIsolate();

    // Recover the C++ MyObject instance that is associated
    // with the JavaScript object.
    //
    // args.This() is the JavaScript object.
    //
    // ObjectWrap::Unwrap<MyObject>() converts that JavaScript
    // object back into our C++ MyObject pointer.
    MyObject* obj =
        ObjectWrap::Unwrap<MyObject>(args.This());

    // Increase the C++ object's value by one.
    obj->value_++;

    // Return the new value to JavaScript.
    args.GetReturnValue().Set(
        Number::New(
            isolate,
            obj->value_
        )
    );
  }

  // This private member stores the object's numeric value.
  //
  // It belongs to the C++ MyObject instance, not directly
  // to the JavaScript object.
  double value_;
};


// This function is called when Node.js loads the native addon.
//
// It initializes MyObject and exports it to JavaScript.
void InitAll(Local<Object> exports) {

  // Register MyObject on the addon exports object.
  MyObject::Init(exports);
}


// NODE_MODULE connects this initialization function
// with Node.js's native addon loading system.
//
// When JavaScript executes:
//
// require('./build/Release/addon');
//
// Node.js loads the compiled addon and calls InitAll().
NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)

} // namespace demo
```

### JavaScript usage

```js
// Load the compiled C++ addon.
const addon = require('./build/Release/addon');

// Create a C++ MyObject instance through JavaScript.
const obj = new addon.MyObject(10);

// Call the C++ plusOne() method.
console.log(obj.plusOne()); // 11
console.log(obj.plusOne()); // 12
console.log(obj.plusOne()); // 13
```

### The important connection

The key idea is this:

```text
JavaScript object
       │
       │ obj
       ▼
node::ObjectWrap
       │
       ▼
C++ MyObject
       │
       ▼
double value_
```

`Wrap()` connects the JavaScript object to the C++ instance, while `ObjectWrap::Unwrap<MyObject>()` retrieves that C++ instance when JavaScript calls `plusOne()`.

```
```
