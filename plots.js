function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      let trace = {
            type: "bar",
            x: [1, 2, 4, 8, 16],
            y: ["A", "B", "C", "D", "E"],
            orientation: 'h'
          };
      
      let layout = {
        title: "Select a sample number"
      }
      Plotly.newPlot("plot1", [trace], layout);
    });

    
}
  
  init("1940");

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      console.log(result)
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text('id: ' + result.id);
      PANEL.append("h6").text('ethnicity: ' + result.ethnicity);
      PANEL.append("h6").text('gender: ' + result.gender);
      PANEL.append("h6").text('age: ' + result.age);
      PANEL.append("h6").text('location: ' + result.location);
      PANEL.append("h6").text('bbtype: ' + result.bbtype);
      PANEL.append("h6").text('wfreq: ' + result.wfreq);

      let trace2 = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: result.wfreq,
          title: { text: "Wash Frequency" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
            steps: [
            { range: [0, 1], color: "C4FBC7" },
            { range: [1, 2], color: "9EFEA4" },
            { range: [2, 3], color: "66FF70" },
            { range: [3, 4], color: "28FE36" },
            { range: [4, 5], color: "00F510" },
            { range: [5, 6], color: "00E90F" },
            { range: [6, 7], color: "00D20E" },
            { range: [7, 8], color: "00B60C" },
            { range: [8, 9], color: "009B0A" }
      ],
          }
        }
      ];
      
      var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
      Plotly.newPlot("gauge", trace2, layout);

      
    });
  }

function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var chartData = data.samples;
    var chartArray = chartData.filter(sampleID => sampleID.id == sample);
    console.log(chartArray);
    let yData = chartArray[0].otu_ids.slice(0,5).map(String);
    console.log(yData);
    let xData = chartArray[0].sample_values.slice(0,5);
    console.log(xData);
    let wf = chartArray[0].wfreq;
    console.log(wf);
    let trace1 = {
      type: "bar",
      x: xData,
      y: yData,
      orientation:'h'
    };

    Plotly.newPlot("plot1", [trace1]);
    let chartxData = chartArray[0].otu_ids.map(String);
    let chartyData = chartArray[0].sample_values;
    var trace3 = {
      x: chartxData,
      y: chartyData,
      mode: 'markers',
      marker: {
        color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        size: chartyData
      }
    };
    
    var data = [trace3];
    
    var layout = {
      showlegend: false,
    };
    
    Plotly.newPlot('bubble', data, layout);
    
    
    });
}



  // function init() {
  //   data = [{
  //     x: [1, 2, 3, 4, 5],
  //     y: [1, 2, 4, 8, 16] }];
  //   Plotly.newPlot("plot", data);
  // };
  
  // d3.selectAll("#dropdownMenu").on("change", updatePlotly);
  // function updatePlotly() {
  //   var dropdownMenu = d3.select("#dropdownMenu");
  //   var dataset = dropdownMenu.property("value");
  
  //   var xData = [1, 2, 3, 4, 5];
  //   var yData = [];
  
  //   if (dataset === 'dataset1') {
  //     yData = [1, 2, 4, 8, 16];
  //   };
  
  //   if (dataset === 'dataset2') {
  //     yData = [1, 10, 100, 1000, 10000];
  //   };
  
  //   var trace = {
  //     x: [xData],
  //     y: [yData],
  //   };
  //   Plotly.restyle("plot", trace);
  // };
  
  // init();
