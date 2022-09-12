var mainDiv = d3.select("#mainDiv")
var mySvg = mainDiv.append("svg")
                   .attr("width", 500)
                   .attr("height", 300);

for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 6; j++) {
        mySvg.append("rect")
        .attr("class", "r" + i + j)
        .attr("x", j * 60)
        .attr("y", i * 80);
    }
    
}

mySvg.selectAll("rect")
     .attr("height", 40)
     .attr("width", 40);


mySvg.append("text")
     .text("hue")
     .attr("x", "350")
     .attr("y", "25")

mySvg.select(".r00")
     .attr("fill", "#FF0000");

mySvg.select(".r01")
     .attr("fill", "#00FF00");

mySvg.select(".r02")
     .attr("fill", "#0000FF");

mySvg.select(".r03")
     .attr("fill", "#FFFF00")

mySvg.select(".r04")
     .attr("fill", "#FF00FF")

mySvg.select(".r05")
     .attr("fill", "#00FFFF")


mySvg.append("text")
     .text("saturation")
     .attr("x", "350")
     .attr("y", "105")

//mySvg.select(".r10")
//     .attr("fill", "#550055")

//mySvg.select(".r11")
//     .attr("fill", "#770077")

//mySvg.select(".r12")
//     .attr("fill", "#990099")

//mySvg.select(".r13")
//     .attr("fill", "#BB00BB")

//mySvg.select(".r14")
//     .attr("fill", "#DD00DD")

//mySvg.select(".r15")
//     .attr("fill", "#FF00FF")


mySvg.select(".r10")
     .attr("fill", "hsl(10,0%,50%)")

mySvg.select(".r11")
     .attr("fill", "hsl(10,20%,50%)")

mySvg.select(".r12")
     .attr("fill", "hsl(10,40%,50%)")

mySvg.select(".r13")
     .attr("fill", "hsl(10,60%,50%)")

mySvg.select(".r14")
     .attr("fill", "hsl(10,80%,50%)")

mySvg.select(".r15")
     .attr("fill", "hsl(10,100%,50%)")


mySvg.append("text")
     .text("luminance")
     .attr("x", "350")
     .attr("y", "185")

mySvg.select(".r20")
     .attr("fill", "hsl(10,50%,20%)")

mySvg.select(".r21")
     .attr("fill", "hsl(10,50%,30%)")

mySvg.select(".r22")
     .attr("fill", "hsl(10,50%,40%)")

mySvg.select(".r23")
     .attr("fill", "hsl(10,50%,50%)")

mySvg.select(".r24")
     .attr("fill", "hsl(10,50%,70%)")

mySvg.select(".r25")
     .attr("fill", "hsl(10,50%,90%)")