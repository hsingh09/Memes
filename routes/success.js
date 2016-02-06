var express = require('express');
var router = express.Router();

/* GET images page */
router.get('/', function(req, res, next) {
    res.render('success', { title: 'Create a Messages', currentPage: "success" });
});


module.exports = router;

