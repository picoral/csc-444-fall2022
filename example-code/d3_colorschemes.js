var mainDiv = d3.select("#mainDiv")
var mySvg = mainDiv.append("svg")
                   .attr("width", 400)
                   .attr("height", 400);

d3.schemeBrBG[6].forEach(
    function(color, i) {mySvg.append("rect")
                             .attr("fill", color)
                             .attr("x", i * 50)});

mySvg.selectAll("rect")
     .attr("width", 50)
     .attr("height", 50);
