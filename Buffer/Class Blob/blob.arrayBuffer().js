// Async function that demonstrates how to use blob.arrayBuffer()
async function exemploBlobArrayBuffer() {

    // Create a Blob containing a simple text string
    const blob = new Blob(["Olá, mundo!"], { type: "text/plain" });

    // Convert the Blob data into an ArrayBuffer (returns a Promise)
    const arrayBuffer = await blob.arrayBuffer();

    // Convert the ArrayBuffer into a Node.js Buffer
    const buffer = Buffer.from(arrayBuffer);

    // Print the content of the buffer as a string
    console.log(buffer.toString());

    // Print the size of the buffer in bytes
    console.log("Size in bytes:", buffer.length);
}

// Call the function
exemploBlobArrayBuffer();