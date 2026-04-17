// Define an async function to demonstrate Blob.text()
async function exemploBlobText(){

    // Create a Blob containing a text string
    const blob = new Blob(["Olá, mundo! Isso é um teste com blob.text()."], {
        type: "text/plain" // Specify the MIME type as plain text
    });

    try{

        // Read the Blob content as a UTF-8 string (returns a Promise)
        const texto = await blob.text();

        // Print a label to the console
        console.log("Blob content:");

        // Output the text extracted from the Blob
        console.log(texto);

    }catch(erro){

        // Handle any errors that occur during reading
        console.error("Error reading the Blob:", erro);
    }
}

// Call the function to execute the example
exemploBlobText();