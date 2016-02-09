var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();

/* GET images page */
router.get('/', function(req, res, next) {
    var db = new sqlite3.Database('data/MemeData.db');
    var messages = [];

    db.each('SELECT rowid AS id, title, message FROM memes', function(err, row) {
      messages.push({title: row.title, message: row.message});
  });
    db.close();

    res.render('messages', { title: 'All Messages', currentPage: "messages", posts: messages});
});


module.exports = router;
