// print to screen to see if code is working
console.log('working');

//Create map layer with zoom level
let map = L.map("simpleMap").setView([37.6213, -122.3790], 5);

// Create a variable that holds an array of the points on the line
let line = [
    [33.9416, -118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
];

// Add a polyline to the map using the variable line defined above
L.polyline(line, {
    color:  'blue',
    weight:  4,
    dashArray: '10, 40'
}).addTo(map);
// An array containing each city's location, state, and population.

let citiesData = cities;

//add a marker to the simple map for Los Angeles, CA.  
//Loop through the cities array and, for each city object, populate the marker
citiesData.forEach(function(city) {
    // console.log(city.location[1]);
    L.circleMarker(city.location,{
        radius:  city.population/200000,
        color:  'orange',
        fillColor:  'orange',
        lineWeight:  4
    }).addTo(map).bindPopup(`${city.city}, 
    ${city.state}<hr> population: ${city.population.toLocaleString()}`);
});

// create a circle over central LA
var circle = L.circleMarker([34.0522, -118.2437], {
    radius:  300,
    color:  'black',
    fillColor:  'yellow',
    fillOpacity:  0.2
})//.addTo(map);



//Create tile layer for background of our map using streets style
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution:  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom:  18,
//     accessToken:  API_KEY
// });

// Create tile layer using dark style
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution:  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom:  18,
    accessToken:  API_KEY
});


streets.addTo(map);

