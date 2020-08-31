
function continuous(selector_id, colorscale) {
  var legendheight = 200,
      legendwidth = 80,
      margin = {top: 10, right: 60, bottom: 10, left: 2};

  var canvas = d3.select(selector_id)
    .style("height", legendheight + "px")
    .style("width", legendwidth + "px")
    .style("position", "relative")
    .append("canvas")
    .attr("height", legendheight - margin.top - margin.bottom)
    .attr("width", 1)
    .style("height", (legendheight - margin.top - margin.bottom) + "px")
    .style("width", (legendwidth - margin.left - margin.right) + "px")
    .style("border", "1px solid #000")
    .style("position", "absolute")
    .style("top", (margin.top) + "px")
    .style("left", (margin.left) + "px")
    .node();

  var ctx = canvas.getContext("2d");

  var legendscale = d3.scaleLinear()
    .range([1, legendheight - margin.top - margin.bottom])
    .domain(colorscale.domain());

  // image data hackery based on http://bl.ocks.org/mbostock/048d21cf747371b11884f75ad896e5a5
  var image = ctx.createImageData(1, legendheight);
  d3.range(legendheight).forEach(function(i) {
    var c = d3.rgb(colorscale(legendscale.invert(i)));
    image.data[4*i] = c.r;
    image.data[4*i + 1] = c.g;
    image.data[4*i + 2] = c.b;
    image.data[4*i + 3] = 255;
  });
  ctx.putImageData(image, 0, 0);

  // A simpler way to do the above, but possibly slower. keep in mind the legend width is stretched because the width attr of the canvas is 1
  // See http://stackoverflow.com/questions/4899799/whats-the-best-way-to-set-a-single-pixel-in-an-html5-canvas
  /*
  d3.range(legendheight).forEach(function(i) {
    ctx.fillStyle = colorscale(legendscale.invert(i));
    ctx.fillRect(0,i,1,1);
  });
  */

  var legendaxis = d3.axisRight()
    .scale(legendscale)
    .tickSize(6)
    .ticks(8);

  var svg = d3.select(selector_id)
    .append("svg")
    .attr("height", (legendheight) + "px")
    .attr("width", (legendwidth) + "px")
    .style("position", "absolute")
    .style("left", "0px")
    .style("top", "0px")

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + (legendwidth - margin.left - margin.right + 3) + "," + (margin.top) + ")")
    .call(legendaxis);
};
// The svg
var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");
var tmax=10
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
  .domain([0, window.tmax])
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
continuous("#legend", colorScale);