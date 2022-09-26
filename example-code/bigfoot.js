// create spec
var spec = {
    width: 500,
    height: 1500,
    padding: 5,
    data: [
      {
        name: "bigfoot",
        url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/bigfoot_sightings.json",
        transform: [
          {
            type: "collect",
            sort: { field: "n", order: "descending" }
          }
        ]
      },
      {
        name: "filtered",
        source: "bigfoot",
        transform: [
          {
            type: "window",
            ops: ["row_number"], as: ["rank"]
          },
          {
            type: "filter",
            expr: "datum.rank <= 5" 
          }
        ]
      }
    ],
    scales: [
      {
        name: "yScale",
        type: "band",
        domain: { data: "bigfoot", field: "state" },
        range: "height",
        padding: .4
      },
      {
        name: "xScale",
        type: "linear",
        domain: { data: "bigfoot", field: "n" },
        range: "width",
        round: true
      }
    ],
    axes: [
      { orient: "bottom", scale: "xScale", tickCount: 15, grid: true },
      { orient: "left", scale: "yScale" }
    ],
    marks: [
      {
        type: "rect",
        from: { data: "bigfoot" },
        encode: {
          enter: {
            x: { scale: "xScale", field: "n" } ,
            height: { value: 20 },
            y: { scale: "yScale", field: "state" },
            x2: { scale: "xScale", value: 0 }
          },
          update: {
            fill: { value: "steelblue" }
          },
          hover: {
            fill: { value: "red" }
          }
        }
      },
      {
        type: "text",
        from: { data: "bigfoot"},
        encode: {
          enter: {
            x: { scale: "xScale", field: "n"},
            y: { scale: "yScale", field: "state"},
            baseline: { value: "top"},
            dx: { value: 5 },
            dy: { value: 4 }
          },
          update: {
            fill: { value: "black" },
            text: { field: "n"}
          }
        }
      }
      
    ]
  }

// create runtime
var runtime = vega.parse(spec);

// create view
var view = new vega.View(runtime)
                   .renderer("svg")
                   .initialize("#view")
                   .hover();

// run it
view.run();