var express = require('express');
var router = express.Router();
var database = require('../models/data');

/* GET images page */
router.get('/', function(req, res, next) {
    var db = database.GetDB();
    var messages = [];

    db.each('SELECT rowid AS id, title, message FROM memes', function(err, row) {
        if (err)
        {
            console.log("meww");
            console.log(err);
        }
        messages.push({title: row.title, message: row.message});
    });

    res.render('messages', { title: 'All Messages', currentPage: "messages", posts: messages});
});


module.exports = router;
