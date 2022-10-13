// create spec
var spec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "A plot of baby names",
    width: 700,
    height: 300,
    padding: 10,
    data: [
        {
            name: "babyNames",
            url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/baby_names.csv",
            format: { type: "csv"},
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
            domain: { data: "babyNames", field: "year"},
            range: "width",
            zero: false
        },
        {
            name: "yScale",
            type: "linear",
            domain: { data: "babyNames", field: "count"},
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
                    y: { field: "count", scale: "yScale" },
                    fill: { field: "sex", scale: "colorScale" }
                }
            }
        },
        {
            type: "group",
            from: { 
                facet: {
                    name: "series",
                    data: "babyNames",
                    groupby: "sex"
                }
            },
            marks: [
                {
                    type: "line",
                    from: { data: "series" },
                    encode: {
                        enter: {
                            x: { field: "year", scale: "xScale" },
                            y: { field: "count", scale: "yScale" },
                            stroke: { field: "sex", scale: "colorScale" },
                            strokeWidth: { value: 2 }
                        }
                    }
                }

            ]
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