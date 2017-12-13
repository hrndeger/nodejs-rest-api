var express       = require("express");
var bodyParser    = require("body-parser");
var cacheManager  = require('./cacheManager');
var sql           = require("./server");
var upload        = require("express-fileupload");

var app = express(); 

// Body Parser Middleware
// The body-parser module is just a middleware we use to parse our data sent through HTTP requests.
app.use(bodyParser.json()); 

// express-fileupload
app.use(upload());

//CORS Middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.set("view engine","ejs");

app.get('/', (req,res) => {
    res.render("index")
});

app.get('/index', (req,res) => {
        res.render("index")
});

app.get('/upload', (req,res) => {
    res.render("upload")
});

app.get('/api/media/:id', cacheManager.cache(100), (req, res) => {
       var id = req.params.id;
       sql.getMedia(res,id);
});

app.post('/api/upload', (req, res) => {
    if(req.files){
        console.log(req.files);
        
        var file = req.files.filename;
        var img = file.data;
        var mimeType = file.mimetype;
        
        sql.addMedia(img, mimeType);
    }
});

//var port = process.argv.slice(2, 3)[0];
//var config = JSON.parse(fs.readFileSync('./config.json'))
var port = process.env.PORT;

var server = app.listen(port, function () {
    console.log("App now running on port", server.address().port);
 });


