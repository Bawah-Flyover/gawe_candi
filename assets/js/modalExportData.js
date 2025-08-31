fetch("modalExportData.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("modalExportData").innerHTML = data;
    });