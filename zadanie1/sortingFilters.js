//count click row
var selected = [
  [
    ['area_KM', 0],
    ['population', 0],
    ['accesion', 0],
    ['country', 0],
    ['schengen', 0],
    ['epSeats', 0]
  ],
  [
    ['area_KM', 1],
    ['population', 0],
    ['accesion', 0],
    ['country', 0],
    ['schengen', 0],
    ['epSeats', 0]
  ]
];


//---------------sorting---------------
function sort_area_KM(thisData) {
  var id = $(thisData).closest('table').prop('id');
  var tmpJson = jsonData;
  var clickCount = 0;

  if (id == 'countries2') {
    tmpJson = filtrData;
    clickCount = 1;
  }

  ++selected[clickCount][0][1];


  tmpJson.sort(function (a, b) {
    return selected[clickCount][0][1] % 2 == 0 ? parseFloat(a.area_KM) - parseFloat(b.area_KM) : parseFloat(b.area_KM) - parseFloat(a.area_KM);
  });

  drawTable(tmpJson, id);
}

function sort_population(thisData) {
  var id = $(thisData).closest('table').prop('id');
  var tmpJson = jsonData;
  var clickCount = 0;

  if (id == 'countries2') {
    tmpJson = filtrData;
    clickCount = 1;
  }

  ++selected[clickCount][1][1];


  tmpJson.sort(function (a, b) {
    return selected[clickCount][1][1] % 2 == 0 ? parseFloat(a.population) - parseFloat(b.population) : parseFloat(b.population) - parseFloat(a.population);
  });

  drawTable(tmpJson, id);
}

function sort_accesion(thisData) {
  var id = $(thisData).closest('table').prop('id');
  var tmpJson = jsonData;
  var clickCount = 0;

  if (id == 'countries2') {
    tmpJson = filtrData;
    clickCount = 1;
  }

  ++selected[clickCount][2][1];

  tmpJson.sort(function (a, b) {
    bAccesion = a.accesion
      .split(".")
      .reverse()
      .join();
    aAccesion = b.accesion
      .split(".")
      .reverse()
      .join();

    return selected[clickCount][2][1] % 2 == 0 ? bAccesion.localeCompare(aAccesion) : aAccesion.localeCompare(bAccesion);
  });

  drawTable(tmpJson, id);
}

function sort_country(thisData) {
  var id = 'countries2';
  var tmpJson = jsonData;
  var clickCount = 0;
  if (thisData != null) id = $(thisData).closest('table').prop('id');

  if (id == 'countries2') {
    tmpJson = filtrData;
    clickCount = 1;
  }

  ++selected[clickCount][3][1];


  tmpJson.sort(function (a, b) {
    return selected[clickCount][3][1] % 2 == 0 ? a.country.localeCompare(b.country) : b.country.localeCompare(a.country);
  });

  drawTable(tmpJson, id);
}

function sort_schengen(thisData) {
  var id = $(thisData).closest('table').prop('id');
  var tmpJson = jsonData;
  var clickCount = 0;

  if (id == 'countries2') {
    tmpJson = filtrData;
    clickCount = 1;
  }

  ++selected[clickCount][4][1];


  tmpJson.sort(function (a, b) {
    return selected[clickCount][4][1] % 2 == 0 ? a.schengen.localeCompare(b.schengen) : b.schengen.localeCompare(a.schengen);
  });

  drawTable(tmpJson, id);
}

function sort_EP_seats(thisData) {
  var id = $(thisData).closest('table').prop('id');
  var tmpJson = jsonData;
  var clickCount = 0;

  if (id == 'countries2') {
    tmpJson = filtrData;
    clickCount = 1;
  }

  ++selected[clickCount][5][1];


  tmpJson.sort(function (a, b) {
    return selected[clickCount][5][1] % 2 == 0 ? parseFloat(a.EP_seats) - parseFloat(b.EP_seats) : parseFloat(b.EP_seats) - parseFloat(a.EP_seats);
  });

  drawTable(tmpJson, id);
}

//---------------fiters---------------
function filtrArea() {
  var clickCount = document.getElementById("fArea").value;
  document.getElementById("fEPSeats").value = 0; //reset

  if (clickCount == 1) {
    filtrData = jsonData.filter(function (entry) {
      return entry.area_KM <= 50000;
    });
  } else if (clickCount == 2) {
    filtrData = jsonData.filter(function (entry) {
      return entry.area_KM > 50000 && entry.area_KM <= 300000;
    });
  } else if (clickCount == 3) {
    filtrData = jsonData.filter(function (entry) {
      return entry.area_KM > 300000;
    });
  } else {
    filtrData = jsonData;
  }

  drawTable(filtrData, "countries2");
  $("#countries2 tfoot").empty();

  calc();
}

function filtrEPSeats() {
  var clickCount = document.getElementById("fEPSeats").value;
  document.getElementById("fArea").value = 0; //reset

  if (clickCount == "even") {
    //parzyty
    filtrData = jsonData.filter(function (entry) {
      return entry.EP_seats % 2 == 0;
    });
  } else if (clickCount == "odd") {
    filtrData = jsonData.filter(function (entry) {
      return entry.EP_seats % 2 == 1;
    });
  } else {
    filtrData = jsonData;
  }

  drawTable(filtrData, "countries2");
  $("#countries2 tfoot").empty();

  calc();
}

function filtrShowHide(){
  $('#countries tbody').toggle();
}