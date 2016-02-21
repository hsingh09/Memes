var express = require('express');
var router = express.Router();
var database = require('../models/data');


/* GET images page */
router.get('/', function(req, res, next) {
    res.render('new', { title: 'Create a Messages', currentPage: "new" });
});

router.post("/", function(req, res)
{
//    database.EnsureDB();
    var db = database.GetDB();
    
    console.log("New Submission");
    console.log(req.body);

    var stmt = db.prepare('INSERT INTO  memes VALUES (?, ?)');
    stmt.run(req.body.title, req.body.message);
    stmt.finalize();
//    database.CloseDB();
    res.redirect("/success");
});
    
module.exports = router;

