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
                expr: "datum.week_number < 53"
            },
            { 
                type: "filter",
                expr: "datum.show == 'Jersey Boys' || datum.show == 'Wicked'"
            }
          ]
        },
        {
            name: "aggregated",
            source: "broadway",
            transform: [
                {
                    type: "aggregate",
                    groupby: ["show", "week_number"],
                    fields: ["weekly_gross"],
                    ops: ["sum"],
                    as: ["total"]
                },
                {
                    type: "formula",
                    as: "week_number",
                    expr: "datum.week_number / 1"
                },
                {
                    type: "collect",
                    sort: { field: "week_number" }
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
            domain: { data: "aggregated", field: "total" },
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
                    y: { field: "total", scale: "yScale" },
                    fill: { field: "show", scale: "colorScale"}
                }
            }
        },
        {
            type: "group",
            from: { 
                facet: {
                    name: "series",
                    data: "aggregated",
                    groupby: "show"
                }
            },
            marks: [
                {
                    type: "line",
                    from: { data: "series" },
                    encode: {
                        enter: {
                            x: { field: "week_number", scale: "xScale" },
                            y: { field: "total", scale: "yScale" },
                            stroke: { field: "show", scale: "colorScale"}
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
    ],
    title: {
        text: "Total weekly gross across week number play is on Broadway"
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