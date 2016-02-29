var express = require('express');
var router = express.Router();
var database = require('../models/data');
var image = require('../models/image');
var async = require('async');
var process = require('process');

var testmode = (process.env['memetest'] != undefined)
console.log("Test mode = " + testmode)

/* GET images page */
router.get('/', function(req, res, next) {
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

    db.each('SELECT rowid AS id, title, message, imageURL FROM memes', function(err, row) {
        if (err)
        {
            console.log("Error!");
            console.log(err);
        }

        console.log("BlobURL = " + row.imageURL);
        messages.push({title: row.title, message: row.message, imagesrc: row.imageURL});
    }, function(err, numRowsFinished) 
    {
        if (err)
        {
            console.log("DB.Each failed");
            console.log(err);
        }

        console.log("finished");
        res.render('messages', { title: 'All Messages', currentPage: "messages", posts: messages});
//        database.CloseDB();
    });
});


module.exports = router;