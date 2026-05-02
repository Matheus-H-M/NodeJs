// Create a Blob containing a text string
const blobOriginal = new Blob(
    ["Ola, isso é um exemplo de Blob no Node.js!"],
    { type: "text/plain" } // Define the MIME type of the Blob
);

// Define the start and end positions for slicing
const start = 5;   // Starting index (inclusive)
const end = 25;    // Ending index (exclusive)

// Define the MIME type for the new sliced Blob
const type = "text/plain";

// Create a new Blob containing only a portion of the original Blob
// The original Blob remains unchanged
const blobCortado = blobOriginal.slice(start, end, type);

// Async function to read the content of a Blob
async function lerBlob(blob) {
    // Convert Blob data to text
    const texto = await blob.text();

    // Print the text content to the console
    console.log(texto);
}

// Immediately Invoked Async Function Expression (IIFE)
(async () => {
    // Print the original Blob content
    console.log("Original content:");
    await lerBlob(blobOriginal);

    // Print the sliced Blob content
    console.log("\nSliced content (slice):");
    await lerBlob(blobCortado);
})();