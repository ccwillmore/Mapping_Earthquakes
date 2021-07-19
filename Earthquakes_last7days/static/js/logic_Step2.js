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



d3.json(earthquakeData).then(function(data) {
    var styleLocal = "";
    function styleInfo(feature) {
        return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
        }
    };
    function getRadius(magnitude) {
        // console.log(magnitude);
        if (magnitude <= 0) {
            return 1;
        }
        return magnitude * 4;
    };
    L.geoJson(data, {
        pointToLayer:  function(feature, latlng) {
            // console.log(feature);
            // styleLocal = styleInfo(feature);
            // console.log(styleLocal.radius);
            return L.circleMarker(latlng);
        },
        style:  styleInfo    
    }).addTo(map);
    
    // This function returns the style data for each of the earthquakes we plot on
    // the map. We pass the magnitude of the earthquake into a function
    // to calculate the radius.
    
});   

 

    





