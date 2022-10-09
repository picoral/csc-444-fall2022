// create spec
var spec = { 
    description: "A plot of broadway plays",
    width: 400,
    height: 300,
    padding: 50,
    data: [
        {
          name: "broadway",
          url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/broadway.csv",
          format: { type: "csv"},
          transform: [
            {
                type: "filter",
                expr: "datum.show == 'Cats' || datum.show == 'The Lion King'"
            },
            {
                type: "filter",
                expr: "datum.avg_ticket_price > 0 & datum.week_number < 53"
            }
          ]
        },
        {
            name: "aggregated",
            source: "broadway",
            transform: [
                {
                    type: "aggregate",
                    groupby: ["week_number", "show"],
                    fields: ["weekly_gross"],
                    ops: ["sum"],
                    as: ["total_gross"]
                }
            ]
        }
    ],
    scales: [
        {
            name: "xScale",
            domain: { data: "aggregated", field: "week_number" },
            range: "width",
            zero: true
        },
        {
            name: "yScale",
            domain: { data: "aggregated", field: "total_gross" },
            range: "height",
            zero: true
        },
        {
            name: "colorScale",
            type: "ordinal",
            domain: { data: "aggregated", field: "show"},
            range: { scheme: "category10" }
        }
    ],
    axes: [
        {
            scale: "xScale",
            orient: "bottom",
            title: "Week Number"
        },
        {
            scale: "yScale",
            orient: "left",
            title: "Total Weekly Gross (in US dollars)"
        }
    ],
    marks: [
        {
            type: "symbol",
            from: { data: "aggregated" },
            encode: {
                enter: {
                    x: { field: "week_number", scale: "xScale" },
                    y: { field: "total_gross", scale: "yScale" },
                    fill: { field: "show", scale: "colorScale"}
                }
            }
        }
    ],
    legends: [
        {
            fill: "colorScale"
        }
    ],
    title: {
        text: "Plot 2:  Total weekly gross across week number play is on Broadway"
    }
};

// create runtime
var runtime = vega.parse(spec);

// create view
var view = new vega.View(runtime)
                   .logLevel(vega.Error)
                   .renderer("svg")
                   .initialize("#question_5_b")
                   .hover();

// run it
view.run();