// print to screen to see if code is working
console.log('working');



// An array containing each city's location, state, and population.

let citiesData = cities;

// Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};


// console.log(sanFranAirport.features[0].geometry.coordinates);

// L.geoJson(sanFranAirport, {
//     pointToLayer:  function (feature, latlng) {
        
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup(`${feature.properties.city}, CA <hr>${feature.properties.faa}`)
//     }
// }).addTo(map);

// L.geoJson(sanFranAirport, {
//     onEachFeature:  function(feature, layer) {
//         // console.log(layer);
//         layer.bindPopup(`${feature.properties.city} <hr> airport code:  ${feature.properties.faa}`);
//     }
// }).addTo(map);

// console.log(sanFranAirport[0].properties.geometry.coordinates);

    
   

//add a marker to the simple map for Los Angeles, CA.  
//Loop through the cities array and, for each city object, populate the marker
// citiesData.forEach(function(city) {
//     // console.log(city.location[1]);
//     L.circleMarker(city.location,{
//         radius:  city.population/200000,
//         color:  'orange',
//         fillColor:  'orange',
//         lineWeight:  4
//     }).addTo(map).bindPopup(`${city.city}, 
//     ${city.state}<hr> population: ${city.population.toLocaleString()}`);
// });



// create a circle over central LA
// var circle = L.circleMarker([34.0522, -118.2437], {
//     radius:  300,
//     color:  'black',
//     fillColor:  'yellow',
//     fillOpacity:  0.2
// })//.addTo(map);



//Create tile layer for background of our map using streets style
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution:  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ?? <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom:  18,
    accessToken:  API_KEY
});

// Create tile layer using dark style
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution:  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ?? <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom:  18,
    accessToken:  API_KEY
});

// Create a base map layer that holds both map tile layers
var baseMaps = {
    Street:  streets,
    Dark:  dark
};

//Create map layer with zoom level
let map = L.map("simpleMap", {
    center:  [30,30],
    zoom:  2,
    layers:  [streets]
});

L.control.layers(baseMaps).addTo(map);

// Accessing airport data stored on GitHub
let airportData = "https://raw.githubusercontent.com/ccwillmore/Mapping_Earthquakes/main/majorAirports.json";
// Grabbing geoJson data
d3.json(airportData).then(function(data) {
    for (let i=0;i<35;i++) {
        console.log(data.features[i]);
// Creating a geoJson layer with the airport data
        L.geoJson(data).bindPopup(`Airport code:  ${data.features[i].properties.faa} <hr>City:  ${data.features[i].properties.city}`).addTo(map);
    }
});



