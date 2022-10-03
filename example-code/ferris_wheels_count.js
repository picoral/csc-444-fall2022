// create spec
var spec = { 
    description: "A bar plot of Ferris Wheels",
    width: 500,
    height: 500,
    padding: 50,
    autosize: "fit",
    data: [
        {
          name: "ferrisWheels",
          url: "https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2022/2022-08-09/wheels.csv",
          format: { type: "csv"}
        },
        {
            name: "counts",
            source: "ferrisWheels",
            transform: [
                {
                    type: "aggregate",
                    groupby: ["country"]
                },
                {
                    type: "collect",
                    sort: { field: "count", order: "descending" }
                },
                {
                    type: "window",
                    ops: ["row_number"], as: ["rank"]
                },
                {
                    type: "filter",
                    expr: "datum.rank <= 5" 
                }
            ]
        },
        {
            name: "aggregated",
            source: "ferrisWheels",
            transform: [
                {
                    type: "aggregate",
                    groupby: ["country"],
                    fields: ["height"],
                    ops: ["mean"],
                    as: ["m"]
                }
            ]
        }
    ],
    scales: [
        {
            name: "xScale",
            type: "band",
            domain: { data: "counts", field: "country" },
            range: "width",
            padding: .5
        },
        {
            name: "yScale",
            type: "linear",
            domain: { data: "counts", field: "count" },
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
            type: "rect",
            from: { data: "counts" },
            encode: {
                enter: {
                    x: { field: "country", scale: "xScale" },
                    y: { field: "count", scale: "yScale" },
                    y2: { value: 0, scale: "yScale"},
                    width: { value: 50 }
                },
                update: {
                    fill: { value: "black" }
                },
                hover: {
                    fill: { value: "LightGray" },
                    strokeWidth: { value: 2 },
                    stroke: { value: "black" }
                
                }
            }
        },
        {
            type: "text",
            from: { data: "counts" },
            encode: {
                enter: {
                    x: { field: "country", scale: "xScale" },
                    y: { field: "count", scale: "yScale" },
                    text: { field: "count" },
                    dx: { value: 25 },
                    dy: { value: 20 },
                    fill: { value: "black" },
                    align: { value: "center" },
                    fontSize: { value: 20 }
                }
            }
        }
    ],
    title: {
        text: "How many Ferris Wheels?"
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