try {
    // Call the native addon function.
    addon.exemplo();
} catch (err) {
    // Print the error code.
    console.log(err.code);

    // Print the error message.
    console.log(err.message);
}
