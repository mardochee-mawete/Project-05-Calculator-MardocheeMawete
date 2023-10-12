// TODO: Faire la manipulation du DOM dans ce fichier
document.querySelector('.container').style.position ='fixed';
const currentInput = document.getElementById('input');
currentInput.setAttribute('readonly', 'readonly');
currentInput.placeholder = '0';
const stringCalcul = document.getElementById('calcul');
const groupOperateur = document.querySelectorAll('[type="submit"]');
const reset = document.getElementById('reset');
const clear = document.getElementById('clear');
const changeSign = document.getElementById('plusoumoins');
const percentage = document.getElementById('percentage');
const equals = document.getElementById('equals');

let lengthStringCalcul = undefined;
let lastInput = '';
let lastSign='';
let answer = '';
let buttonChangeSingIsPressed = false;

//create button 00
const containerButtons = document.querySelector('.buttons');
const divButtonDouble = document.createElement('div');
const buttonDoubleZero = document.createElement('button');
buttonDoubleZero.type='button';
buttonDoubleZero.className = 'numpad';
buttonDoubleZero.textContent = '00';
divButtonDouble.appendChild(buttonDoubleZero);
containerButtons.insertBefore(divButtonDouble, containerButtons.children[17]);
//create button PI
const divButtonPI = document.createElement('div');
const buttonPI = document.createElement('button');
buttonPI.type='button';
buttonPI.className = 'numpad';
buttonPI.textContent = 'π';
divButtonPI.appendChild(buttonPI);
containerButtons.insertBefore(divButtonPI, containerButtons.children[21]);
//create button e
const divButton_e = document.createElement('div');
const button_e = document.createElement('button');
button_e.type='button';
button_e.className = 'numpad';
button_e.textContent = 'e';
divButton_e.appendChild(button_e);
containerButtons.insertBefore(divButton_e, containerButtons.children[22]);

