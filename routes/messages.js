var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/MemeData');

/* GET images page */
router.get('/', function(req, res, next) {
    var messages = [];

    db.each('SELECT rowid AS id, title, message FROM memes', function(err, row) {
      console.log(row.title + ': ' + row.message);
      messages.push({title: row.title, message: row.message});
  });
    res.render('messages', { title: 'All Messages', currentPage: "messages", posts: messages});
});


module.exports = router;
