// create spec
var spec = { 
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "A plot of lego themes",
    width: 500,
    height: 300,
    padding: 5,
    data: [
        {
            name: "lego_themes",
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
            domain: { data: "lego_themes", field: "theme"},
            range: "width",
            padding: .4
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
            from: { data: "lego_themes" },
            encode: {
                enter: {
                    x: { field: "theme", scale: "xScale"},
                    y2: { value: 0, scale: "yScale"},
                    y: { field: "n", scale: "yScale"},
                    width: { value: 30}
                }
            }
        },
        {
            type: "text",
            from: { data: "lego_themes" },
            encode: {
                enter: {
                    x: { field: "theme", scale: "xScale" },
                    y: { field: "n", scale: "yScale" },
                    text: { field: "n"},
                    dy: { value: 10 },
                    dx: { value: 5 },
                    fill: { value: "white" }
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
        text: "Plot 2: Number of lego sets by theme"
    }
};

// create runtime
var runtime = vega.parse(spec);

// create view
var view = new vega.View(runtime)
                   .logLevel(vega.Error)
                   .renderer("svg")
                   .initialize("#question_2_d")
                   .hover();

// run it
view.run();