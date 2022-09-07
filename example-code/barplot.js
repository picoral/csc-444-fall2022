var forecasts = [
    { city: "DCA", temperature: 92,  order: 0 },
    { city: "JFK", temperature: 96,  order: 1 },
    { city: "SEA", temperature: 77,  order: 2 },
    { city: "TUS", temperature: 102, order: 3 },
    { city: "SFO", temperature: 65,  order: 4 }
];

// select main div
var mainDiv = d3.select("#mainDiv");

// append svg element and assign node to variable
var svg1 = mainDiv.append("svg").attr("height", 300).attr("width", 300);

// add rectangle to svg1
var rectangle = svg1.append("rect");

forecasts.forEach(function(element) {
    svg1.append("rect")
                   .attr("height", element.temperature)
                   .attr("x", element.order * 40 + 50)
                   .attr("y", 230 - element.temperature);
    svg1.append("text")
            .attr("x", element.order * 40 + 50)
            .attr("y", 250)
            .text(element.city);
    svg1.append("text")
            .text(element.temperature)
            .attr("x", element.order * 40 + 67)
            .attr("y", 250 - element.temperature)
            .attr("text-anchor", "middle")
            .attr("fill", "white");
});

svg1.selectAll("rect").attr("width", 34).style("fill", "steelblue");


