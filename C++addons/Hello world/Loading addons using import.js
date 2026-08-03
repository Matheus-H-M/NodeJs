// Import the native Node.js addon (.node file).
// Native addons are always imported as the default export.
import myAddon from "./hello.node";

// Call the `hello()` function exposed by the native addon
// and print its return value to the console.
console.log(myAddon.hello());

// ❌ This is NOT supported.
// Native addons do not support named imports.
// import { hello } from "./hello.node";

// Import the native addon again using a different variable name.
// The imported object contains all functions exported by the addon.
import addon from "./hello.node";

// Call the `hello()` function from the imported addon
// and display the result.
console.log(addon.hello());