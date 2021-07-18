// print to screen to see if code is working
console.log('working');

//Create map layer with zoom level
let map = L.map("simpleMap").setView([40.7,-94.5],4,4);

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
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution:  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom:  18,
//     accessToken:  API_KEY
// });

// Create tile layer using dark style
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution:  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom:  18,
    accessToken:  API_KEY
});


streets.addTo(map);

