var globalAvgEPSeats = 0; //global
var globalAvgArea = 0; //global
var globalAvgPopulation = 0; //global

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

function calculate(_filterOn=false) {
  document.getElementById('countries2').children[2].innerHTML = ''; //reset tfoot table

  var tmpData = [jsonData, filtrData];

  for (const type in tmpData) {

    if (_filterOn == false && type == 1) continue; //show only original data
    
    var tmpEPSeats = [];
    var tmpArea = [];
    var tmpPopulation = [];
    var count = 0;

    tmpData[type].forEach(element => {
      tmpEPSeats.push(element.EP_seats);
      tmpArea.push(element.area_KM);
      tmpPopulation.push(element.population);
      count++;
    });
	
	//median
	var medianEPSeats = median(tmpEPSeats).toLocaleString();
	var medianArea = median(tmpArea).toLocaleString();
	var medianPopulation = median(tmpPopulation).toLocaleString();
    
	//sum block
    var sumEPSeats = tmpEPSeats.reduce(function (a, b) {
      return a + b;
    });
    var sumArea = tmpArea.reduce(function (a, b) {
      return a + b;
    });
    var sumPopulation = tmpPopulation.reduce(function (a, b) {
      return a + b;
    });

    //avg block
    var avgEPSeats = sumEPSeats / count;
    var avgArea = sumArea / count;
    var avgPopulation = sumPopulation / count;

    var typeData = (type == 1) ? 'Filtered' : 'Original';
    var className = (type == 1) ? 'bg-warning' : 'table-primary';

    globalAvgEPSeats = type == 1 ? avgEPSeats : 0; //set global if is filtered
    globalAvgArea = type == 1 ? sumArea : 0; //set global if is filtered
    globalAvgPopulation = type == 1 ? avgPopulation : 0; //set global if is filtered

	
	
    var tmpFoot =
      '<tr class="' + className + '"><td>' + typeData + '</td><td></td><td>sum:</td><td>' + sumEPSeats.toLocaleString() + '</td><td>' + sumPopulation.toLocaleString() + '</td><td>' + sumArea.toLocaleString() + '</td></tr>' +
      '<tr class="' + className + '"><td></td><td></td><td>avg:</td><td>' + avgEPSeats.toLocaleString() + '</td><td>' + avgPopulation.toLocaleString() + '</td><td>' + avgArea.toLocaleString() + '</td></tr>'+
      '<tr class="' + className + '"><td></td><td></td><td>median:</td><td>' + medianEPSeats.toLocaleString() + '</td><td>' + medianPopulation.toLocaleString() + '</td><td>' + medianArea.toLocaleString() + '</td></tr>'
    
    document.getElementById('countries2').children[2].innerHTML += tmpFoot;
  }

}
