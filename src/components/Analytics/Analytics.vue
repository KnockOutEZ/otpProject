<template>
  <div class="container px-6 mx-auto grid">
            <h2
              class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
            >
                Analytics
            </h2>

            <div class="grid gap-6 mb-8 md:grid-cols-2">
              <!-- Doughnut/Pie chart -->
              <div
                class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
              >
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                  Total Earning
                </h4>
                <div
                  class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400 daCard"
                >
                  <div class="flex items-center">
                    <div id="chartdiv1"></div>
                  </div>
                </div>
              </div>
              <!-- Lines chart -->
              <div
                class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
              >
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                  Available Balance
                </h4>
                <div
                  class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400 daCard"
                >
                  <div class="flex items-center">
                  <div id="chartdiv2"></div>
                  </div>
                </div>
              </div>
              <!-- Bars chart -->
              <div
                class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
              >
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                  Due
                </h4>
                
                <div
                  class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400 daCard"
                >
                  <div class="flex items-center">
                  <div id="chartdiv3"></div>
                  </div>
                </div>
              </div>

              <div
                class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
              >
                <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                  Bonus
                </h4>
                <div
                  class="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400 daCard"
                >
                  <div class="flex items-center">
                  <div id="chartdiv"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");
export default {
    mounted() {
    am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv1", am4charts.XYChart);
chart.scrollbarX = new am4core.Scrollbar();

// Add data
chart.data = [{
  "country": "USA",
  "visits": 3025
}, {
  "country": "China",
  "visits": 1882
}, {
  "country": "Japan",
  "visits": 1809
}, {
  "country": "Germany",
  "visits": 1322
}, {
  "country": "UK",
  "visits": 1122
}, {
  "country": "France",
  "visits": 1114
}, {
  "country": "India",
  "visits": 984
}, {
  "country": "Spain",
  "visits": 711
}, {
  "country": "Netherlands",
  "visits": 665
}];

prepareParetoData();

function prepareParetoData(){
    var total = 0;

    for(var i = 0; i < chart.data.length; i++){
        var value = chart.data[i].visits;
        total += value;
    }

    var sum = 0;
    for(i = 0; i < chart.data.length; i++){
        value = chart.data[i].visits;
        sum += value;   
        chart.data[i].pareto = sum / total * 100;
    }    
}

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 60;
categoryAxis.tooltip.disabled = true;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.minWidth = 50;
valueAxis.min = 0;
valueAxis.cursorTooltipEnabled = false;

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.sequencedInterpolation = true;
series.dataFields.valueY = "visits";
series.dataFields.categoryX = "country";
series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
series.columns.template.strokeWidth = 0;

series.tooltip.pointerOrientation = "vertical";

series.columns.template.column.cornerRadiusTopLeft = 10;
series.columns.template.column.cornerRadiusTopRight = 10;
series.columns.template.column.fillOpacity = 0.8;

// on hover, make corner radiuses bigger
var hoverState = series.columns.template.column.states.create("hover");
hoverState.properties.cornerRadiusTopLeft = 0;
hoverState.properties.cornerRadiusTopRight = 0;
hoverState.properties.fillOpacity = 1;

series.columns.template.adapter.add("fill", function(fill, target) {
  return chart.colors.getIndex(target.dataItem.index);
})


var paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
paretoValueAxis.renderer.opposite = true;
paretoValueAxis.min = 0;
paretoValueAxis.max = 100;
paretoValueAxis.strictMinMax = true;
paretoValueAxis.renderer.grid.template.disabled = true;
paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
paretoValueAxis.numberFormatter.numberFormat = "#'%'"
paretoValueAxis.cursorTooltipEnabled = false;

var paretoSeries = chart.series.push(new am4charts.LineSeries())
paretoSeries.dataFields.valueY = "pareto";
paretoSeries.dataFields.categoryX = "country";
paretoSeries.yAxis = paretoValueAxis;
paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]";
paretoSeries.bullets.push(new am4charts.CircleBullet());
paretoSeries.strokeWidth = 2;
paretoSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
paretoSeries.strokeOpacity = 0.5;

// Cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "panX";

}); // end am4core.ready()



