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

let earthquakes = new L.layerGroup();

let overlays = {
    Earthquakes:  earthquakes
};

//Create map layer with zoom level
let map = L.map("simpleMap", {
    center:  [39.5,-98.5],
    zoom:  3,
    layers:  [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps,overlays).addTo(map);



d3.json(earthquakeData).then(function(data) {
    var styleLocal = "";
    function styleInfo(feature) {
        return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
        }
    };

    function getColor (magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
          }
          if (magnitude > 4) {
            return "#ea822c";
          }
          if (magnitude > 3) {
            return "#ee9c00";
          }
          if (magnitude > 2) {
            return "#eecc00";
          }
          if (magnitude > 1) {
            return "#d4ee00";
          }
          return "#98ee00";
    ;}

    function getRadius(magnitude) {
        // console.log(magnitude);
        if (magnitude <= 0) {
            return 1;
        }
        return magnitude * 4;
    };
    
    L.geoJson(data, {
        pointToLayer:  function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        style:  styleInfo,
        onEachFeature:  function(feature, layer) {
            layer.bindPopup("Magnitude:" + feature.properties.mag + "<br>Location:  " + feature.properties.place);
        }

    }).addTo(earthquakes);
    
    earthquakes.addTo(map);
    // This function returns the style data for each of the earthquakes we plot on
    // the map. We pass the magnitude of the earthquake into a function
    // to calculate the radius.
    
});   

 

    





