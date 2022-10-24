// create spec
var spec = { 
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "A plot of yarn",
    width: 400,
    height: 300,
    padding: 10,
    signals: [
        { 
            name: "bigCompany",
            value: false,
            bind: {
                    input: "select",
                    options: [false, true],
                    element: "#selector"
                }
        },
        {
            name: "displayCompany",
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
        }

    ],
    data: [
        {
          name: "yarn",
          url: "https://raw.githubusercontent.com/awalsh17/ravelry_yarns/main/data/yarn.csv",
          format: { type: "csv"},
          transform: [
            {
                type: "filter",
                expr: "datum.rating_average > 0"
            }
          ]
        },
        {
            name: "companies",
            source: "yarn",
            transform: [
                {
                    type: "aggregate",
                    groupby: ["yarn_company_name"],
                    fields: ["rating_average", "rating_average", "rating_count"],
                    ops: ["count", "mean", "sum"],
                    as: ["count", "meanRating", "rating_count"]
                },
                {
                    type: "formula",
                    expr: "datum.count > 50",
                    as: "big_company"
                },
                {
                    type: "filter",
                    expr: "datum.rating_count > 1000 && datum.rating_count < 30000"
                },
                { 
                    type: "collect",
                    sort: { field: "meanRating", order: "descending" }
                },
                {
                    type: "window",
                    ops: ["row_number"],
                    as: ["rank"]
                },
                {
                    type: "filter",
                    expr: "datum.rank <= 50 || datum.big_company == true"
                },
                {
                    type: "window",
                    ops: ["row_number"],
                    as: ["rank"]
                },
                {
                    type: "filter",
                    expr: "datum.rank <= 100"
                },
                { 
                    type: "filter",
                    expr: "datum.big_company == bigCompany"
                }
            ]
        }
    ],
    scales: [
        {
            name: "xScale",
            type: "linear",
            domain: { data: "companies", field: "rating_count" },
            range: "width",
            zero: false
        },
        {
            name: "yScale",
            type: "linear",
            domain: { data: "companies", field: "meanRating" },
            range: "height",
            zero: false
        },
        {
            name: "colorScale",
            type: "ordinal",
            domain: { data: "companies", field: "big_company"},
            range: { scheme: "category10" }
        }
    ],
    axes: [
        {
            scale: "xScale",
            orient: "bottom",
            title: "Rating Count"
        },
        {
            scale: "yScale",
            orient: "left",
            title: "Average Rating"
        }
    ],
    marks: [
        {
            type: "symbol",
            from: { data: "companies" },
            encode: {
                enter: {
                    x: { field: "rating_count", scale: "xScale" },
                    y: { field: "meanRating", scale: "yScale" },
                    fill: { field: "big_company", scale: "colorScale" }
                }
            }
        },
        {
            type: "text",
            encode: {
                enter: {
                    dx: { value: 0 },
                    dy: { value: 0 }
                },
                update: {
                    x: { signal: "displayCompany.rating_count", scale: "xScale" },
                    y: { signal: "displayCompany.meanRating", scale: "yScale" },
                    text: { signal: "displayCompany.yarn_company_name" }
                }
            }
        }
    ],
    title: {
        text: "Yarn",
        subtitle: "What type of company (big vs. small) is rated higher?"
    },
    legends: [
        {
            fill: "colorScale",
            title: "Big company?"
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