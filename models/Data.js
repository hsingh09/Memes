// Databse
var sqlite3 = require('sqlite3').verbose();
var db = null;

exports.EnsureDB = function()
{
    // If the database doesn't exist create it
    if (!db)
    {
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
    console.log("Creating new database");
    db.run("CREATE TABLE IF NOT EXISTS memes (title TEXT, message TEXT)");
   });
}

exports.GetDB = function()
{
    return db;
}