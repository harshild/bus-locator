var map;

function initialize() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 18.5621894, lng: 73.762604}
    });
    markLocation({lat: 18.5621894, lng: 73.762604})
    getStops()

}

function markLocation(coordinate) {
    map.setZoom(15);
    var marker = new google.maps.Marker({
        map: map,
        position: coordinate
    });
}

function panLocation(coordinate) {
    map.panTo(coordinate);
}

function locate(address) {
    if(!address){
        return;
    }

    var client = new XMLHttpRequest();
    client.open("POST", "/processRequestToProvideCoordinate", false);
    client.setRequestHeader("Content-type", "application/json");
    client.send('{"address" : "'+address+'"}');

    var coordinate = JSON.parse(client.responseText);
    markLocation(coordinate);
    panLocation(coordinate)
}

function getStops() {

    var client = new XMLHttpRequest();
    client.open("GET", "/getStops", false);
    client.setRequestHeader("Content-type", "application/json");
    client.send();

    console.log(client.responseText);
    var coordinates = JSON.parse(client.responseText);
    console.log(coordinates)
    coordinates.forEach(function(coordinate) {
        console.log(coordinates.size)
        console.log(coordinate)

        markLocation(coordinate);
    });
}