var express = require('express');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 80 : 3000;

app.use(function(req, res, next) {
    res.redirect('https://www.careerscore.com' + req.path);
});

app.get('/healthcheck', function(req, res, next) {
    res.send(200);
});

app.listen(port, function() {
    console.log('https-redirect: Server running on port ' + port);
});