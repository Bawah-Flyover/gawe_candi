// Parameter        dataLength : How many data that server will serve
// Parameter        format : data in format hour, day, week, or month
async function fetchChartPower(label, dataLength = 24, format = "h") {
    document.getElementById("system-power-range-btn").innerText = label;

    try {
        const data = generateRandomData('power', dataLength, format);
        const data2 = generateRandomData('power', dataLength, format);
        const data3 = generateRandomData('power', dataLength, format);

        // Extract arrays for chart
        const labels = data.map(item => item.label);
        const values1 = data.map(item => item.values);
        const values2 = data2.map(item => item.values);
        const values3 = data3.map(item => item.values);

        // Call chart plot function directly
        plotPowerActivityChart(labels, values1, values2, values3);

    } catch (error) {
        console.error("Error to fetch power data => ", error);
    }
}


let energyConsumptioChartInstance = null;

function plotPowerActivityChart(labels, values1, values2, values3) {
    
    if(energyConsumptioChartInstance) {
        energyConsumptioChartInstance.destroy();
    }

    const ctx = document.getElementById('power-activity-chart').getContext('2d');

    // Find min and max
    const minValue = Math.min(...values1);
    const maxValue = Math.max(...values1);

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


    energyConsumptioChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "PV Generated",
                data: values1,
                borderColor: "#159997",
                backgroundColor: gradientFill,
                pointRadius: 0,
                pointHoverRadius: 0,
                fill: false,
                tension: 0.3,
            },{
                label: "Grid Imports",
                data: values2,
                borderColor: "#042C48",
                backgroundColor: gradientFill,
                pointRadius: 0,
                pointHoverRadius: 0,
                fill: false,
                tension: 0.3,
            },{
                label: "Power Consumption",
                data: values3,
                borderColor: "#A68E5E",
                backgroundColor: gradientFill,
                pointRadius: 0,
                pointHoverRadius: 0,
                fill: false,
                tension: 0.3,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x:{
                    ticks: {
                        maxTicksLimit: 10,
                        autoSkip: true,
                        color: '#000'
                    },
                    title: {
                        display: false,
                        text: "Time",
                        color: '#000'
                    },
                    grid: {
                        display: false,
                    }
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: "Energy (kWh)",
                        color: '#000',
                    },
                    ticks: {
                        color: '#000',
                        autoSkip: true,
                        maxTicksLimit: 6
                    },
                    position: 'left',
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)',
                    },
                    suggestedMin: suggestedMin,
                    suggestedMax: suggestedMax
                },
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            }
        }
    });
}