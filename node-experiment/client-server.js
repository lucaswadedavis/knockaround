var port = process.argv[2] || process.env.PORT || 8080;

var express = require('express');
var request = require('request');
var humanize = require('tiny-human-time');

var app = express();

var intermediateURL = 'http://localhost:8081/sync'

var highest = -Infinity;
var lowest = Infinity;
var sum = 0;
var count = 0;
var average = 0;

function makeRequest() {
    count ++;
    if (count > 1000) {
        console.log('high', highest);
        console.log('low', lowest);
        console.log('average', average);
        return clearInterval(interval);
    }
    var value = Math.floor(Math.random() * 100);
    var opts = {
        url: intermediateURL,
        json: {value: value}
    };
    var start = new Date;
    request.post(opts, (error, httpResponse, body) => {
        if (error) return console.log('error', error);
        if (!body || !body.sum) return console.log('uh no body');
        var end = new Date;
        var delay = end.getTime() - start.getTime();
        sum += delay;
        average = sum / count;
        if (delay > highest) highest = delay;
        if (delay < lowest) lowest = delay;
        if (body.sum !== (value + 2)) console.log('incorrect match returned! ', body.sum, value + 2);
        if (count % 10 === 0) console.log(humanize(start, end));
    });
}

var interval = setInterval(makeRequest, 10);

app.listen(port, function () {
    console.log('Server started on port', port);
});