//create container historical
const containerHistorical = document.createElement('div');
containerHistorical.style.width = '20%';
containerHistorical.style.position = 'absolute';
containerHistorical.style.top = '0';
containerHistorical.style.right = '0';
containerHistorical.style.padding = '20px 10px 0 0';
document.querySelector('body').appendChild(containerHistorical);
//set calcul in historical
function setCalculInHistorical(){
  const stringHistorical = document.createElement('p');
  stringHistorical.textContent = stringCalcul.textContent +' '+ currentInput.value;
  stringHistorical.style.fontSize = '16px';
  stringHistorical.style.marginBottom = '10px';
  stringHistorical.style.color="#333";
  stringHistorical.style.cursor = 'pointer';
  containerHistorical.appendChild(stringHistorical);
  //cover a past calculation
  stringHistorical.addEventListener('click',(e) => {
    let indexSignEquals = e.target.textContent.indexOf('=');
    stringCalcul.textContent = e.target.textContent.slice(0 , indexSignEquals + 1);
    currentInput.value = e.target.textContent.slice(indexSignEquals + 1);
  })
}
// numpd Buttons calculator
document.querySelectorAll('.numpad').forEach((bt) => {
  bt.addEventListener('click', (e) => {
    displayCurrentInput(e.target.textContent);
  })
})
//keyboard button input
document.addEventListener('keydown', (event) => {
  let key = event.key;
  if (/[0-9.+-/*//]/.test(key)) {
    key.replace("*", ' × ').replace("/", ' ÷ ');
    if (/[0-9.]/.test(key)) displayCurrentInput(key);
    else displayStringCalcul(key);
  }
});
//display current input
function displayCurrentInput(buttonInput) {
  if (isNaN(stringCalcul.textContent.slice(-1)) == true && (stringCalcul.textContent.slice(-1) != '.' && buttonInput !='00')) {
    currentInput.value = buttonInput;
    dynamicStringCalcul();
  }
  else if (buttonInput == '0') {
    if (currentInput.value != '0' && currentInput.value != '-0') {
      currentInput.value += buttonInput;
      dynamicStringCalcul();
    }
  }
  else if (buttonInput == '00') {
    if ((currentInput.value != '' && currentInput.value != '-') && (currentInput.value != '0' && currentInput.value != '-0')) {
      currentInput.value += buttonInput;
      dynamicStringCalcul();
    }
  } 
  else if (buttonInput == '.') {
    if (currentInput.value.includes('.') == false && currentInput.value != '') {
      currentInput.value += buttonInput;
      dynamicStringCalcul();
    }
  }
  else if(buttonInput == 'π'){
    if(currentInput.value =='' || currentInput.value =='-'){ currentInput.value += '3.14'; }
    else if(isNaN(parseFloat(currentInput.value))==false){ currentInput.value =  parseFloat(currentInput.value) * 3.14 ; }
    dynamicStringCalcul();
  }
  else if(buttonInput == 'e'){
    if(currentInput.value =='' || currentInput.value =='-'){ currentInput.value += '2.71'; }
    else if(isNaN(parseFloat(currentInput.value))==false){ currentInput.value =  parseFloat(currentInput.value) * 2.71 ; }
    dynamicStringCalcul();
  }
  else {
    if (currentInput.value == '0' && buttonInput != '.') {
      currentInput.value = buttonInput;
      dynamicStringCalcul();
    }
    else {
      currentInput.value += buttonInput;
      dynamicStringCalcul();
    }
  }
}
// buttons operators
groupOperateur.forEach(function(operator) {
  operator.type = 'button';
  operator.addEventListener('click', () => {
    if (operator.textContent == '÷') {
      displayStringCalcul(' ÷ ');
    }
    else if (operator.textContent == '-') {
      displayStringCalcul(' - ');
    }
    else if (operator.textContent == '×') {
      displayStringCalcul(' × ');
    }
    else if (operator.textContent == '+') {
      displayStringCalcul(' + ');
    }
  })
})
// display calcul string
function displayStringCalcul(operator) {
  if (stringCalcul.textContent.slice(-1) == '=') {
    stringCalcul.textContent = currentInput.value; // set final answer
    currentInput.value = '';
  }
  if (stringCalcul.textContent == '') { // first calcul
    if (operator == ' - ' && currentInput.value == '') {
      currentInput.value = '-';
    } else if (isNaN(currentInput.value) == false) {
      stringCalcul.textContent = currentInput.value + operator;
      currentInput.value = '';
      lengthStringCalcul = stringCalcul.textContent.length; // get length historical
      lastSign = operator;
    }
  }
  else if (isNaN(stringCalcul.textContent.slice(-1)) == true) {  //control sign
    stringCalcul.textContent = stringCalcul.textContent.slice(0, -1) + operator;
    lengthStringCalcul = stringCalcul.textContent.length; // get length historical
    lastSign = operator;
  }
  else {
    stringCalcul.textContent += operator;
    lengthStringCalcul = stringCalcul.textContent.length; // get length historical
    lastSign = operator;
  }
}
//display dynamic string calcul
function dynamicStringCalcul() {
  if (stringCalcul.textContent != '') {
    stringCalcul.textContent = stringCalcul.textContent.slice(0, lengthStringCalcul) + ' ' + currentInput.value;
  }
}
//calcul
function calculate() {
  if (stringCalcul.textContent != '') {
    answer = eval(stringCalcul.textContent.replace('÷', '/').replace('×', '*'));
    if (answer == Infinity || answer == -Infinity) { return 'Erreur'; }
    else { return answer; }
  }
}
//equals
equals.addEventListener('click', () => {
  if (stringCalcul.textContent != '') {
    if (isNaN(stringCalcul.textContent.slice(-1)) == false) {
      lastInput = currentInput.value;
      currentInput.value = calculate();
      stringCalcul.textContent += ' =';
      setCalculInHistorical();
    }
    else if(stringCalcul.textContent.includes('=') == true){
      stringCalcul.textContent = currentInput.value + lastSign + lastInput;
      currentInput.value = calculate();
      stringCalcul.textContent += ' =';
      setCalculInHistorical();
    }
    else {
      if (isNaN(parseFloat(currentInput.value)) == false) {
          if (buttonChangeSingIsPressed == true) { // if button +/- was pressed => (evaluation)
              stringCalcul.textContent += ' ' + currentInput.value;
              buttonChangeSingIsPressed = false;
          } 
          else {
              stringCalcul.textContent = stringCalcul.textContent.slice(0, -1);
          }
          lastInput = currentInput.value;
          currentInput.value = calculate();
          stringCalcul.textContent += ' =';
          setCalculInHistorical();
      }
    }
  }
})
//percentage
percentage.addEventListener('click', () => {
  if (stringCalcul.textContent != '') {
    if (isNaN(stringCalcul.textContent.slice(-1)) == true) {
      if (stringCalcul.textContent.slice(-1) == '=') { // after button = is pressi
        stringCalcul.textContent = stringCalcul.textContent.slice(0, -1);
        currentInput.value = calculate() / 100;
        stringCalcul.textContent = '';
      }
    }
    else {
      currentInput.value = calculate() / 100;
      stringCalcul.textContent = '';
    }
  } else {
    if (currentInput.value != '') {
      currentInput.value = parseFloat(currentInput.value) / 100;
    }
  }
})
//reset
reset.addEventListener('click', () => {
  lengthStringCalcul = undefined;
  answer = '';
  lastInput = '';
  lastSign='';
  currentInput.value = '';
  stringCalcul.textContent = '';
  buttonChangeSingIsPressed = false;
})
//clear
clear.addEventListener('click', () => {
  currentInput.value = '';
  dynamicStringCalcul();
})
//change Sign current input
changeSign.addEventListener('click', () => {
  if (isNaN(parseFloat(currentInput.value)) == false) {
    currentInput.value = parseFloat(currentInput.value) * -1;
    if (isNaN(stringCalcul.textContent.slice(-1)) == false && buttonChangeSingIsPressed == false) {
      for (let lastChar of stringCalcul.textContent) {
        if (isNaN(stringCalcul.textContent.slice(-1)) == false) { // delete all numpad
          stringCalcul.textContent = stringCalcul.textContent.slice(0, -1);
        }
      }
    }
    else if (buttonChangeSingIsPressed == false) {
      stringCalcul.textContent = '';
    }
    buttonChangeSingIsPressed = true;
  }
})