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
var selectedFilter = false;

//---------------sorting---------------
function sort_area_KM(_thisData) {
  var id = _thisData.parentElement.parentElement.id;
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

  drawTable(tmpJson, id, selectedFilter);
}

function sort_population(_thisData) {
  var id = _thisData.parentElement.parentElement.id;
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

  drawTable(tmpJson, id, selectedFilter);
}

function sort_accesion(_thisData) {
  var id = _thisData.parentElement.parentElement.id;
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

  drawTable(tmpJson, id, selectedFilter);
}

function sort_country(_thisData) {
  var id = 'countries2';
  var tmpJson = jsonData;
  var clickCount = 0;
  if (_thisData != null) id = _thisData.parentElement.parentElement.id;

  if (id == 'countries2') {
    tmpJson = filtrData;
    clickCount = 1;
  }

  ++selected[clickCount][3][1];


  tmpJson.sort(function (a, b) {
    return selected[clickCount][3][1] % 2 == 0 ? a.country.localeCompare(b.country) : b.country.localeCompare(a.country);
  });

  drawTable(tmpJson, id, selectedFilter);
}

function sort_schengen(_thisData) {
  var id = _thisData.parentElement.parentElement.id;
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

  drawTable(tmpJson, id, selectedFilter);
}

function sort_EP_seats(_thisData) {
  var id = _thisData.parentElement.parentElement.id;
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

  drawTable(tmpJson, id, selectedFilter);
}

//---------------fiters---------------
function filtrArea() {
  var clickCount = document.getElementById("fArea").value;
  document.getElementById("fEPSeats").value = 0; //reset
  selectedFilter = true;

  if (clickCount == 1) {
    filtrData = jsonData.filter(function (entry) {
      return entry.area_KM <= 50000;
    });

    calculate(selectedFilter);
  } else if (clickCount == 2) {
    filtrData = jsonData.filter(function (entry) {
      return entry.area_KM > 50000 && entry.area_KM <= 300000;
    });

    calculate(selectedFilter);
  } else if (clickCount == 3) {
    filtrData = jsonData.filter(function (entry) {
      return entry.area_KM > 300000;
    });

    calculate(selectedFilter);
  } else {
    filtrData = jsonData;

    selectedFilter = false;
    calculate(selectedFilter);
  }

  drawTable(filtrData, "countries2", selectedFilter);
}

function filtrEPSeats() {
  var clickCount = document.getElementById("fEPSeats").value;
  document.getElementById("fArea").value = 0; //reset
  selectedFilter = true;

  if (clickCount == "even") {
    //parzyty
    filtrData = jsonData.filter(function (entry) {
      return entry.EP_seats % 2 == 0;
    });

    calculate(selectedFilter);
  } else if (clickCount == "odd") {
    filtrData = jsonData.filter(function (entry) {
      return entry.EP_seats % 2 == 1;
    });

    calculate(selectedFilter);
  } else {
    filtrData = jsonData;

    selectedFilter = false;
    calculate(selectedFilter);
  }

  drawTable(filtrData, "countries2", selectedFilter);

}

function filtrShowHide() {
  $('#countries tbody').toggle();
}