// create spec
var spec = { 
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    description: "A plot of lego themes",
    width: 500,
    height: 300,
    padding: 50,
    data: [
        {
            name: "legoThemes",
            url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/lego_themes.json",
            transform: [
                {
                    type: "collect",
                    sort: { field: "n", order: "descending" }
                }
            ]
        }
    ],
    scales: [
        {
            name: "xScale",
            type: "band",
            domain: { data: "legoThemes", field: "theme"},
            range: "width",
            padding: 0.6
        },
        {
            name: "yScale",
            type: "linear",
            domain: { data: "legoThemes", field: "n" },
            range: "height"
        }
    ],
    marks: [
        {
            type: "rect",
            from: { data: "legoThemes"},
            encode: {
                enter: {
                    x: { field: "theme", scale: "xScale"},
                    y2: { value: 0, scale: "yScale"},
                    y: { field: "n", scale: "yScale"},
                    width: { value: 30},
                    fill: { value: "dimgray" },
                    fillOpacity: { value: .8 },
                    stroke: { value: "black" }
                }
            }
        },
        {
            type: "text",
            from: { data: "legoThemes" },
            encode: {
                enter: {
                    x: { field: "theme", scale: "xScale" },
                    y: { field: "n", scale: "yScale" },
                    text: { field: "n" },
                    align: { value: "center" },
                    dx: { value: 15 },
                    dy: { value: 10 },
                    fill: { value: "white" }
                }
            }
        }
    ],
    axes: [
        { 
            scale: "xScale",
            orient: "bottom",
            title: "Theme"
        },
        {
            scale: "yScale",
            orient: "left",
            title: "Number of Lego sets",
            grid: true
        }
    ],
    title: {
        text: "Number of lego sets by theme"
    }
};

// create runtime
var runtime = vega.parse(spec);

// create view
var view = new vega.View(runtime)
                   .logLevel(vega.Error)
                   .renderer("svg")
                   .initialize("#view")
                   .hover();

// run it
view.run();