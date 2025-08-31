// Parameter        dataLength : How many data that server will serve
// Parameter        format : data in format hour, day, week, or month
async function fetchChartCurrent(label, dataLength = 24, format = "h") {
    //document.getElementById("battery-current-range-btn").innerText = label;

    try {
        const data = generateRandomData('current', dataLength, format);

        // Extract arrays for chart
        const labels = data.map(item => item.label);
        const values = data.map(item => item.values);

        // Call chart plot function directly
        plotBatteryCurrentChart(labels, values);

        // change the newest value
        const valueLength = values.length;
        document.getElementById('battery-current-newest-value').textContent = values[valueLength - 1] + ' A';

    } catch (error) {
        console.error("Error to fetch current data => ", error);
    }
}


let batteryCurrentChartInstance = null;

function plotBatteryCurrentChart(labels, values) {
    if (batteryCurrentChartInstance) {
        batteryCurrentChartInstance.destroy();
    }

    const ctx = document.getElementById('battery-current-chart').getContext('2d');

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


    batteryCurrentChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Current",
                data: values,
                borderColor: "#000",
                backgroundColor: "#A68E5E19",
                pointRadius: 0,
                pointHoverRadius: 0,
                fill: true,
                tension: 0.3,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x:{
                    display: false,
                    ticks: {
                        display: false,
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
                    display: false,
                    title: {
                        display: false,
                        text: "Energy (kW)",
                        color: '#000',
                    },
                    ticks: {
                        display: false,
                        color: '#000',
                        autoSkip: true,
                        maxTicksLimit: 6
                    },
                    position: 'left',
                    grid: {
                        display: false,
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