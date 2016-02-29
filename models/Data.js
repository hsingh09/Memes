// Databse
var sqlite3 = require('sqlite3').verbose();
var db = null;

exports.EnsureDB = function()
{
    console.log("EnsureDB called");

    // If the database doesn't exist create it
    if (!db)
    {
      console.log("Opening MemeData.db");
      db = new sqlite3.Database('data/MemeData.db', function(err)
     {
         if (err)
         {
             debugger;
             console.log(err);
         }
     });
    }

    // Create our table if it doesn't exist
   db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS memes (title TEXT, message TEXT, container TEXT, blobName TEXT, imageURL TEXT)");
   });
}

exports.GetDB = function()
{
    console.log("Getting DB");
//    exports.EnsureDB();
    return db;
}

/*exports.CloseDB = function()
{
    if (db)
    {
        console.log("Closing DB");
        db.close();
        db = null;
    }
}*/