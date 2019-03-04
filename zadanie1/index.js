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

function drawTable(_jsonData, _tableID = "countries", _filterOn = false) {

  var tableBody = ""; //table body

  for (var obj in _jsonData) {
    var tableHeads = ""; //table heads
    tableBody += "<tr>"; //open row

    if (_jsonData.hasOwnProperty(obj)) { //exists
      for (var prop in _jsonData[obj]) {
        if (_jsonData[obj].hasOwnProperty(prop)) { //exists
          var tmpProp = prop
            .replace("area_KM", "area (km&sup2;)")
            .replace("_", " ")
            .replace(/^\w/, c => c.toUpperCase());

          var tmpVal = _jsonData[obj][prop];

          tableHeads += "<th onclick='sort_" + prop + "(this);' class='cursor'>" + tmpProp + "</th>";

          if (_tableID == 'countries') {
            tableBody += "<td>" + tmpVal + "</td>";
          } else if (_tableID == 'countries2' && _filterOn==true) {

            if (prop == 'EP_seats') {

              if (globalAvgEPSeats < tmpVal) { //lower than avg
                tableBody += "<td class='table-success'>" + tmpVal.toLocaleString() + "</td>";
              } else if (globalAvgEPSeats > tmpVal) { //higher than avg
                tableBody += "<td class='table-warning'>" + tmpVal.toLocaleString() + "</td>";
              } else {
                tableBody += "<td>" + tmpVal.toLocaleString() + "</td>";
              }

            } else if (prop == 'population') {

              if (globalAvgPopulation < tmpVal) { //lower than avg
                tableBody += "<td class='table-success'>" + tmpVal.toLocaleString() + "</td>";
              } else if (globalAvgPopulation > tmpVal) { //higher than avg
                tableBody += "<td class='table-warning'>" + tmpVal.toLocaleString() + "</td>";
              } else {
                tableBody += "<td>" + tmpVal.toLocaleString() + "</td>";
              }

            } else if (prop == 'area_KM') {

              if (globalAvgArea < tmpVal) { //lower than avg
                tableBody += "<td class='table-success'>" + tmpVal.toLocaleString() + "</td>";
              } else if (globalAvgArea > tmpVal) { //higher than avg
                tableBody += "<td class='table-warning'>" + tmpVal.toLocaleString() + "</td>";
              } else {
                tableBody += "<td>" + tmpVal.toLocaleString() + "</td>";
              }

            } else {
              tableBody += "<td>" + tmpVal.toLocaleString() + "</td>";
            }

          } else {
            tableBody += "<td>" + tmpVal.toLocaleString() + "</td>";
          }
        }
      }
    }

    tableBody += "</tr>"; //close row
  }

  //clear all data   
  document.getElementById(_tableID).children[0].innerHTML = ''; //thead
  document.getElementById(_tableID).children[1].innerHTML = ''; //tbody

  //insert all data
  $("#" + _tableID + " thead").append(tableHeads);
  $("#" + _tableID + " tbody").append(tableBody);
}

var jsonData = [{}]; //original data
var filtrData = [{}]; //tmp data
jsonData = readJSON("./data.json"); // set original
filtrData = jsonData; //set tmp

//show json data table
drawTable(jsonData, "countries");

//document ready
window.onload = function () {
  sort_country();

  calculate();
}