var mainDiv = d3.select("#mainDiv")
var mySvg = mainDiv.append("svg")
                   .attr("width", 400)
                   .attr("height", 400);


for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++){
        mySvg.append("rect")
        .attr("class", "big r" + i + j)
        .attr("x", i * 200)
        .attr("y", j * 200);

        mySvg.append("rect")
        .attr("id", "small")
        .attr("x", i * 200 + 50)
        .attr("y", j * 200 + 50)
        .attr("fill", "#777777");
    };
};

mySvg.selectAll(".big")
     .attr("height", 200)
     .attr("width", 200);

mySvg.selectAll("#small")
     .attr("height", 100)
     .attr("width", 100);

mySvg.select(".r00").attr("fill", "#252525");
mySvg.select(".r01").attr("fill", "#555555");
mySvg.select(".r10").attr("fill", "#959595");
mySvg.select(".r11").attr("fill", "#B5B5B5");