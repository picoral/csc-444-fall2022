// create spec
var spec = { 
    description: "A plot of broadway plays",
    width: 400,
    height: 300,
    padding: 50,
    data: [
        {
          name: "broadway",
          url: "https://raw.githubusercontent.com/picoral/csc-444-data/main/broadway.csv",
          format: { type: "csv"}
        }
    ],
    scales: [
        {
            name: "xScale",
            domain: { data: "broadway", field: "weekly_gross" },
            range: "width",
            zero: false
        },
        {
            name: "yScale",
            domain: { data: "broadway", field: "avg_ticket_price" },
            range: "height",
            zero: true
        }
    ],
    axes: [
        {
            scale: "xScale",
            orient: "bottom",
            title: "Total Weekly Gross (in US dollars)"
        },
        {
            scale: "yScale",
            orient: "left",
            title: "Average ticket price"
        }
    ],
    marks: [
        {
            type: "symbol",
            from: { data: "broadway" },
            encode: {
                enter: {
                    x: { field: "weekly_gross", scale: "xScale" },
                    y: { field: "avg_ticket_price", scale: "yScale" },
                    fillOpacity: { value: .5 }
                }
            }
        }
    ],
    title: {
        text: "Plot 1: Broadway average ticket price by weekly gross"
    }
};

// create runtime
var runtime = vega.parse(spec);

// create view
var view = new vega.View(runtime)
                   .logLevel(vega.Error)
                   .renderer("svg")
                   .initialize("#question_4_a")
                   .hover();

// run it
view.run();