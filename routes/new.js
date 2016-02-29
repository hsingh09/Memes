var express = require('express');
var router = express.Router();
var database = require('../models/data');
var image = require('../models/image');

var multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage });
var type = upload.single('image');

/* GET images page */
router.get('/', function(req, res, next) {
    res.render('new', { title: 'Create a Messages', currentPage: "new" });
});

router.post("/", type, function(req, res)
{
    var db = database.GetDB();
    
    console.log("New Submission");
    console.log(req.body);
    console.log(req.file);

    var size = req.file.size;
    var buffer = req.file.buffer;

    image.UploadBlobFromBuffer(buffer, req.file.mimetype, req.file.originalname, size, 
        function(err, container, blobName)
        {
            var url = "https://micromemes.blob.core.windows.net/" + container + "/" + blobName;

            var stmt = db.prepare('INSERT INTO  memes VALUES (?, ?, ?, ?, ?)');
            stmt.run(req.body.title, req.body.message, container, blobName, url);
            stmt.finalize();
            res.redirect("/success");
        });
});
    
module.exports = router;

