var express = require("express");
var app = express();
var router = express.Router();
var path = require('path');
var hbs = require('hbs');


// Routers
var routes = require("./routes/index");
var messages = require("./routes/messages");
var create = require("./routes/new");
var success = require("./routes/success");

// Databse
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/MemeData.db');

// Body-Parser
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Register the public directory
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/css'));


db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS memes (title TEXT, message TEXT)");

    var stmt = db.prepare('INSERT INTO  memes VALUES (?, ?)');
    var data = [{title: "hello", message: "world"}, {title: "goodby", message: "planet"}];

    //for (i in data)
    //{
    //    stmt.run(data[i].title, data[i].message);
    //}

  stmt.finalize();
});


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


hbs.registerHelper('gridHelper', function(itemsPerRow, context, options) {
    var out = "";
    var subcontext = []

    for (var i = 0;  i < context.length; i++)
    {
        if ((i > 0) && (i % itemsPerRow == 0))
        {
            out += options.fn(subcontext);
            subcontext = []
        }
        subcontext.push(context[i]);
    }
    out += options.fn(subcontext);
    return out;

});


// Configure HandleBars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Logging middleware
app.use("*", function (req,res,next) {
    console.log(req.method + " " + req.baseUrl);
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


var port =  normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.listen(port,function(){
  console.log("Live at Port " + port);
});



function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}