// Import the strict version of Node.js built-in assert module
const assert = require("node:assert/strict");

// Asynchronous function that returns the sum of two numbers
async function soma(a, b){
    // Returns a resolved Promise with the sum
    return a + b;
}

// Asynchronous function that always throws an error
async function erro(){
    // Throws an error, which causes the returned Promise to be rejected
    throw new Error("Something went wrong");
}

// Immediately Invoked Async Function Expression (IIFE)
// This allows us to use await at the top level
(async () => {
    try{
        // assert.doesNotReject verifies that the async function does NOT reject
        // If the Promise resolves successfully, the assertion passes
        await assert.doesNotReject(async () => {

            // Call the async sum function
            const resultado = await soma(2, 3);

            // Print the result to the console
            console.log("result:", resultado);
        });

        // If no rejection occurred, this message will be printed
        console.log("Test 1 passed: no rejection occurred.");

        // This assertion will FAIL because erro() rejects the Promise
        await assert.doesNotReject(async () => {

            // Calling erro() causes a rejected Promise
            await erro();
        });

    }catch(e){
        // If any assertion fails, execution jumps here
        // The error message is displayed
        console.error("Test failed:", e.message);
    }
})();