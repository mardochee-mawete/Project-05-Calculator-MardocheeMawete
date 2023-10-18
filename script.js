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

//choose units (deg , rad, grad)
const angleUnit = document.createElement('span');
angleUnit.textContent = 'Deg';
angleUnit.style.color='#f3f3f3';
angleUnit.style.backgroundColor = 'rgba(0,0,0,0.3)';
angleUnit.style.padding = '8px 0';
angleUnit.style.width = '50px';
angleUnit.style.textAlign = 'center';
angleUnit.style.borderRadius = '10px';
angleUnit.style.marginBottom = '-20px';
angleUnit.style.cursor='pointer';
document.querySelector('form').insertBefore(angleUnit, document.querySelector('form').children[0]);

angleUnit.addEventListener('click', (e)=>{
  if(e.target.textContent == 'Deg'){ angleUnit.textContent = 'Rad';}
  else if(angleUnit.textContent == 'Rad'){ angleUnit.textContent = 'Grad';}
  else if(angleUnit.textContent == 'Grad'){ angleUnit.textContent = 'Deg';}
})
//create the function and constant buttons
const containerButtons = document.querySelector('.buttons');
const divButton = document.createElement('div');
divButton.style.gridColumn = '1/4';
divButton.style.gridRow = '2/3';
divButton.style.display ='grid';
divButton.style.alignItems = 'center';
divButton.style.gridTemplateColumns = 'repeat(7, 1fr)';
divButton.style.gap = '3px';
containerButtons.insertBefore(divButton, containerButtons.children[4]);

function createFunctionAndConstantButton(text){
  const button = document.createElement('button');
  button.className = 'numpad';
  button.type='button';
  button.style.fontSize = '14px';
  button.style.borderRadius = '10px';
  button.style.height = '43px'
  button.style.color = '#444';
  button.style.fontWeight = 'bold';
  button.style.backgroundColor = '#97ecba';
  button.textContent = text;
  divButton.appendChild(button);
}
createFunctionAndConstantButton('π');
createFunctionAndConstantButton('e');
createFunctionAndConstantButton('exp');
createFunctionAndConstantButton('log');
createFunctionAndConstantButton('ln');
createFunctionAndConstantButton('sin');
createFunctionAndConstantButton('cos');
// create button 00
const divButtonDoubleZero = document.createElement('div');
const buttonDoubleZero = document.createElement('button');
buttonDoubleZero.className = 'numpad';
buttonDoubleZero.type='button';
buttonDoubleZero.textContent = '00';
divButtonDoubleZero.appendChild(buttonDoubleZero);
containerButtons.insertBefore(divButtonDoubleZero, containerButtons.children[19]);
//create container historical
const containerHistorical = document.createElement('div');
containerHistorical.style.width = '22%';
containerHistorical.style.position = 'absolute';
containerHistorical.style.top = '0';
containerHistorical.style.right = '0';
containerHistorical.style.padding = '40px 10px 0 0';
document.querySelector('body').appendChild(containerHistorical);
//title historical
const titleHistorical = document.createElement('h2');
titleHistorical.textContent = "Aucun historique pour l'instant";
titleHistorical.style.fontSize = '18px';
titleHistorical.style.marginBottom='20px';
containerHistorical.appendChild(titleHistorical);

