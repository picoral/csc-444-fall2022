// create spec
var spec = {
    width: 500,
    height: 500,
    padding: 50,
    data: [
        {
            url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/penguins.json",
            name: "penguins"
        }
    ],
    scales: [
        {
            name: "xScale",
            type: "linear",
            domain: { data: "penguins", field: "billLength" },
            range: "width",
            zero: false
        },
        {
            name: "yScale",
            type: "linear",
            domain: { data: "penguins", field: "billDepth" },
            range: "height",
            zero: false
        },
        {
            name: "colorScale",
            type: "ordinal",
            domain: { data: "penguins", field: "species" },
            range: { scheme: "category10"}
        },
        {
            name: "shapeScale",
            type: "ordinal",
            domain: { data: "penguins", field: "species"},
            range: ["circle", "square", "cross"]
        }
    ],
    marks: [
        {
            type: "symbol",
            from: { data: "penguins"},
            encode: {
                enter: {
                    x: { field: "billLength", scale: "xScale" },
                    y: { field: "billDepth", scale: "yScale" },
                    fill: { field: "species", scale: "colorScale" },
                    shape: { field: "species", scale: "shapeScale"}
                }
            }
        }
    ],
    axes: [
        {
            scale: "xScale",
            orient: "bottom",
            title: "bill length"
        },
        {
            scale: "yScale",
            orient: "left",
            title: "bill depth"
        }
    ],
    legends: [
        {
            fill: "colorScale",
            title: "Penguin Species",
            shape: "shapeScale"
        }
    ],
    title: {
            text: "Penguin Bill Depth vs. Bill Length",
            fontSize: 20,
            subtitle: "Measures are in mm",
            subtitleFontSize: 16,
            align: "left",
            anchor: "start"
          }
    
};

// create runtime
var runtime = vega.parse(spec);

// create view
var view = new vega.View(runtime)
                   .renderer("svg")
                   .initialize("#view")
                   .hover();

// run it
view.run();
