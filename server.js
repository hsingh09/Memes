var express = require("express");
var app = express();
var router = express.Router();
var path = require('path');
var hbs = require('hbs');
var mysql = require('mysql');


// Routers
var routes = require("./routes/index");
var messages = require("./routes/messages");
var create = require("./routes/new");
var success = require("./routes/success");


// Handlebars 
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

// Configure HandleBars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Logging middleware
router.use(function (req,res,next) {
    console.log(req.baseUrl);
    next();
});


app.use('*', router);
app.use('/', routes);
app.use('/messages', messages);
app.use('/new', create);
app.use('/success', success);


// If none of our existing routes matched, send a 404 
app.use("*",function(req,res){
	res.render('404', { title: 'Oops!'});
});


app.listen(3000,function(){
  console.log("Live at Port 3000");
});

