
// The svg
var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");
var tmax=1
// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(200)
  .translate([width / 2, height / 2]);

var keyval=d3.select("#metric").property("value");
if (keyval=="happiness_score"){tmax=10;} 
  else if(keyval=="gdp_per_capita"){tmax=1.4;}
  else if (keyval=="trust_(government_corruption)"){tmax=.5;}
  else if (keyval=="freedom"){tmax=.68}
  else {tmax=1;}
var maincsv="../resources/2015_with_codes.csv"

d3.select('#metric')
.on('change', function() {
  
  window.keyval=d3.select("#metric").property("value");
  console.log(window.keyval)


  location.reload()
  console.log(window.tmax)
});


d3.queue()
  .defer(d3.json, "../resources/geojson/world.geojson")
  .defer(d3.csv, maincsv, function(d) { data.set(d.code, +d[window.keyval]); })
  .await(ready);

  // Data and color scale
var data = d3.map();

var colorScale = d3.scaleSequential()
  .domain([0, tmax])
  .interpolator(d3.interpolateRainbow);

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
