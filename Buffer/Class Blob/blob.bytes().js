// Define an async function to work with Blob bytes
async function exemploBlobBytes() {

    // Create a Blob containing the string "Olá mundo"
    const blob = new Blob(["Olá mundo"]);

    // Convert the Blob content into a Uint8Array (raw bytes)
    // NOTE: Correct method is blob.bytes()
    const bytes = await blob.bytes();

    // Log the byte array to the console
    console.log("Bytes:", bytes);

    // Decode the byte array back into a readable string
    // NOTE: Correct method is decode (not "decide")
    const texto = new TextDecoder().decode(bytes);

    // Log the decoded text
    console.log('Text:', texto);
}

// Call the function
exemploBlobBytes();