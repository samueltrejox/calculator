// main element
const digit = document.querySelectorAll('.digit');

// erase elements
const eraseAllBtn = document.getElementById('erase-all');
const eraseOne = document.getElementById('erase');

// operators and results
const resultBtn = document.getElementById('enter');
const operatorsButtons = document.querySelectorAll('.operator');

let currentDisplay = '0';
let operator = '';
let operand1 = '';
let operand2 = '';
let total;

// event listener for digits
digit.forEach(key => {
    key.addEventListener('click', e => {
        if (operator === '') {
            operand1 += e.target.innerText;
            currentDisplay = operand1;
        } else {
            operand2 += e.target.innerText;
            currentDisplay += operand2;
        }
        updateDisplay();
    })
});

// event listeners for buttons
resultBtn.addEventListener('click', () => {
    if (operand1 && operand2) {
        total = operate(operator, Number(operand1), Number(operand2));
        currentDisplay = total;
        updateDisplay();
        operand1 = total;
        operand2 = '';
    }
});

operatorsButtons.forEach((op) => {
    op.addEventListener('click', e => {
        if (!operand1) return; // Ensure operand1 exists before proceeding

        if (operand2) {
            total = operate(operator, Number(operand1), Number(operand2));
            currentDisplay = total;
            operand1 = total;
            operand2 = '';
        }
        
        operator = e.target.innerText;
        currentDisplay += operator;
    });
});

function updateDisplay() {
    const displayElement = document.getElementById('output');
    displayElement.innerText = currentDisplay;
    if(currentDisplay.length > 15) {
        displayElement.innerText = currentDisplay.substring(0, 15);
    }
}

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
    if (b === 0) return 'error D:';
    return a / b;
}

function operate(operator, operand1, operand2) {
    switch (operator) {
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case '&times;':
            return multiply(operand1, operand2);
        case '÷':
            return operand2 === 0 ? 'Error D:' : divide(operand1, operand2);
    }
}
