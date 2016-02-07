var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();


/* GET images page */
router.get('/', function(req, res, next) {
    res.render('new', { title: 'Create a Messages', currentPage: "new" });
});

router.post("/", function(req, res)
{
    var db = new sqlite3.Database('data/MemeData');
    
    console.log("New Submission");
    console.log(req.body);

    var stmt = db.prepare('INSERT INTO  memes VALUES (?, ?)');
    stmt.run(req.body.title, req.body.message);
    stmt.finalize();
    db.close();

    res.redirect("/success");
});
    
module.exports = router;

