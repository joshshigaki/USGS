// Store our API endpoint as queryUrl
// const queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
//   "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  // "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL
earthquakeData = d3.json(queryUrl, function(data) {
  console.log(data.features);
  // Using the features array sent back in the API data, create a GeoJSON layer and add it to the map
  // createFeatures(data.features);
});


// Define arrays to hold created city and state markers
let cityMarkers = [];
let magnitude = [];

// Loop through locations and create city and state markers
for (let i = 0, ii = earthquakeData.features.magnitude; i < ii; i++) {
  // Setting the marker radius for the state by passing population into the markerSize function
  magnitude.push(
    L.circle(earthquakeData[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "white",
      fillColor: "white",
      radius: markerSize(locations[i].state.population)
    })
  );

  // Setting the marker radius for the city by passing population into the markerSize function
  cityMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "purple",
      fillColor: "purple",
      radius: markerSize(locations[i].city.population)
    })
  );
  console.log(magnitude);
}






// function createMap(earthquakes) {
//   // Define streetmap and darkmap layers
//   const streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
//     "access_token={accessToken}", {
//       accessToken: API_KEY
//     });

//   const darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
//     "access_token={accessToken}", {
//       accessToken: API_KEY
//     });

//   // Define a baseMaps object to hold our base layers
//   const baseMaps = {
//     "Light Map": streetmap,
//     "Dark Map": darkmap
//   };

//   const overlayMaps = {
//     "Earthquakes": earthquakes
//     // "Magnitude": magnitude
//   }

//   // Create a new map
//   const myMap = L.map("map", {
//     center: [
//       34.0522, -118.2437
//     ],
//     zoom: 5,
//     layers: [streetmap, earthquakes]
//   });

//   // Create a layer control containing our baseMaps
//   // Be sure to add an overlay Layer containing the earthquake GeoJSON
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);
// }

// function createFeatures(features) {
//   function onEachFeature(feature, layer) {
//     layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
//     <p>${feature.properties.mag}</p>`);
//   }
  
//   let earthquakes = L.geoJSON(features, {
//     onEachFeature: onEachFeature
//   });

//   let magnitude = L.geoJSON(features, {
//     onEachFeature: onEachFeature
//   });

//   createMap(earthquakes);
// }