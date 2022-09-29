// create spec
var spec = { 
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    description: "A plot of lego themes",
    width: 500,
    height: 300,
    padding: 5,
    data: [
        {
            name: "lego_themes",
            url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/lego_themes.json"
        }
    ],
    scales: [
        {
            name: "xScale",
            type: "band",
            domain: { data: "lego_themes", field: "theme"},
            range: "width",
            padding: 0.6
        },
        {
            name: "yScale",
            type: "linear",
            domain: { data: "lego_themes", field: "n" },
            range: "height"
        }
    ],
    marks: [
        {
            type: "rect",
            from: { data: "lego_themes"},
            encode: {
                enter: {
                    x: { field: "theme", scale: "xScale"},
                    y2: { value: 0, scale: "yScale"},
                    y: { field: "n", scale: "yScale"},
                    width: { value: 20}
                }
            }
        }
    ],
    axes: [
        { 
            scale: "xScale",
            orient: "bottom"
        },
        {
            scale: "yScale",
            orient: "left"
        }
    ],
    title: {
        text: "Plot 1: Number of lego sets by theme"
    }
};

// create runtime
var runtime = vega.parse(spec);

// create view
var view = new vega.View(runtime)
                   .logLevel(vega.Error)
                   .renderer("svg")
                   .initialize("#question_2_a")
                   .hover();

// run it
view.run();