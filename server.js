var express = require('express');
var router = express.Router();
var session = require('express-session');
var morgan = require('morgan');
var log4js = require('log4js');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var path = require('path');
var fs = require('fs');
var uuid = require('node-uuid');
require('date-utils');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(session({
    secret : uuid.v1(),
    name : '',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '30mb', extended: false, parameterLimit: 1048576}));
app.use(multipart());

// 시작 기준 페이지
router.get('/', function(req, res, next) {
    req.session.destroy(function(err) {
        if (!err) {
            res.render('index.html');
        }
    });
});

app.use('/', router);

require('fs').readdirSync(path.join(__dirname, 'routes')).forEach(function(file) {
    var name = file.replace('.js', '');
    app.use('/' + name, require(path.join(__dirname, 'routes', name)));
});

app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 8000;
var server = app.listen(port, function () {
});

server.timeout = 600000;