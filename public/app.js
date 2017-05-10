var map;

function initialize() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 40.731, lng: -73.997}
    });
    locate();
}

function markLocation(coordinates) {
    map.setZoom(15);
    map.panTo(coordinates);
    var marker = new google.maps.Marker({
        map: map,
        position: coordinates
    });
}

function locate(address) {
    if(!address){
        return;
    }

    var client = new XMLHttpRequest();
    client.open("POST", "/getCoordinate", false);
    client.setRequestHeader("Content-type", "application/json");
    client.send('{"address" : "'+address+'"}');

    var coordinate = JSON.parse(client.responseText);
    markLocation(coordinate);
}
