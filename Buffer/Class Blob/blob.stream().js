async function exemploBlobStream() {

    // Create a Blob containing some text data
    const blob = new Blob(["Olá, mundo! Isso é um teste de MediaStream."]);

    // Get a ReadableStream from the Blob
    const stream = blob.stream();

    // Create a reader to read the stream data chunk by chunk
    const reader = stream.getReader();

    // Variable to store the final result as a string
    let resultado = '';

    while (true) {
        // Read the next chunk from the stream
        const { done, value } = await reader.read();

        // If there is no more data, exit the loop
        if (done) break;

        // Decode the Uint8Array chunk into a string and append it
        resultado += new TextDecoder().decode(value);
    }

    // Print the Blob content to the console
    console.log("Blob content:");
    console.log(resultado);
}

// Call the async function
exemploBlobStream();