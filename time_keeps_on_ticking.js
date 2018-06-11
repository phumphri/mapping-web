// Assign a color to the magnitude of an earthquake.
function earthquake_color(magnitude) {
    magnitude_color = "White"
    if (magnitude > 5) {
        magnitude_color = "Red"
    } else if (magnitude > 4) {
        magnitude_color = "OrangeRed"
    } else if (magnitude > 3) {
        magnitude_color = "Orange"
    } else if (magnitude > 2) {
        magnitude_color = "Yellow"
    } else if (magnitude > 1) {
        magnitude_color = "GreenYellow"
    }
    else {
        magnitude_color = "Green"
    }
    return magnitude_color
}

// Define tile layer.
var light = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoicGh1bXBocmkiLCJhIjoiY2pod3MyNTdiMDQ5NTNtb3ozN3IwanQyMyJ9.8fYEbhtpdC5kWNwMcHF_Mw"
);

var outdoors = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoicGh1bXBocmkiLCJhIjoiY2pod3MyNTdiMDQ5NTNtb3ozN3IwanQyMyJ9.8fYEbhtpdC5kWNwMcHF_Mw"
);

var satellite = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoicGh1bXBocmkiLCJhIjoiY2pod3MyNTdiMDQ5NTNtb3ozN3IwanQyMyJ9.8fYEbhtpdC5kWNwMcHF_Mw"
);

// Only one base layer can be shown at a time
var baseMaps = { Light: light, Outdoors: outdoors, Satellite: satellite };

// Download data for earthquakes and tectonic plates.
var earthquake_source = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// var earthquake_source = "data.json"
let tectonic_plate_source = "PB2002_plates.json"
d3.json(earthquake_source, function (earthquake_data) {
    d3.json(tectonic_plate_source, function (tectonic_plate_data) {
        process_data(earthquake_data, tectonic_plate_data)
    })
});

// Process data for earthquakes and tectonic plates.
function process_data(earthquake_data, tectonic_plate_data) {

    // Process data for earthquakes.
    var earthquake_features = earthquake_data.features
    var earthquake_markers = []
    earthquake_features.forEach(function (earthquake_feature) {

        // console.log("\n", earthquake_feature)

        earthquake_longitude = earthquake_feature.geometry.coordinates[0]
        earthquake_latitude = earthquake_feature.geometry.coordinates[1]
        earthquake_title = earthquake_feature.properties.title
        earthquake_magnitude = earthquake_feature.properties.mag
        earthquake_time = earthquake_feature.properties.time

        earthquake_location = [earthquake_latitude, earthquake_longitude]

        earthquake_marker = L.circle(earthquake_location, {
            fillOpacity: 0.0,
            weight: 0,
            color: earthquake_color(earthquake_magnitude),
            fillColor: earthquake_color(earthquake_magnitude),
            radius: (earthquake_magnitude * 10000),
            className: "path-animation"
            

        })

        // console.log(earthquake_marker)

        earthquake_marker.bindPopup("<h1>" + earthquake_title + "</h1> <hr> <h3>Magnitude: " + earthquake_magnitude + "</h3>")

        earthquake_markers.push(earthquake_marker)

    })

    // Create the layer of earthquake markers.
    var earthquake_layer = L.layerGroup(earthquake_markers);

    // *********************************************
    // *********************************************
    // *********************************************




    // *********************************************
    // *********************************************
    // *********************************************

    // Process data for tectonic plates.
    var tectonic_plate_features = tectonic_plate_data.features
    var tectonic_plate_markers = []
    var myStyle = { "color": "#990000" /* Cardinal */ }

    tectonic_plate_features.forEach(function (tectonic_plate_feature) {

        tectonic_plate_name = tectonic_plate_feature.properties.PlateName

        tectonic_plate_code = tectonic_plate_feature.properties.Code

        tectonic_plate_marker = L.geoJSON(tectonic_plate_feature, { style: myStyle })

        tectonic_plate_marker.bindPopup("<h1>" + tectonic_plate_name + " Plate</h1> <hr> <h3>Code: " + tectonic_plate_code + "</h3>")

        tectonic_plate_markers.push(tectonic_plate_marker)
    })

    tectonic_plate_markers.push(tectonic_plate_marker)

    // Create overlay layers.
    var earthquake_layer = L.layerGroup(earthquake_markers);
    var tectonic_plate_layer = L.layerGroup(tectonic_plate_markers)

    var myMap = L.map("map", {
        center: [40.8021, -124.1637],
        zoom: 6,
        layers: [light, tectonic_plate_layer, earthquake_layer]
    });

    // Overlays that may be toggled on or off
    var overlayMaps = {
        Plates: tectonic_plate_layer,
        Earthquakes: earthquake_layer
    };

    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

    // Setting up the legend
    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {

        var div = L.DomUtil.create("div", "info legend");

        // Add min & max
        var legendInfo = "<h1>Magnitude</h1>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + "0" + "</div>" +
            "<div class=\"max\">" + "5+" + "</div>" +
            "</div>";

        div.innerHTML = legendInfo;

        labels = []
        labels.push("<li style=\"background-color: Green\"></li>");
        labels.push("<li style=\"background-color: GreenYellow\"></li>");
        labels.push("<li style=\"background-color: Yellow\"></li>");
        labels.push("<li style=\"background-color: Orange\"></li>");
        labels.push("<li style=\"background-color: OrangeRed\"></li>");
        labels.push("<li style=\"background-color: Red\"></li>");

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);

    i = 0

    d3.selectAll(".path-animation").each (function () {

        i = i + 1

        style_str = " animation-name:  slow-path; animation-delay: " + (i * 0.01) + "s; animation-duration:  3s; animation-iteration-count: infinite;  "
      
  

        // console.log(this)

        // console.log(Object.keys(this))

        // console.log(this.getAttribute("class"))

        this.setAttribute("style", style_str)

    

    });
        
    


}






