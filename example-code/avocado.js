// create spec
var spec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    width: 600,
    height: 600,
    padding: 50,
    data: [
        {
            name: "avocado",
            url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/avocado.csv",
            format: { type: "csv" }
        },
        {
            name: "averages",
            source: "avocado",
            transform: [
                {
                    type: "aggregate",
                    groupby: ["year"],
                    fields: ["AveragePrice"],
                    ops: ["mean"],
                    as: ["meanPrice"]
                }
            ]
        }
    ],
    scales: [
        {
            name: "xScale",
            type: "linear",
            domain: [2014, 2018],
            range: "width",
            zero: false
        },
        {
            name: "yScale",
            type: "linear",
            domain: { data: "averages", field: "meanPrice"},
            range: "height",
            zero: true
        }

    ],
    axes : [
        {
            scale: "xScale",
            orient: "bottom",
            tickCount: 4,
            format: "d",
            title: "year"
        },
        {
            scale: "yScale",
            orient: "left",
            title: "mean avocado price in US dollars"
        }
    ],
    marks: [
        {
            type: "symbol",
            from: { data: "averages" },
            encode: {
                enter: {
                    x: { field: "year", scale: "xScale" },
                    y: { field: "meanPrice", scale: "yScale" }
                }
            }
        },
        {
            type: "line",
            from: { data: "averages" },
            encode: {
                enter: {
                    x: { field: "year", scale: "xScale" },
                    y: { field: "meanPrice", scale: "yScale" }
                }
            }
        }
    ],
    title: {
        text: "Mean price of avocados 2015-2018"
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