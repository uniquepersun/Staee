function downloadCSV() {
    const form = document.getElementById("myForm");
    const formData = new FormData(form);
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add headers (column names)
    csvContent += "Name,Email\n";

    // Loop through form data and add values
    for (const [key, value] of formData.entries()) {
        csvContent += value + ",";
    }

    // Remove the last comma
    csvContent = csvContent.slice(0, -1);

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "form_data.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
}
function uploadCSV() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = function () {
        const file = this.files[0];
        if (file && file.type === "text/csv") {
            const reader = new FileReader();
            reader.onload = function (e) {
                const csvData = e.target.result;
                google.script.run.withSuccessHandler(uploadData).processCSV(csvData);
            };
            reader.readAsText(file);
        } else {
            alert("Invalid file format. Please upload a CSV file.");
        }
    };
    fileInput.click();
}