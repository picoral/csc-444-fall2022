// create spec
var spec = {
    description: "A plot of baby names",
    width: 500,
    height: 500,
    padding: 50,
    data: [
        {
            name: "babyNames",
            url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/baby_names.csv",
            format: { type: "csv" },
            transform: [
                {
                    type: "filter",
                    expr: "datum.name == 'Adriana'"
                }
            ]
        }
    ],
    scales: [
        {
            name: "xScale",
            type: "linear",
            domain: { data: "babyNames", field: "year" },
            range: "width",
            zero: false
        },
        {
            name: "yScale",
            type: "linear",
            domain: { data: "babyNames", field: "count" },
            range: "height"
        },
        {
            name: "colorScale",
            type: "ordinal",
            domain: { data: "babyNames", field: "sex" },
            range: { scheme: "category10" }
        }
    ],
    axes: [
        {
            scale: "xScale",
            orient: "bottom",
            format: "d"
        },
        {
            scale: "yScale",
            orient: "left"
        }
    ],
    marks: [
        {
            type: "symbol",
            from: { data: "babyNames" },
            encode: {
                enter: {
                    x: { field: "year", scale: "xScale" },
                    y: { field: "count", scale: "yScale"},
                    fill: { field: "sex", scale: "colorScale" }
                }
            }
        }
    ],
    legends: [
        {
            fill: "colorScale"
        }
    ] 
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