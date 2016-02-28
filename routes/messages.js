var express = require('express');
var router = express.Router();
var database = require('../models/data');
var process = require('process');

var testmode = (process.env['memetest'] != undefined)
console.log("Test mode = " + testmode)

/* GET images page */
router.get('/', function(req, res, next) {
//    database.EnsureDB();
    var db = database.GetDB();
    var messages = [];
    var imagehtml = '';
    if (testmode)
    {
        imagehtml = '<img src="panos.jpg" style="max-width:100%;max-height:100%;">';
    }
    else
    {
        imagehtml = '<h3>TODO: Image goes here</h3>';
    }

    db.each('SELECT rowid AS id, title, message FROM memes', function(err, row) {
        if (err)
        {
            console.log("Error!");
            console.log(err);
        }
        messages.push({title: row.title, message: row.message, image: imagehtml});
    }, function() 
    {
        res.render('messages', { title: 'All Messages', currentPage: "messages", posts: messages});
//        database.CloseDB();
    });
});


module.exports = router;