am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv2", am4charts.PieChart);
chart.startAngle = 160;
chart.endAngle = 380;

// Let's cut a hole in our Pie chart the size of 40% the radius
chart.innerRadius = am4core.percent(40);

// Add data
chart.data = [{
  "country": "Lithuania",
  "litres": 501.9,
  "bottles": 1500
}, {
  "country": "Czech Republic",
  "litres": 301.9,
  "bottles": 990
}, {
  "country": "Ireland",
  "litres": 201.1,
  "bottles": 785
}, {
  "country": "Germany",
  "litres": 165.8,
  "bottles": 255
}, {
  "country": "Australia",
  "litres": 139.9,
  "bottles": 452
}, {
  "country": "Austria",
  "litres": 128.3,
  "bottles": 332
}, {
  "country": "UK",
  "litres": 99,
  "bottles": 150
}, {
  "country": "Belgium",
  "litres": 60,
  "bottles": 178
}, {
  "country": "The Netherlands",
  "litres": 50,
  "bottles": 50
}];

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";
pieSeries.slices.template.stroke = new am4core.InterfaceColorSet().getFor("background");
pieSeries.slices.template.strokeWidth = 1;
pieSeries.slices.template.strokeOpacity = 1;

// Disabling labels and ticks on inner circle
pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;

// Disable sliding out of slices
pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
pieSeries.radius = am4core.percent(40);
pieSeries.innerRadius = am4core.percent(30);

var cs = pieSeries.colors;
cs.list = [am4core.color(new am4core.ColorSet().getIndex(0))];

cs.stepOptions = {
  lightness: -0.05,
  hue: 0
};
cs.wrap = false;


// Add second series
var pieSeries2 = chart.series.push(new am4charts.PieSeries());
pieSeries2.dataFields.value = "bottles";
pieSeries2.dataFields.category = "country";
pieSeries2.slices.template.stroke = new am4core.InterfaceColorSet().getFor("background");
pieSeries2.slices.template.strokeWidth = 1;
pieSeries2.slices.template.strokeOpacity = 1;
pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0.05;
pieSeries2.slices.template.states.getKey("hover").properties.scale = 1;

pieSeries2.labels.template.disabled = true;
pieSeries2.ticks.template.disabled = true;


var label = chart.seriesContainer.createChild(am4core.Label);
label.textAlign = "middle";
label.horizontalCenter = "middle";
label.verticalCenter = "middle";
label.adapter.add("text", function(){
  return "[font-size:18px]total[/]:\n[bold font-size:30px]" + pieSeries.dataItem.values.value.sum + "[/]";
})

}); // end am4core.ready()



am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

/**
 * Define data for each year
 */
