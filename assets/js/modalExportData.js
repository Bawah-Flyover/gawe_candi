async function fetchModalExportData(){
    await fetch("modalExportData.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("modalExportData").innerHTML = data;

            // export selection
            const rangeSelect = document.getElementById('rangeSelect');
            const customRange = document.getElementById('customRange');
            rangeSelect.addEventListener('change', function() {
                if (this.value === 'custom') {
                    customRange.style.display = 'block';
                } else {
                    customRange.style.display = 'none';
                }
            });

            // export button
            const exportButton = document.getElementById('export-button');
            const startDateElement = document.getElementById('startDate');
            const endDateElement = document.getElementById('endDate');
            exportButton.addEventListener('click', async function() {
                // fetch the log data

                // =====================================================
                // WARNING : This part is under development
                // =====================================================
                const exportedData = await authExport(batterySN, String(startDateElement.value), String(endDateElement.value));
                //console.log("Start Date : " + String(startDateElement.value));
                //console.log("End Date : " + String(endDateElement.value));

                console.log(exportedData)
            });

        });
}