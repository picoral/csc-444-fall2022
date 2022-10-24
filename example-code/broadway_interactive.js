// create spec
var spec = { 
    description: "A plot of broadway plays",
    width: 400,
    height: 300,
    padding: 10,
    signals: [
        {
            name: "mouseX",
            on: [
                {
                    events: "*:mousemove",
                    update: "event.x"
                }
            ]
        },
        {
            name: "mouseY",
            on: [
                {
                    events: "*:mousemove",
                    update: "event.y"
                }
            ]
        },
        {
            name: "displayText",
            value: {},
            on: [
                {
                    events: "symbol:mouseover",
                    update: "datum"
                },
                {
                    events: "symbol:mouseout",
                    update: "{}"
                }
            ]
        },
        { 
            name: "show",
            value: ["Jersey Boys"],
            bind: {
                input: "select",
                options: ['Jersey Boys', 'Wicked', 'Cats'],
                element: "#selector"
            }
        }
    ],
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
                expr: "datum.show == show || datum.show == 'The Lion King'"
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
        },
        {
            type: "text",
            encode: {
                enter: {
                    dx: { value: -10 },
                    dy: { value: -10 },
                    align: { value: "center" },
                    x: { value: 200 },
                    y: { value: 200 }
                },
                update: {
                    x: { signal: "displayText.week_number", scale: "xScale" },
                    y: [
                        { test: "displayText.total > 0", 
                          signal: "displayText.total", 
                          scale: "yScale"},
                        { value: 200 }
                    ],
                    text: { signal: "round(displayText.total / 1000000)" },
                    fillOpacity: [
                        { test: "displayText.total > 0", value: 1 },
                        { value: 0 }
                    ]
                }
            }
    }
    ],
    legends: [
        {
            fill: "colorScale",
            title: "shows"
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