var express = require('express');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 80 : 3000;

app.use(function(req, res, next) {
    if (req.path != '/healthcheck') {
        res.redirect('https://www.careerscore.com' + req.path);
    } else {
        next();
    }
});

app.get('/healthcheck', function(req, res, next) {
    res.sendStatus(200);
});

app.listen(port, function() {
    console.log('https-redirect: Server running on port ' + port);
});