var chartData = {
  "1995": [
    { "sector": "Agriculture", "size": 6.6 },
    { "sector": "Mining and Quarrying", "size": 0.6 },
    { "sector": "Manufacturing", "size": 23.2 },
    { "sector": "Electricity and Water", "size": 2.2 },
    { "sector": "Construction", "size": 4.5 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 14.6 },
    { "sector": "Transport and Communication", "size": 9.3 },
    { "sector": "Finance, real estate and business services", "size": 22.5 } ],
  "1996": [
    { "sector": "Agriculture", "size": 6.4 },
    { "sector": "Mining and Quarrying", "size": 0.5 },
    { "sector": "Manufacturing", "size": 22.4 },
    { "sector": "Electricity and Water", "size": 2 },
    { "sector": "Construction", "size": 4.2 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 14.8 },
    { "sector": "Transport and Communication", "size": 9.7 },
    { "sector": "Finance, real estate and business services", "size": 22 } ],
  "1997": [
    { "sector": "Agriculture", "size": 6.1 },
    { "sector": "Mining and Quarrying", "size": 0.2 },
    { "sector": "Manufacturing", "size": 20.9 },
    { "sector": "Electricity and Water", "size": 1.8 },
    { "sector": "Construction", "size": 4.2 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 13.7 },
    { "sector": "Transport and Communication", "size": 9.4 },
    { "sector": "Finance, real estate and business services", "size": 22.1 } ],
  "1998": [
    { "sector": "Agriculture", "size": 6.2 },
    { "sector": "Mining and Quarrying", "size": 0.3 },
    { "sector": "Manufacturing", "size": 21.4 },
    { "sector": "Electricity and Water", "size": 1.9 },
    { "sector": "Construction", "size": 4.2 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 14.5 },
    { "sector": "Transport and Communication", "size": 10.6 },
    { "sector": "Finance, real estate and business services", "size": 23 } ],
  "1999": [
    { "sector": "Agriculture", "size": 5.7 },
    { "sector": "Mining and Quarrying", "size": 0.2 },
    { "sector": "Manufacturing", "size": 20 },
    { "sector": "Electricity and Water", "size": 1.8 },
    { "sector": "Construction", "size": 4.4 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 15.2 },
    { "sector": "Transport and Communication", "size": 10.5 },
    { "sector": "Finance, real estate and business services", "size": 24.7 } ],
  "2000": [
    { "sector": "Agriculture", "size": 5.1 },
    { "sector": "Mining and Quarrying", "size": 0.3 },
    { "sector": "Manufacturing", "size": 20.4 },
    { "sector": "Electricity and Water", "size": 1.7 },
    { "sector": "Construction", "size": 4 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 16.3 },
    { "sector": "Transport and Communication", "size": 10.7 },
    { "sector": "Finance, real estate and business services", "size": 24.6 } ],
  "2001": [
    { "sector": "Agriculture", "size": 5.5 },
    { "sector": "Mining and Quarrying", "size": 0.2 },
    { "sector": "Manufacturing", "size": 20.3 },
    { "sector": "Electricity and Water", "size": 1.6 },
    { "sector": "Construction", "size": 3.1 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 16.3 },
    { "sector": "Transport and Communication", "size": 10.7 },
    { "sector": "Finance, real estate and business services", "size": 25.8 } ],
  "2002": [
    { "sector": "Agriculture", "size": 5.7 },
    { "sector": "Mining and Quarrying", "size": 0.2 },
    { "sector": "Manufacturing", "size": 20.5 },
    { "sector": "Electricity and Water", "size": 1.6 },
    { "sector": "Construction", "size": 3.6 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 16.1 },
    { "sector": "Transport and Communication", "size": 10.7 },
    { "sector": "Finance, real estate and business services", "size": 26 } ],
  "2003": [
    { "sector": "Agriculture", "size": 4.9 },
    { "sector": "Mining and Quarrying", "size": 0.2 },
    { "sector": "Manufacturing", "size": 19.4 },
    { "sector": "Electricity and Water", "size": 1.5 },
    { "sector": "Construction", "size": 3.3 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 16.2 },
    { "sector": "Transport and Communication", "size": 11 },
    { "sector": "Finance, real estate and business services", "size": 27.5 } ],
  "2004": [
    { "sector": "Agriculture", "size": 4.7 },
    { "sector": "Mining and Quarrying", "size": 0.2 },
    { "sector": "Manufacturing", "size": 18.4 },
    { "sector": "Electricity and Water", "size": 1.4 },
    { "sector": "Construction", "size": 3.3 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 16.9 },
    { "sector": "Transport and Communication", "size": 10.6 },
    { "sector": "Finance, real estate and business services", "size": 28.1 } ],
  "2005": [
    { "sector": "Agriculture", "size": 4.3 },
    { "sector": "Mining and Quarrying", "size": 0.2 },
    { "sector": "Manufacturing", "size": 18.1 },
    { "sector": "Electricity and Water", "size": 1.4 },
    { "sector": "Construction", "size": 3.9 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 15.7 },
    { "sector": "Transport and Communication", "size": 10.6 },
    { "sector": "Finance, real estate and business services", "size": 29.1 } ],
  "2006": [
    { "sector": "Agriculture", "size": 4 },
    { "sector": "Mining and Quarrying", "size": 0.2 },
    { "sector": "Manufacturing", "size": 16.5 },
    { "sector": "Electricity and Water", "size": 1.3 },
    { "sector": "Construction", "size": 3.7 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 14.2 },
    { "sector": "Transport and Communication", "size": 12.1 },
    { "sector": "Finance, real estate and business services", "size": 29.1 } ],
  "2007": [
    { "sector": "Agriculture", "size": 4.7 },
    { "sector": "Mining and Quarrying", "size": 0.2 },
    { "sector": "Manufacturing", "size": 16.2 },
    { "sector": "Electricity and Water", "size": 1.2 },
    { "sector": "Construction", "size": 4.1 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 15.6 },
    { "sector": "Transport and Communication", "size": 11.2 },
    { "sector": "Finance, real estate and business services", "size": 30.4 } ],
  "2008": [
    { "sector": "Agriculture", "size": 4.9 },
    { "sector": "Mining and Quarrying", "size": 0.3 },
    { "sector": "Manufacturing", "size": 17.2 },
    { "sector": "Electricity and Water", "size": 1.4 },
    { "sector": "Construction", "size": 5.1 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 15.4 },
    { "sector": "Transport and Communication", "size": 11.1 },
    { "sector": "Finance, real estate and business services", "size": 28.4 } ],
  "2009": [
    { "sector": "Agriculture", "size": 4.7 },
    { "sector": "Mining and Quarrying", "size": 0.3 },
    { "sector": "Manufacturing", "size": 16.4 },
    { "sector": "Electricity and Water", "size": 1.9 },
    { "sector": "Construction", "size": 4.9 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 15.5 },
    { "sector": "Transport and Communication", "size": 10.9 },
    { "sector": "Finance, real estate and business services", "size": 27.9 } ],
  "2010": [
    { "sector": "Agriculture", "size": 4.2 },
    { "sector": "Mining and Quarrying", "size": 0.3 },
    { "sector": "Manufacturing", "size": 16.2 },
    { "sector": "Electricity and Water", "size": 2.2 },
    { "sector": "Construction", "size": 4.3 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 15.7 },
    { "sector": "Transport and Communication", "size": 10.2 },
    { "sector": "Finance, real estate and business services", "size": 28.8 } ],
  "2011": [
    { "sector": "Agriculture", "size": 4.1 },
    { "sector": "Mining and Quarrying", "size": 0.3 },
    { "sector": "Manufacturing", "size": 14.9 },
    { "sector": "Electricity and Water", "size": 2.3 },
    { "sector": "Construction", "size": 5 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 17.3 },
    { "sector": "Transport and Communication", "size": 10.2 },
    { "sector": "Finance, real estate and business services", "size": 27.2 } ],
  "2012": [
    { "sector": "Agriculture", "size": 3.8 },
    { "sector": "Mining and Quarrying", "size": 0.3 },
    { "sector": "Manufacturing", "size": 14.9 },
    { "sector": "Electricity and Water", "size": 2.6 },
    { "sector": "Construction", "size": 5.1 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 15.8 },
    { "sector": "Transport and Communication", "size": 10.7 },
    { "sector": "Finance, real estate and business services", "size": 28 } ],
  "2013": [
    { "sector": "Agriculture", "size": 3.7 },
    { "sector": "Mining and Quarrying", "size": 0.2 },
    { "sector": "Manufacturing", "size": 14.9 },
    { "sector": "Electricity and Water", "size": 2.7 },
    { "sector": "Construction", "size": 5.7 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 16.5 },
    { "sector": "Transport and Communication", "size": 10.5 },
    { "sector": "Finance, real estate and business services", "size": 26.6 } ],
  "2014": [
    { "sector": "Agriculture", "size": 3.9 },
    { "sector": "Mining and Quarrying", "size": 0.2 },
    { "sector": "Manufacturing", "size": 14.5 },
    { "sector": "Electricity and Water", "size": 2.7 },
    { "sector": "Construction", "size": 5.6 },
    { "sector": "Trade (Wholesale, Retail, Motor)", "size": 16.6 },
    { "sector": "Transport and Communication", "size": 10.5 },
    { "sector": "Finance, real estate and business services", "size": 26.5 } ]
};

