function replace(text) { //prepare

  var tmp = text
    .replace(/(\/\*(.+?)\*\/)/g, '<b>$2</b>')
    .replace(/([*](.+?)[*])/g, '<i>$2</i>')
    .replace(/(_!(.+?)!_)/g, '<u>$2</u>')
    .replace(/(-!(.+?)!-)/g, '<del>$2</del>')
    .replace(/(>>(.+?)<<)/g, '<q>$2</q>')
    .replace(/(\[(.+)\|(.+)\])/g, '<a href="$2">$3</a>');

  if (tmp[0] != '#')
    tmp = tmp.replace(/(.*)/g, '<p>$1</p>').replace('<p></p>', '')
  else
    tmp = tmp.replace(/([#](.*))/g, '<h1>$1</h1>')

  return tmp;
}

function checkForErrors(prepare) {
  var replaced = replace(prepare);
  var tags = replaced.replace(/(<a href="(.+?)">)/g, '<a>').match(/(<(.+?)>)/g);
  var stack = [];

  tags.forEach(tag => {
    if (tag[1] == '/') {
      var replaced = tag.replace(/(\/)/g, '')
      var last = stack.length - 1

      if (stack[last] == replaced) {
        stack = stack.slice(0, -1)
      }
      
    } else {
      stack.push(tag)
    }
  })

  if (stack.length > 0)
    return  '<p class="text-danger">Błąd'+  prepare +'</p>'
  else
    return replaced;
}

function parseThis() {
  var inputSplited = document.getElementById('input').value.split("\n");
  var replaced = '';

  inputSplited.forEach(element => {
    replaced += checkForErrors(element)
  });

  document.getElementById('output').innerHTML = ''
  document.getElementById('output').innerHTML = replaced;
}

window.onload = () => {

  var defaultText = [
    '*i cos tam*',
    '#naglowek #adfs',
    '-!przekresl!-',
    '_!podkresl!_',
    '/*pogrubione*/',
    '[adres|tekst]',
    '>>cudzyslow<<',
    'zwykly akapit',
    '* >>cud*zyslow<<',
  ];

  document.getElementById('input').value = '';
  document.getElementById('input').value = defaultText.join('\n');

  parseThis()
}