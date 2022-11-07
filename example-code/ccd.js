// create spec
var spec = { 
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "Schools in Arizona",
    width: 400,
    height: 300,
    padding: 10,
    data: [
        {
          name: "ccd",
          url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/ccd_arizona.csv",
          format: { type: "csv"},
          transform: [
            {
                type: "filter",
                expr: "datum.student_total > 0 && datum.teachers > 0"
            },
            {
                type: "formula",
                expr: "datum.student_total / datum.teachers",
                as: ["std_teach_ratio"]
            },
            {
                type: "aggregate",
                groupby: ["sch_name"],
                fields: ["std_teach_ratio"],
                ops: ["mean"],
                as: ["std_teach_ratio"]
            },
            {
                type: "collect",
                sort: { field: "std_teach_ratio"}
            },
            {
                type: "window",
                ops: ["row_number"],
                as: ["rank"]
            },
            {
                type: "filter",
                expr: "datum.rank <= 20"
            }
          ]
        }
    ],
    scales: [
        {
            name: "xScale",
            type: "linear",
            domain: { data: "ccd", field: "std_teach_ratio"},
            range: "width"
        },
        {
            name: "yScale",
            type: "band",
            domain: { data: "ccd", field: "sch_name"},
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
            from: { data: "ccd" },
            encode: {
                enter: {
                    x: { field: "std_teach_ratio", scale: "xScale" },
                    y: { field: "sch_name", scale: "yScale"},
                    x2: { value: 0, scale: "xScale" },
                    height: { value: 12}
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