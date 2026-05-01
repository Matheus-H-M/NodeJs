// Import AsyncResource from the async_hooks module.
// AsyncResource allows us to create custom asynchronous resources
// that can be tracked by Node.js async hooks.
const { AsyncResource } = require("async_hooks");


// Fake database class to simulate an async database request
class FakeDatabase {

    // Method that simulates a database query
    get(query, callback){

        // Simulate async delay (like a real database query)
        setTimeout(() => {

            // Fake query result
            const result = { id: 1, name: "Maria", query };

            // Execute callback with no error and the result
            callback(null, result);

        }, 1000);
    }
}


// Custom async resource that wraps a database query
class DBQuery extends AsyncResource{

    constructor(db){

        // Create a new AsyncResource
        // "DBQuery" is the type of the async event
        super("DBQuery", {
            requireManualDestroy: true
        });

        // Store the database instance
        this.db = db;
    }

    // Method that performs the query
    getInfor(query, callback){

        // Call the database get method
        this.db.get(query, (err, data) => {

            // Run the callback inside the async context
            // created by this AsyncResource
            this.runInAsyncScope(callback, null, err, data);

        });
    }

    // Method to clean up the resource
    close(){

        // Remove database reference
        this.db = null;

        // Notify Node.js that this async resource is destroyed
        this.emitDestroy();
    }

}


// Create a fake database instance
const database = new FakeDatabase();

// Create our async resource instance
const queryResource = new DBQuery(database);


// Execute a database query
queryResource.getInfor("SELECT * FROM users", (err, result) => {

    // Check if there was an error
    if(err){
        console.error("Error:", err);
    }else{

        // Print query result
        console.log("Query result:", result);
    }

    // Close and destroy the async resource
    queryResource.close();

});