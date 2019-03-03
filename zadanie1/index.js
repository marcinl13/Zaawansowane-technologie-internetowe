function readJSON(file) {
  var result = null;
  $.ajax({
    url: file,
    type: "get",
    dataType: "json",
    async: false,
    success: function (data) {
      result = data;
    }
  });
  return result;
}

function drawTable(jsonData, id = "countries") {
  var tableBody = "";

  for (var obj in jsonData) {
    var tableHeads = "";
    tableBody += "<tr>";

    if (jsonData.hasOwnProperty(obj)) {
      for (var prop in jsonData[obj]) {
        if (jsonData[obj].hasOwnProperty(prop)) {
          var tmpProp = prop
            .replace("area_KM", "area (km&sup2;)")
            .replace("_", " ")
            .replace(/^\w/, c => c.toUpperCase());

          var tmpVal = jsonData[obj][prop].toLocaleString();

          tableHeads += "<th onclick='sort_" + prop + "(this);' class='cursor'>" + tmpProp + "</th>";
          tableBody += "<td>" + tmpVal + "</td>";
        }
      }
    }
    tableBody += "</tr>";
  }

  //clear all data
  $("#" + id + " thead").empty();
  $("#" + id + " tbody").empty();

  //insert all data
  $("#" + id + " thead").append(tableHeads);
  $("#" + id + " tbody").append(tableBody);
}

var jsonData = [{}]; //original data
var filtrData = [{}]; //tmp data
jsonData = readJSON("./data.json");
filtrData = jsonData;

//show json data table
drawTable(jsonData, "countries");

//document ready
$(function () {
  sort_country();
  calc(jsonData, "countries");
  calc(filtrData, "countries2");
});

