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
          url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/artists_w_pos.json",
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
        type: "group",
  
        from: {
          facet: {
            data: "artists",
            name: "facet",
            groupby: "type"
          }
        },
  
        encode: {
          enter: {
            y: { field: "type", scale: "yScale" }
          }
        },
  
        signals: [
          { name: "height", update: "bandwidth('yScale')"}
        ],
  
        scales: [
          {
            name: "positionScale",
            type: "band",
            domain: { data: "facet", field: "position" },
            range: "height"
          }
        ],
        marks: [
          {
            name: "bars",
            from: { data: "facet" },
            type: "rect",
            encode: {
              enter: {
                y: { field: "position", scale: "positionScale" },
                height: { band: 1, scale: "positionScale" },
                x: { field: "percent", scale: "xScale" },
                x2: {  value: 0, scale: "xScale" },
                fill: { field: "race", scale: "colorScale" }
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
      text: "Plot 2: Race proportions of artists in the USA"
    }
};

// create runtime
var runtime = vega.parse(spec);

// create view
var view = new vega.View(runtime)
                   .logLevel(vega.Error)
                   .renderer("svg")
                   .initialize("#question_3_d")
                   .hover();

// run it
view.run();