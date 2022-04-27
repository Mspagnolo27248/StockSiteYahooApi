var time_parser = d3.timeParse("%Y-%m-%d")
var data = JSON.parse(myData)
var x_axis = data.map(a => time_parser(convert_to_date(a.date)))
var y_axis = data.map(a => a.close)

var path_data = [];
for (i=0;i<x_axis.length;i++){
    path_data.push({"date":x_axis[i],"value":y_axis[i]})
}

debugger

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

function create_d3_line(data,x_axis,y_axis) {
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(x_axis))
      .range([ 0, width ]);
    svg.append("g")
      .attr("stroke","#C0C0C0")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([d3.min(y_axis), d3.max(y_axis)])
      .range([ height, 0 ]);
    svg.append("g")
      .attr("stroke","#C0C0C0")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(path_data)
      .attr("fill", "none")
      .attr("stroke", "#C0C0C0")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.value) })
        )
}

function convert_to_date(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}







create_d3_line(data,x_axis,y_axis)