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
                expr: "datum.show == 'The Phantom of the Opera' || datum.show == 'The Lion King'"
            },
            {
                type: "filter",
                expr: "datum.avg_ticket_price > 0"
            }
          ]
        }
    ],
    scales: [
        {
            name: "xScale",
            domain: { data: "broadway", field: "week_number" },
            range: "width",
            zero: false
        },
        {
            name: "yScale",
            domain: { data: "broadway", field: "weekly_gross" },
            range: "height",
            zero: true
        },
        {
            name: "colorScale",
            type: "ordinal",
            domain: { data: "broadway", field: "show"},
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
            from: { data: "broadway" },
            encode: {
                enter: {
                    x: { field: "week_number", scale: "xScale" },
                    y: { field: "weekly_gross", scale: "yScale" },
                    fillOpacity: { value: .5 },
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
        text: "Plot 2: Weekly gross across week number play is on Broadway"
    }
};

// create runtime
var runtime = vega.parse(spec);

// create view
var view = new vega.View(runtime)
                   .logLevel(vega.Error)
                   .renderer("svg")
                   .initialize("#question_4_d")
                   .hover();

// run it
view.run();