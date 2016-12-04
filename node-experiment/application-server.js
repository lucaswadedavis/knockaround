var port = process.argv[2] || process.env.PORT || 8082;

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.post('/sync', (req, res) => {
    if (!req.body.value) res.send({sum: 0});
    res.send({'sum': req.body.value + 2});
});

app.listen(port, function () {
    console.log('Server started on port', port);
});
