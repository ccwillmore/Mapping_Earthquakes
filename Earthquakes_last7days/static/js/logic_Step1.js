// print to screen to see if code is working
console.log('working');




let earthquakeData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

//Create tile layer for background of our map using streets style
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution:  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom:  18,
    accessToken:  API_KEY
});

// Create tile layer using dark style
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution:  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom:  18,
    accessToken:  API_KEY
});

let baseMaps = {
    Streets:  streets,
    Satellite:  satellite
};

//Create map layer with zoom level
let map = L.map("simpleMap", {
    center:  [39.5,-98.5],
    zoom:  3,
    layers:  [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//Create a style for the lines
// let myStyle = {
//     color:  'yellow',
//     weight:  2
// };

d3.json(earthquakeData).then(function(data) {
    console.log(data);
    L.geoJson(data, {
        onEachFeature:  function(feature, layer) {
            layer.bindPopup(`Magnitude:  ${feature.properties.mag}`);
        }
    }).addTo(map);
 

    
});