// Create chart instance
var chart = am4core.create("chartdiv3", am4charts.PieChart);

// Add data
chart.data = [
  { "sector": "Agriculture", "size": 6.6 },
  { "sector": "Mining and Quarrying", "size": 0.6 },
  { "sector": "Manufacturing", "size": 23.2 },
  { "sector": "Electricity and Water", "size": 2.2 },
  { "sector": "Construction", "size": 4.5 },
  { "sector": "Trade (Wholesale, Retail, Motor)", "size": 14.6 },
  { "sector": "Transport and Communication", "size": 9.3 },
  { "sector": "Finance, real estate and business services", "size": 22.5 }
];

// Add label
chart.innerRadius = 100;
var label = chart.seriesContainer.createChild(am4core.Label);
label.text = "1995";
label.horizontalCenter = "middle";
label.verticalCenter = "middle";
label.fontSize = 50;

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "size";
pieSeries.dataFields.category = "sector";

// Animate chart data
var currentYear = 1995;
function getCurrentData() {
  label.text = currentYear;
  var data = chartData[currentYear];
  currentYear++;
  if (currentYear > 2014)
    currentYear = 1995;
  return data;
}

function loop() {
  //chart.allLabels[0].text = currentYear;
  var data = getCurrentData();
  for(var i = 0; i < data.length; i++) {
    chart.data[i].size = data[i].size;
  }
  chart.invalidateRawData();
  chart.setTimeout( loop, 4000 );
}

