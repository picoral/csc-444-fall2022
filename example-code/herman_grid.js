var mainDiv = d3.select("#mainDiv")
var mySvg = mainDiv.append("svg")
                   .attr("width", 400)
                   .attr("height", 400);



for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++){
        mySvg.append("rect")
        .attr("x", i * 100)
        .attr("y", j * 100);

    }
        
};

mySvg.selectAll("rect")
     .attr("height", 90)
     .attr("width", 90);