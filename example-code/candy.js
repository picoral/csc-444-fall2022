// create spec
var spec = { 
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "A plot of halloween candy",
    width: 400,
    height: 600,
    padding: 10,
    signals: [
      {
        name: "chocolate",
        value: true,
        bind: {
            input: "checkbox",
            element: "#selector"
        }
      },
      {
        name: "caramel",
        value: true,
        bind: {
            input: "checkbox",
            element: "#selector"
        }
      }
    ],
    data: [
        {
            name: "candy",
            url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/candy-data.csv",
            format: { type: "csv"},
            transform: [
                {
                    type: "filter",
                    expr: "datum.chocolate == chocolate && datum.caramel == caramel"
                },
                {
                    type: "collect",
                    sort: { field: "winpercent" }
                }
                
            ]
        }
    ],
    scales: [
        {
            name: "xScale",
            type: "linear",
            domain: { data: "candy", field: "winpercent"},
            range: "width"
        },
        {
            name: "yScale",
            type: "band",
            domain: { data: "candy", field: "competitorname"},
            range: "height"
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
    marks: [
        {
            type: "symbol",
            from: { data: "candy" },
            encode: {
                update: {
                    x: { field: "winpercent", scale: "xScale" },
                    y: { field: "competitorname", scale: "yScale"}
                }
            }
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