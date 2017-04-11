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

var cors = require('cors');

var whitelist = [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://www.careerscore.com',
    'https://stage.careerscore.com',
    'https://start.careerscore.com'
];
var corsOptions = {
    origin: function(origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true,
    methods: ['GET,PUT,POST,DELETE,OPTIONS'],
    allowedHeaders: ['Access-Control-Allow-Headers', 'Origin', 'Access-Control-Allow-Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Cache-Control']
};
app.use(cors(corsOptions));

app.listen(port, function() {
    console.log('https-redirect: Server running on port ' + port);
});