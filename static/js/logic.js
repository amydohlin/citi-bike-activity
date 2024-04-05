// let newYorkCoords = [40.73, -74.0059];
// let mapZoomLevel = 12;
// // let url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json';

// // let myMap = L.map("map-id", {
// //   center: newYorkCoords,
// //   zoom: mapZoomLevel,
// //   layers:[tile, bikeStations]
// // })

// // Create the createMap function.
// function createMap(bikeStations) {

//   // Create the tile layer that will be the background of our map.
//   tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   });

//   // Create a baseMaps object to hold the lightmap layer.
//   let baseMaps = {"Street Maps": tile};

//   // Create an overlayMaps object to hold the bikeStations layer.
//   let overlayMaps= {"Bike Stations":bikeStations};

//   // Create the map object with options.
//   let myMap = L.map("map-id", {
//     center: newYorkCoords,
//     zoom: mapZoomLevel,
//     layers:[tile, bikeStations]
//   })
  

//   // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {collapsedColon: false}).addTo(myMap);
// }
// // Create the createMarkers function.
// function createMarkers(response) {

//   // Pull the "stations" property from response.data.
//   stations = response.data.stations;
//   // Initialize an array to hold the bike markers.
//   let bikeMarkers = []
//   // Loop through the stations array.
//   for (let i = 0; i < stations.length; i++){
//     let station= stations[i]
//     // For each station, create a marker, and bind a popup with the station's name.
//     // let location = features[i].geometry;
//     // if(location){
//       L.marker([station.lat, station.lon]).bindPopup(`${station.name}, ${station.capacity}`)
//     // }
 
//     // Add the marker to the bikeMarkers array.
//     bikeMarkers.push(marker)
//   }
//   // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
//   let layerGroups = L.layerGroup(bikeMarkers);
//   createMap(layerGroups);
  
// }
// // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
// let url = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json';
// d3.json(url).then(createMarkers);

// From Indu:
let newYorkCoords = [40.73, -74.0059];
let mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeMarkers){

  // Create the tile layer that will be the background of our map.
  let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

  // Create a baseMaps object to hold the lightmap layer.
  let baseMaps = {
    "streetMaps": streetMap
  }

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    "bikeStations": bikeMarkers
  }

  // Create the map object with options.
  let myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [streetMap, bikeMarkers]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}
// Create the createMarkers function.
function markers(response) {

  // Pull the "stations" property from response.data.
  let stations = response.data.stations
  // Initialize an array to hold the bike markers.
  let bikeMarkers = []

  // Loop through the stations array.
    // For each station, create a marker, and bind a popup with the station's name.
    for (let i=0; i < stations.length; i++){
      let station = stations[i]

    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(
      L.marker([station.lat, station.lon])
      .bindPopup(`<h1>${station.name}</h1> <hr> <h3>Capacity ${station.capacity.toLocaleString()}</h3>`)
    )
  }
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bikeMarkers))
}

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(markers)