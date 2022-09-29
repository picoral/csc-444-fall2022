// create spec
var spec = { 
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "A bar plot of Artists in the USA",
    width: 800,
    height: 500,
    padding: 50,
    autosize: "fit",
    data: [
        {
          name: "artists",
          url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/artists.json",
          transform: [
            {
              type: "stack",
              groupby: ["type"],
              field: "percent",
              as: ["x0", "x1"],
              sort: { field: "race" }
            },
            {
              type: "collect",
              sort: { field: "max" }
            }
          ]
        }
    ],
    scales: [
      {
        name: "xScale",
        type: "linear",
        domain: [0, 1],
        range: "width"
      },
      {
        name: "yScale",
        type: "band",
        domain: { data: "artists", field: "type"},
        range: "height",
        padding: .5
      },
      {
        name: "colorScale",
        type: "ordinal",
        domain: { data: "artists", field: "race" },
        range: {"scheme": "category20"}
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
        from: { data: "artists" },
        encode: {
          enter: {
            x: { field: "x0", scale: "xScale"},
            x2: { field: "x1", scale: "xScale"},
            y: { field: "type", scale: "yScale" },
            height: { value: 20 },
            fill: { field: "race", scale: "colorScale"}
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
      text: "Plot 1: Race proportions of artists in the USA"
    }
};

// create runtime
var runtime = vega.parse(spec);

// create view
var view = new vega.View(runtime)
                   .logLevel(vega.Error)
                   .renderer("svg")
                   .initialize("#question_3_c")
                   .hover();

// run it
view.run();