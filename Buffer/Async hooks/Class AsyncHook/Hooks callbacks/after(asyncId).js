import React, { useEffect } from "react";

// Counter used to simulate unique async IDs (like asyncId in async_hooks)
let asyncCounter = 0;

// Function that simulates an asynchronous operation
function createAsyncOperation(callback) {
    // Increment counter and assign a unique ID to this async operation
    const asyncId = ++asyncCounter;

    // Log before the async callback is executed (similar to "before" hook)
    console.log("before:", asyncId);

    // Simulate async behavior using setTimeout
    setTimeout(() => {
        try {
            // Execute the provided callback function
            callback();
        } catch (err) {
            // Catch and log any error that occurs during execution
            console.error("Captured error:", err);
        } finally {
            // This block always runs after execution (like "after" hook)
            // It runs even if an error occurs
            console.log("after:", asyncId);
        }
    }, 1000); // Delay of 1 second to simulate async work
}