const digit = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')

let operator = null;
let operand1 = null;
let operand2 = null;
let currentDisplay = '0';
let resultDisplay = false;

function getDisplay(value) {
    if (currentDisplay === 0 || resultDisplay) {
        currentDisplay = value;
    } else {
        currentDisplay += value;
    }
}

function add(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
function subtract(...numbers) {
  return numbers.reduce((a, b) => a - b);
}

function multiply(...numbers) {
  return numbers.reduce((a, b) => a * b, 1);
}

function divide(...numbers) {
    return numbers.reduce((a, b) => {
        if (b === 0) return 'error D:';
        return a / b;
    });
}

function operate(op, x, y) {
    switch (op) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            if (y === 0) return 'Error D:';
            return divide(x, y);
        default:
            return 'invalid';
    }
}