// create spec
var spec = { 
    description: "A plot of avocado prices",
    width: 400,
    height: 300,
    padding: 50,
    autosize: "fit",
    data: [
        {
          name: "avocado",
          url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/avocado.csv",
          format: { type: "csv"}
        },
        {
            name: "counts",
            source: "avocado",
            transform: [
                {
                    type: "aggregate",
                    groupby: ["year"]
                }
            ]
        },
        {
            name: "aggregated",
            source: "avocado",
            transform: [
                {
                    type: "aggregate",
                    groupby: ["year"],
                    fields: ["AveragePrice"],
                    ops: ["mean"],
                    as: ["m"]
                }
            ]
        }
    ],
    scales: [
        {
            name: "xScale",
            domain: [2014, 2018],
            range: "width",
            zero: false
        },
        {
            name: "yScale",
            domain: { data: "aggregated", field: "m" },
            range: "height",
            zero: false
        }
    ],
    axes: [
        {
            scale: "xScale",
            orient: "bottom",
            tickCount: 5,
            title: "year",
            format: "d"
        },
        {
            scale: "yScale",
            orient: "left",
            title: "mean price in dollars"
        }
    ],
    marks: [
        {
            type: "line",
            from: { data: "aggregated" },
            encode: {
                enter: {
                    x: { field: "year", scale: "xScale" },
                    y: { field: "m", scale: "yScale" }
                }
            }
        },
        {
            type: "symbol",
            from: { data: "aggregated" },
            encode: {
                enter: {
                    x: { field: "year", scale: "xScale" },
                    y: { field: "m", scale: "yScale" }
                }
            }
        }
    ],
    title: {
        text: "Plot 2: Average avocado price 2015-2018"
    }
};

// create runtime
var runtime = vega.parse(spec);

// create view
var view = new vega.View(runtime)
                   .logLevel(vega.Error)
                   .renderer("svg")
                   .initialize("#question_1_b")
                   .hover();

// run it
view.run();