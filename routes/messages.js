var express = require('express');
var router = express.Router();

/* GET images page */
router.get('/', function(req, res, next) {
    res.render('messages', { title: 'All Messages', currentPage: "messages" });
});
    
module.exports = router;
