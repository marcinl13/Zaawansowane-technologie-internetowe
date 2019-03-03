function median(values) {
  values.sort(function (a, b) {
    return a - b;
  });
  var half = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];
  else
    return (values[half - 1] + values[half]) / 2.0;
}

function calc(data = filtrData, tableID = 'countries2') {
  var tmpEPSeats = [];
  var tmpArea = [];
  var tmpPopulation = [];
  var count = 0;

  data.forEach(element => {
    tmpEPSeats.push(element.EP_seats);
    tmpArea.push(element.area_KM);
    tmpPopulation.push(element.population);
    count++;
  });

  var sumEPSeats = tmpEPSeats.reduce(function (a, b) {
    return a + b;
  });
  var sumArea = tmpArea.reduce(function (a, b) {
    return a + b;
  });
  var sumPopulation = tmpPopulation.reduce(function (a, b) {
    return a + b;
  });

  var avgEPSeats = (sumEPSeats / count).toLocaleString();
  var avgArea = (sumArea / count).toLocaleString();
  var avgPopulation = (sumPopulation / count).toLocaleString();

  var medianEPSeats = median(tmpEPSeats).toLocaleString();
  var medianArea = median(tmpArea).toLocaleString();
  var medianPopulation = median(tmpPopulation).toLocaleString();

  sumEPSeats = sumEPSeats.toLocaleString();
  sumavgArea = sumArea.toLocaleString();
  sumavgPopulation = sumPopulation.toLocaleString();


  $('#' + tableID + ' tfoot').append('<tr><td></td><td></td><td>sum:</td><td>' + sumEPSeats + '</td><td>' + sumPopulation + '</td><td>' + sumArea + '</td></tr>');

  $('#' + tableID + ' tfoot').append('<tr><td></td><td></td><td>avg:</td><td>' + avgEPSeats + '</td><td>' + avgPopulation + '</td><td>' + avgArea + '</td></tr>');

  $('#' + tableID + ' tfoot').append('<tr><td></td><td></td><td>median:</td><td>' + medianEPSeats + '</td><td>' + medianPopulation + '</td><td>' + medianArea + '</td></tr>');
}
