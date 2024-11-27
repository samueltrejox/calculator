const keys = document.querySelectorAll(".key");
const dotKey = document.querySelector(".punctuation");
const output = document.getElementById("output");

// operators keys
const addKey = document.querySelector(".sum");
const subtractKey = document.querySelector(".minus");
const multiplyKey = document.querySelector(".multiply");
const divideKey = document.querySelector(".divide");

// result and erasing keys
const resultKey = document.querySelector(".enter");
const eraseKey = document.querySelector(".erase");
const eraseAll = document.querySelector(".erase-all");

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

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            if (num2 === 0) return 'Error D:';
            return divide(num1, num2);
        default:
            return 'invalid';
    }
}