loop();

}); // end am4core.ready()






am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.RadarChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

let data = []
for(let i = 0; i < 10; i++){
  data.push({category:i, value1:Math.round(Math.random() * 10), value2:Math.round(Math.random() * 10), value3:Math.round(Math.random() * 10), value4:Math.round(Math.random() * 10)})
}

chart.data = data;
chart.radius = am4core.percent(100);

var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.labels.template.location = 0.5;
categoryAxis.renderer.tooltipLocation = 0.5;
categoryAxis.renderer.grid.template.disabled = true;
categoryAxis.renderer.labels.template.disabled = true;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.tooltip.disabled = true;
valueAxis.renderer.labels.template.horizontalCenter = "left";
valueAxis.renderer.grid.template.disabled = true;

var series1 = chart.series.push(new am4charts.RadarColumnSeries());
series1.name = "Series 1";
series1.dataFields.categoryX = "category";
series1.dataFields.valueY = "value2";
series1.stroke = am4core.color("#ffffff");
series1.columns.template.strokeOpacity = 0.2;
series1.stacked = true;
series1.sequencedInterpolation = true;
series1.columns.template.width = am4core.percent(100);
series1.columns.template.tooltipText = "{valueY}";

var series2 = chart.series.push(series1.clone());
series2.name = "Series 2";
series2.fill = chart.colors.next();
series2.dataFields.valueY = "value2";

var series3 = chart.series.push(series1.clone());
series3.name = "Series 3";
series3.fill = chart.colors.next();

series3.dataFields.valueY = "value3";

var series4 = chart.series.push(series1.clone());
series4.name = "Series 4";
series4.fill = chart.colors.next();
series4.dataFields.valueY = "value4";

chart.seriesContainer.zIndex = -1;

chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.exportable = false;
chart.scrollbarY = new am4core.Scrollbar();
chart.scrollbarY.exportable = false;

chart.cursor = new am4charts.RadarCursor();
chart.cursor.xAxis = categoryAxis;
chart.cursor.fullWidthXLine = true;
chart.cursor.lineX.strokeOpacity = 0;
chart.cursor.lineX.fillOpacity = 0.1;
chart.cursor.lineX.fill = am4core.color("#000000");

}); // end am4core.ready()
  },

  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

}
</script>

<style scoped>
.daCard{
  height: 18rem;
}

#chartdiv3,#chartdiv {
  width: 100%;
  height: 100%;
}

#chartdiv1,#chartdiv2{
  height: 18rem;
}
</style>