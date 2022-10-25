// create spec
var spec = { 
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "A plot of Mobility in Arizona",
    width: 400,
    height: 400,
    padding: 10,
    data: [
        {
            name: "mobility",
            url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/arizona-mobility-data.csv",
            format: { type: "csv" },
            transform: [
                {
                    type: "filter",
                    expr: "datum.year == 2020 && datum.county == 'Pima County'"
                }
            ]
        }
    ],
    signals: [
        { name: "offset", value: 100 },
        { name: "cellHeight", value: 200 },
        { name: "facetHeight", update: "3 * (offset + cellHeight)" }
    ],
    scales: [
        {
            name: "xScale",
            type: "linear",
            domain: { data: "mobility", field: "week" },
            range: "width"
        },
        {
            name: "yScale",
            type: "linear",
            domain: { data: "mobility", field: "mean_change" },
            range: [ { signal: "cellHeight" }, 0]
        },
        {
            name: "colorScale",
            type: "ordinal",
            domain: { data: "mobility", field: "place" },
            range: { scheme: "category10" }
        },
        {
            name: "facetScale",
            type: "band",
            domain: { data: "mobility", field: "year" },
            range: [0, { signal: "facetHeight"}]
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
            from: { data: "mobility" },
            encode: {
                enter: {
                    x: { field: "week", scale: "xScale" },
                    y: { field: "mean_change", scale: "yScale" },
                    fill: { field: "place", scale: "colorScale" }
                }
            }
        }
    ],
    legends: [
        {
            fill: "colorScale",
            title: "Place Type"
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