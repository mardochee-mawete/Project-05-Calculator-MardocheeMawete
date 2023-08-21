// TODO: Faire la manipulation du DOM dans ce fichier
const currentInput = document.getElementById('input');
currentInput.setAttribute('readonly', 'readonly');
currentInput.placeholder = '0';
const historical = document.getElementById('calcul');
const numpadButton = document.querySelectorAll('.numpad');
const groupOperateur = document.querySelectorAll('[type="submit"]');
const reset = document.getElementById('reset');
const clear = document.getElementById('clear');
const changeSign = document.getElementById('plusoumoins');
const percentage = document.getElementById('percentage');
const equals = document.getElementById('equals');

let buttonOperationIsPressed = false;
let defaultLengthHistorical = undefined;
let stringCalcul = '';
let answer = '';

//display current input
function displayCurrentInput(buttonInput) {
    if (buttonOperationIsPressed == true || historical.innerText.includes('=') == true) {
        currentInput.value = buttonInput;
        dynamicHistorical();
        buttonOperationIsPressed = false;
    }
    else if (buttonInput == '0') {
        if (currentInput.value != '0') {
            currentInput.value += buttonInput;
            dynamicHistorical();
        }
    }
    else if (buttonInput == '.') {
        if (currentInput.value.includes('.') == false) {
            currentInput.value += buttonInput;
            dynamicHistorical();
        }
    } else {
        if (currentInput.value == '0' && buttonInput != '.') {
            currentInput.value = buttonInput;
            dynamicHistorical();
        }
        else {
            currentInput.value += buttonInput;
            dynamicHistorical();
        }
    }
}
//display dynamic string calcul
function dynamicHistorical(){
    if(historical.innerText !=''){
        historical.innerText = historical.innerText.slice(0, defaultLengthHistorical) +' '+currentInput.value;
    }
}
// numpd Buttons calculator
numpadButton.forEach((bt) => {
    bt.addEventListener('click', (e) => {
        displayCurrentInput(e.target.textContent);
    })
})
//keyboard button input
document.addEventListener('keydown', (event) => {
    let buttonKeyboard = event.key;
    if (buttonKeyboard == '.') {
        displayCurrentInput(buttonKeyboard);
    } else if ((buttonKeyboard == '+' || buttonKeyboard == '-') || (buttonKeyboard == '/' || buttonKeyboard == '*')) {
        if(buttonKeyboard == '/'){ displayStringCalcul(' ÷ '); }
        else if(buttonKeyboard == '*'){ displayStringCalcul(' × '); }
        else{ displayStringCalcul(' '+buttonKeyboard+' '); }  
    }
    else {
        for (let i = 0; i <= 9; i++) {
            if (buttonKeyboard == i) {
                displayCurrentInput(buttonKeyboard);
            }
        }
    }
});
// historical calcul string
function displayStringCalcul(operator) {
    if (historical.innerText == '') {
        historical.innerText = currentInput.value + operator;
        buttonOperationIsPressed = true; // button operator is pressed
        defaultLengthHistorical = historical.innerText.length; // get length historical
    }
    else if (buttonOperationIsPressed == true || historical.innerText.includes('=') == true) {  //control sign
        if (historical.innerText.slice(-2) != operator) {
            historical.innerText = historical.innerText.slice(0, -2) + operator;
        }
    }
    else {
        historical.innerText += ' '+ operator+' ';
        buttonOperationIsPressed = true; // button operator is pressed
        defaultLengthHistorical = historical.innerText.length; // get length historical
    }
}
// buttons operators
groupOperateur.forEach(function (operator) {
    operator.type = 'button';
    operator.addEventListener('click', () => {
        if (currentInput.value != '') { // if current input is empty, no input 
            if (operator.innerText == '÷') {
                displayStringCalcul(' ÷ ');
            }
            else if (operator.innerText == '-') {
                displayStringCalcul(' - ');
            }
            else if (operator.innerText == '×') {
                displayStringCalcul(' × ');
            }
            else if (operator.innerText == '+') {
                displayStringCalcul(' + ');
            }
        }
    })
})
//calcul
function calculate(){
    stringCalcul = historical.innerText; // get string calcul
    if(stringCalcul !=''){
        for(let char of stringCalcul){
            if(char == '÷'){ stringCalcul = stringCalcul.split('÷').join('/') ; }
            else if( char == '×'){ stringCalcul = stringCalcul.split('×').join('*') ;}
        }
        answer = eval(stringCalcul)
        if(answer == Infinity || answer == -Infinity){ return 'ERROR'; }
        else{ return answer;}   
    }
}
//equals
equals.addEventListener('click',()=>{
    if(historical.innerText !=''){
        if(isNaN(historical.innerText.slice(-1)) == true){ historical.innerText = historical.innerText.slice(0, -1); }
        currentInput.value = calculate();
        historical.innerText +=' =';
    }
})
//percentage
percentage.addEventListener('click',()=>{
    if(historical.innerText !=''){
        if(isNaN(historical.innerText.slice(-1)) == true){ historical.innerText = historical.innerText.slice(0, -1); }
        if(calculate() == 'ERROR'){ currentInput.value = calculate(); }
        else{ currentInput.value = calculate() / 100;}  
        historical.innerText +=' =';
    }
})
//reset
reset.addEventListener('click', ()=>{
buttonOperationIsPressed = false;
defaultLengthHistorical = undefined;
stringCalcul = '';
answer = '';
currentInput.value ='';
historical.innerText ='';
})
//clear
clear.addEventListener('click', ()=>{
    currentInput.value = currentInput.value.slice(0, -1);
    dynamicHistorical();
})
//change Sign current input
changeSign.addEventListener('click', ()=>{
    currentInput.value = parseFloat(currentInput.value) * -1;
    dynamicHistorical();
})