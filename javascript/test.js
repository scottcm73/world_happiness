function continuous(selector_id, colorscale) {
  var legendheight = 200,
      legendwidth = 80,
      margin = {
          top: 10,
          right: 60,
          bottom: 10,
          left: 2
      };

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
      image.data[4 * i] = c.r;
      image.data[4 * i + 1] = c.g;
      image.data[4 * i + 2] = c.b;
      image.data[4 * i + 3] = 255;
  });
  ctx.putImageData(image, 0, 0);

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

//The svg
var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");
var csvlist = ["2015wc.csv", "2016wc.csv", "2017wc.csv", "2018wc.csv", "2019wc.csv"];

var tmax = 10
// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(200)
  .translate([width / 2, height / 2]);
if (sessionStorage.getItem("localmetric") === null) {
  var keyval = d3.select("#metric").property("value");
} else {
  keyval = sessionStorage.getItem("localmetric");
  d3.select('#metric').property('value', sessionStorage.getItem("localmetric"))
};

if (sessionStorage.getItem("localhyear") === null) {
  var maincsv = d3.select("#hyear").property("value");
  console.log(maincsv)
  csvlist.splice(csvlist.indexOf(maincsv), 1)

  window.csvlistpath = csvlist.map(d => "../resources/" + d);
  console.log(csvlist)
  window.maincsv = "../resources/" + window.maincsv;
} else {
  var maincsv = sessionStorage.getItem("localhyear");
  d3.select("#hyear").property("value", sessionStorage.getItem("localhyear"));
  console.log(maincsv)
  csvlist.splice(csvlist.indexOf(maincsv), 1)
  window.csvlistpath = csvlist.map(d => "../resources/" + d);

  console.log(csvlist)
  window.maincsv = "../resources/" + window.maincsv;
};

if (keyval == "happiness_score") {
  tmax = 10;
} else if (keyval == "gdp_per_capita") {
  tmax = 1.4;
} else if (keyval == "trust_(government_corruption)") {
  tmax = .5;
} else if (keyval == "freedom") {
  tmax = .68
} else if (keyval == "health_(life_expectancy)") {
  tmax = 1;
} else {
  tmax = 1;
}

function promise3() {
  new Promise((resolve, reject) => {


      for (var i = 0; i < window.csvlistpath.length; i++) {

          d3.csv(window.csvlistpath[i])
      }
  })
};
d3.select('#metric')
  .on('change', function() {
      //some browsers reset the selector as "happiness_score" after reload. This keeps the value.
      window.keyval = d3.select("#metric").property("value");
      sessionStorage.setItem("localmetric", d3.select("#metric").property("value"));
      console.log(window.keyval)
      window.location.reload()
      d3.select('#myselect').property('value', sessionStorage.getItem("localmetric"));
  });

d3.select('#hyear')
  .on('change', function() {
      //some browsers reset the selector as "happiness_score" after reload. This keeps the value.
      window.maincsv = d3.select("#hyear").property("value");
      sessionStorage.setItem("localhyear", d3.select("#hyear").property("value"));
      console.log(window.maincsv)
      window.location.reload()
      d3.select('#myselect2').property('value', sessionStorage.getItem("localhyear"))
  });

var data = new Map();
Promise.all([
  d3.json("../resources/geojson/world.geojson"),
  d3.csv(window.maincsv), promise3()
]).then(d =>
  ready(null, d[0], d[1])
);

// Data and color scale


var colorScale = d3.scaleSequential()
  .domain([0, window.tmax])
  .interpolator(d3.interpolateSpectral)

function ready(error, topo, stats) {

  stats.forEach(d => data.set(d.code, +d[window.keyval]));


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
      .attr("fill", function(d) {
          d.total = data.get(d.id) || 0;
          return colorScale(d.total);
      });
}
continuous("#legend", colorScale);