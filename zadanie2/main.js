function replace(text){ //prepare
  return text.replace(/(\/\*(.+?)\*\/)/g, '<em>$2</em>')
              .replace(/([*](.+?)[*])/g, '<p>$2</p>');
}

function checkForErrors(prepared){

}

function parseThis() {
  var input = document.getElementById('input').value;

  console.log(replace(input));
  
  document.getElementById('output').innerHTML = ''
  document.getElementById('output').innerHTML = replace(input)
}