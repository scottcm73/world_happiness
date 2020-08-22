
// The svg
var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(200)
  .translate([width / 2, height / 2]);

  var keyval="happiness_score"
  var maincsv="resources/2015_with_codes.csv"
  
  
  // Data and color scale
  var data = d3.map();
  var colorScale = d3.scaleSequential()
    .domain([0,10])
    .interpolator(d3.interpolateRainbow);

//Load external data and boot
// function getMetric() {
//   keyval=d3.select("#metric").property("value");
//   return keyval
// }

keyval=getMetric()
console.log(keyval)

d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, maincsv, function(d) { data.set(d.code, +d[keyval]); })
  .await(ready);

function ready(error, topo) {

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      });
    }
