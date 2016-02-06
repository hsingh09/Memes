var express = require('express');
var router = express.Router();

/* GET images page */
router.get('/', function(req, res, next) {
    res.render('new', { title: 'Create a Messages', currentPage: "new" });
});

router.post("/", function(req, res)
{
	console.log("Post!");
	console.log(req.params.name)
	console.log(req.params.email);
	res.redirect("/success");
});
    
module.exports = router;

