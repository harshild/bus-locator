var express = require('express');
var wait = require('wait.for');

var bodyParser  =  require('body-parser');
var app = express();

var port = 8080;

var googleMapsClient = require('@google/maps').createClient({
    key: MAP_CLIENT_KEY
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.listen(port);

app.post('/getCoordinate', function(req, res) {
    wait.launchFiber(getCoordinate,req,res);
});

function getCoordinate(req, res) {
    var address = req.body.address;

    res.send(wait.for(googleMapsClient.geocode,{
        address: address
    }).json.results[0].geometry.location);
}

console.log('Running on port ' + port);
exports = app;