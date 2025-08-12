

function plotChart(chartType, labels, values){
    let chartTypeId;

    if(chartType == 'power'){
        chartTypeId = 'energy-consumption-chart';
    }
    else {return;}

    const ctx = document.getElementById(chartTypeId).getContext('2d');

    // Find min and max
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    // Add padding (10% above and below)
    const padding = (maxValue - minValue) * 0.2;
    const suggestedMin = minValue - padding;
    const suggestedMax = maxValue + padding;


const gradientFill = (context) => {
  const chart = context.chart;
  const { ctx, chartArea } = chart;

  if (!chartArea) {
    // chartArea is not available on initial load
    return null;
  }

  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(0, 'rgba(21, 153, 151, 0.15)'); // top
  gradient.addColorStop(1, 'rgba(21, 153, 151, 0)');   // bottom
  return gradient;
};

    if(chartType == 'power'){

    }





}