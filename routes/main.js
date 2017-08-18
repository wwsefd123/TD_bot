var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res) {
    res.render('main/main.html');
});

router.get('/language', function(req, res) {
    res.render('main/language.html');
});

router.get('/timeout', function(req, res) {
    res.render('main/main.html');
});

router.get('/error', function(req, res) {
    res.render('main/error.html');
});

module.exports = router;