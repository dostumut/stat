

    /*
  var map = L.map('map').setView([-41.2858, 174.78682], 14);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
        }).addTo(map);
  var map = new L.Map("map", {center: [37.8, -96.9], zoom: 4})
  .addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));

  var svg = d3.select(map.getPanes().overlayPane).append("svg"),
  g = svg.append("g").attr("class", "leaflet-zoom-hide");

  d3.json("us-states.json", function(error, collection) {
if (error) throw error;

// code here
function projectPoint(x, y) {
var point = map.latLngToLayerPoint(new L.LatLng(y, x));
this.stream.point(point.x, point.y);
};
var transform = d3.geo.transform({point: projectPoint}),
path = d3.geo.path().projection(transform);
});
var feature = g.selectAll("path")
.data(collection.features)
.enter().append("path");
feature.attr("d", path);
var bounds = path.bounds(collection),
topLeft = bounds[0],
bottomRight = bounds[1];

svg .attr("width", bottomRight[0] - topLeft[0])
.attr("height", bottomRight[1] - topLeft[1])
.style("left", topLeft[0] + "px")
.style("top", topLeft[1] + "px");

g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

*/
var mapboxAccessToken = 'pk.eyJ1IjoiankwMzE4OTIxMSIsImEiOiJ0NmZjUl9NIn0.W8t0L0Y66ytEgdSyjyLG7w';
var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + 'pk.eyJ1IjoiankwMzE4OTIxMSIsImEiOiJ0NmZjUl9NIn0.W8t0L0Y66ytEgdSyjyLG7w', {
id: 'mapbox.light',
}).addTo(map);


L.geoJson(statesData).addTo(map);

function getColor(d) {
return d > 1000 ? '#800026' :
       d > 500  ? '#BD0026' :
       d > 200  ? '#E31A1C' :
       d > 100  ? '#FC4E2A' :
       d > 50   ? '#FD8D3C' :
       d > 20   ? '#FEB24C' :
       d > 10   ? '#FED976' :
                  '#FFEDA0';
};
function style(feature) {
return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
};
};

L.geoJson(statesData, {style: style}).addTo(map);




function highlightFeature(e) {
var layer = e.target;
console.log(layer);
info.update(layer.feature.properties);
layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7

});


if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
}
}

function resetHighlight(e) {
info.update();
geojson.resetStyle(e.target);
}

//var geojson;
// ... our listeners
//geojson = L.geoJson(...)

function zoomToFeature(e) {
map.fitBounds(e.target.getBounds());
}
function onEachFeature(feature, layer) {
layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
});
}

geojson = L.geoJson(statesData, {
style: style,
onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
this.update();
return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
    '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
    : 'Hover over a state');
};

info.addTo(map);


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 10, 20, 50, 100, 200, 500, 1000],
    labels = [];

// loop through our density intervals and generate a label with a colored square for each interval
for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}

return div;
};

legend.addTo(map);
