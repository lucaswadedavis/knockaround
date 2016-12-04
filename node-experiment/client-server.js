var port = process.argv[2] || process.env.PORT || 8080;

var express = require('express');
var request = require('request');
var humanize = require('tiny-human-time');

var app = express();

var intermediateURL = 'http://localhost:8081/sync'

function makeRequest() {
    var value = Math.floor(Math.random() * 100);
    var payload = {'value': value};
    var opts = {
        url: intermediateURL,
        json: payload
    };
    var start = new Date();
    request.post(opts, (error, httpResponse, body) => {
        var end = new Date;
        console.log(body.sum + ' = ' + (value + 2), humanize(start, end));
    });
}

setInterval(makeRequest, 100);

app.listen(port, function () {
    console.log('Server started on port', port);
});