function changeTextTitleHistorical(){
  if(containerHistorical.children[1]){
    titleHistorical.textContent = "Historique";
  }
}
//set calcul in historical
function setCalculInHistorical(){
  const stringHistorical = document.createElement('p');
  stringHistorical.textContent = stringCalcul.innerText +' '+ currentInput.value;
  stringHistorical.style.fontSize = '16px';
  stringHistorical.style.marginBottom = '10px';
  stringHistorical.style.color="#333";
  stringHistorical.style.cursor = 'pointer';
  containerHistorical.appendChild(stringHistorical);
  //cover a past calculation
  stringHistorical.addEventListener('click',(e) => {
    let indexSignEquals = e.target.textContent.indexOf('=');
    stringCalcul.innerText = e.target.textContent.slice(0 , indexSignEquals + 1);
    currentInput.value = e.target.textContent.slice(indexSignEquals + 1);
    e.target.style.color = '#ff0000';
    e.target.style.textDecoration ='underline';
  })
  stringHistorical.addEventListener('mouseover',(e) => {
    e.target.style.color = '#0000ff';
    e.target.style.textDecoration ='underline';
  })
  stringHistorical.addEventListener('mouseleave',(e) => {
    e.target.style.color = '#333';
    e.target.style.textDecoration ='none';
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
  if ((isNaN(stringCalcul.innerText.slice(-1)) == true && stringCalcul.innerText.slice(-1) != '.')) {
      currentInput.value ='';
  }
  if (buttonInput == '0') {
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
    if (currentInput.value.includes('.') == false) {
      if(currentInput.value == ''){
        currentInput.value = '0.';
        dynamicStringCalcul();
      }else{
        currentInput.value += buttonInput;
        dynamicStringCalcul();
      }
    }
  }
  else if(buttonInput == 'π'){
    currentInput.value = Math.PI;
    dynamicStringCalcul();
  }
  else if(buttonInput == 'e'){
    currentInput.value = Math.E;
    dynamicStringCalcul();
  }
  else if((buttonInput =='cos'|| buttonInput =='sin') || ((buttonInput =='log'|| buttonInput =='ln' )|| buttonInput =='exp')){
    if(isNaN(currentInput.value)==false && currentInput.value !=''){
     if(buttonInput =='cos'){
      currentInput.value = Math.cos(currentInput.value);
     }
     else if(buttonInput =='sin'){
      currentInput.value = Math.sin(currentInput.value);
     }
     else if(buttonInput =='log'){
      currentInput.value = Math.log10(currentInput.value);
     }
     else if(buttonInput =='exp'){
      currentInput.value = Math.exp(currentInput.value);
     }
     else if(buttonInput =='ln'){
      currentInput.value = Math.log(currentInput.value);
     }
    }
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
  if (stringCalcul.innerText.slice(-1) == '=') {
    stringCalcul.innerText = currentInput.value; // set final answer
    currentInput.value = '';
  }
  if (stringCalcul.innerText == '') { // first calcul
    if (operator == ' - ' && currentInput.value == '') {
      currentInput.value = '-';
    } else if (isNaN(currentInput.value) == false) {
      stringCalcul.innerText = currentInput.value + operator;
      currentInput.value = '';
      lengthStringCalcul = stringCalcul.innerText.length; // get length historical
      lastSign = operator;
    }
  }
  else if (isNaN(stringCalcul.innerText.slice(-1)) == true) {  //control sign
    stringCalcul.innerText = stringCalcul.innerText.slice(0, -1) + operator;
    lengthStringCalcul = stringCalcul.innerText.length; // get length historical
    lastSign = operator;
  }
  else {
    stringCalcul.innerText += operator;
    lengthStringCalcul = stringCalcul.innerText.length; // get length historical
    lastSign = operator;
  }
}
//display dynamic string calcul
function dynamicStringCalcul() {
  if (stringCalcul.innerText != '') {
    stringCalcul.innerText = stringCalcul.innerText.slice(0, lengthStringCalcul) + ' ' + currentInput.value;
  }
}
//calcul
function calculate() {
  if (stringCalcul.innerText != '') {
    answer = eval(stringCalcul.innerText.replace('÷', '/').replace('×', '*'));
    if (answer == Infinity || answer == -Infinity) { return 'Erreur'; }
    else { return answer; }
  }
}
//equals
equals.addEventListener('click', () => {
  if (stringCalcul.innerText != '') {
    if (isNaN(stringCalcul.innerText.slice(-1)) == false) {
      lastInput = currentInput.value;
      currentInput.value = calculate();
      stringCalcul.innerText += ' =';
      setCalculInHistorical();
      changeTextTitleHistorical()
    }
    else if(stringCalcul.innerText.includes('=') == true){
      stringCalcul.innerText = currentInput.value + lastSign + lastInput;
      currentInput.value = calculate();
      stringCalcul.innerText += ' =';
      setCalculInHistorical();
      changeTextTitleHistorical()
    }
    else {
      if (isNaN(parseFloat(currentInput.value)) == false) {
          if (buttonChangeSingIsPressed == true) { // if button +/- was pressed => (evaluation)
              stringCalcul.innerText += ' ' + currentInput.value;
              buttonChangeSingIsPressed = false;
          } 
          else {
              stringCalcul.innerText = stringCalcul.innerText.slice(0, -1);
          }
          lastInput = currentInput.value;
          currentInput.value = calculate();
          stringCalcul.innerText += ' =';
          setCalculInHistorical();
          changeTextTitleHistorical()
      }
    }
  }
})
//percentage
percentage.addEventListener('click', () => {
  if (stringCalcul.innerText != '') {
    if (isNaN(stringCalcul.innerText.slice(-1)) == true) {
      if (stringCalcul.innerText.slice(-1) == '=') { // after button = is pressi
        stringCalcul.innerText = stringCalcul.innerText.slice(0, -1);
        currentInput.value = calculate() / 100;
        stringCalcul.innerText = '';
      }
    }
    else {
      currentInput.value = calculate() / 100;
      stringCalcul.innerText = '';
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
  stringCalcul.innerText = '';
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
    if (isNaN(stringCalcul.innerText.slice(-1)) == false && buttonChangeSingIsPressed == false) {
      for (let lastChar of stringCalcul.innerText) {
        if (isNaN(stringCalcul.innerText.slice(-1)) == false) { // delete all numpad
          stringCalcul.innerText = stringCalcul.innerText.slice(0, -1);
        }
      }
    }
    else if (buttonChangeSingIsPressed == false) {
      stringCalcul.innerText = '';
    }
    buttonChangeSingIsPressed = true;
  }
})