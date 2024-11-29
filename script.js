const keys = document.querySelectorAll('button')
const output = document.getElementById("#output");

let operand = null;
let operator1 = null;
let operator2 = null;
let displayValue = '0';
let result = null;

keys.forEach(key => key.addEventListener('click', updateDisplay))

function updateDisplay() {

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