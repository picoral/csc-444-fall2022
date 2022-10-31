// create spec
var spec = { 
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "A plot of Mobility in Arizona",
    width: 400,
    height: 800,
    padding: 10,
    data: [
        {
          name: "mobility",
          url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/arizona-mobility-data.csv",
          format: { type: "csv"},
          transform: [
            {
                type: "filter",
                expr: "datum.county == 'Pima County'"
            }
          ]
        }
    ],
    signals: [
        { name: "offset", value: 100},
        { name: "cellHeight", value: 200},
        { name: "facetHeight", update: "3 * (offset + cellHeight)"}
      ],
    scales: [
        {
            name: "xScale",
            type: "linear",
            domain: { data: "mobility", field: "week" },
            range: "width",
            zero: false
        },
        {
            name: "yScale",
            type: "linear",
            domain: { data: "mobility", field: "mean_change" },
            range: [{ signal: "cellHeight" }, 0],
            zero: false
        },
        {
            name: "colorScale",
            type: "ordinal",
            domain: { data: "mobility", field: "place"},
            range: { scheme: "category10" }
        },
        {
            name: "facetScale",
            type: "band",
            domain: { data: "mobility", field: "year" },
            range: [0, { signal: "facetHeight" }]
        }
    ],
    marks: [
        {
            name: "years",
            type: "group",
            from: {
                facet: {
                    data: "mobility",
                    name: "facets",
                    groupby: "year"
                }
            },
            encode: {
                enter: {
                    y: { field: "year", scale: "facetScale" },
                    height: { signal: "cellHeight" }
                }
            },
            axes: [
                {
                    scale: "xScale",
                    orient: "bottom",
                    title: "week"
                },
                {
                    scale: "yScale",
                    orient: "left",
                    title: "Average Change in Mobility"
                }
            ],
            marks: [
                {
                    type: "symbol",
                    from: { data: "facets" },
                    encode: {
                        enter: {
                            x: { field: "week", scale: "xScale" },
                            y: { field: "mean_change", scale: "yScale" },
                            fill: { field: "place", scale: "colorScale" }
                        }
                    }
                }
            ]
        },
        {
            type: "text",
            from: { data: "years" },
            encode: {
                enter: {
                    x: { value: 200 },
                    y: { field: "y" },
                    text: { field: "datum.year" },
                    align: { value: "center" }
                }
            }
        }
    ],
    legends: [
        {
            fill: "colorScale",
            title: "Place"
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