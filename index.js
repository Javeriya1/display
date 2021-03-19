document.getElementById("memo-display").addEventListener("submit", downloadCsv);

function downloadCsv(e) {
  var csvFileData = [];
  e.preventDefault();
  db.collection("users")
    .get()
    .then((doc) => {
      doc.forEach((d) => {
        let temp = [];
        let currentData = d.data();
        temp.push(currentData["FirstName"]);
        temp.push(currentData["LastName"]);
        temp.push(currentData["Email"]);
        temp.push(currentData["Phone"]);
        temp.push(currentData["Address"]);
        csvFileData.push(temp);
      });

      download_csv_file(csvFileData);
    });
}

//create a user-defined function to download CSV file
function download_csv_file(csvFileData) {
  //define the heading for each row of the data
  var csv = "FirstName,LastName,Email,Phone,Address\n";

  //merge the data with CSV
  csvFileData.forEach(function (row) {
    csv += row.join(",");
    csv += "\n";
  });

  //display the created CSV data on the web browser
  // document.write(csv);

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  hiddenElement.target = "_blank";

  //provide the name for the CSV file to be downloaded
  hiddenElement.download = "Butterfly.csv";
  hiddenElement.click();
}

// retrieve the data from firebase
const msgs = document.querySelector("#msgs");

db.collection("users").onSnapshot((querySnapshot) => {
  querySnapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      msgs.innerHTML +=
        "<div class='list'><h3>" +
        change.doc.data().FirstName+
        "</h3><p>" +
        change.doc.data().LastName +
        "</p><p>" +
        change.doc.data().Email +
        "</p><p>" +
        change.doc.data().Phone +
        "</p><p>" +
        change.doc.data().Address +
        "</p></div>";
    }
  });
});
