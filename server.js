var express = require('express');
var wait = require('wait.for');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('credentials.yml');

var bodyParser  =  require('body-parser');
var app = express();

var port = 8080;
var mapKey = properties.get('google.map.key');

var googleMapsClient = require('@google/maps').createClient({
    key: mapKey
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.listen(port);

app.post('/processRequestToProvideCoordinate', function(req, res) {
    wait.launchFiber(processRequestToProvideCoordinate,req,res);
});

app.get('/getStops',function (req,res) {
    wait.launchFiber(processRequestForBusStops,req,res)
})

function processRequestToProvideCoordinate(req, res) {
    var address = req.body.address;

    res.send(wait.for(getCoordinates,address)
        .json.results[0].geometry.location);
}

function processRequestForBusStops(req,res) {
    res.send(wait.for(getCoordinatesForList,stops))
}

var stops = [
    'Vibgyor School',
    'Teerth Towers'
];

var stopCoordinates = [];

function getCoordinatesForList(list) {
    list.forEach(function(address){
       stopCoordinates.push(address,
           wait.for(getCoordinates,address).json.results[0].geometry.location);
    });
}

function getCoordinates(address) {
    return wait.for(googleMapsClient.geocode, {
        address: address
    });
}

console.log('Running on port ' + port);
exports = app;