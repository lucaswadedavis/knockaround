var port = process.argv[2] || process.env.PORT || 8081;

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var humanize = require('tiny-human-time');

var app = express();
app.use(bodyParser.json());

var intermediateURL = 'http://localhost:8082/sync'

function makeRequest(req, callback) {
    var opts = {
        url: intermediateURL,
        json: req.body
    };
    var start = new Date();
    request.post(opts, (error, httpResponse, body) => {
        console.log(body, humanize(start, new Date()));
        callback(body);
    });
}

app.post('/sync', (req, res) => {
    makeRequest(req, (body) => {
        res.send(body);
    });
});

app.listen(port, function () {
    console.log('Server started on port', port);
});
