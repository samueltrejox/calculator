// DOM Element Selectors
const digit = document.querySelectorAll(".digit");
const allKeys = document.querySelectorAll("button");
const display = document.getElementById("output");
const eraseAllBtn = document.getElementById("erase-all");
const eraseValueBtn = document.getElementById("erase");
const decimalBtn = document.getElementById("decimal");
const resultBtn = document.getElementById("enter");
const operatorsButtons = document.querySelectorAll(".operator");

// Calculator State Variables
let currentDisplay = "0";
let operator = "";
let operand1 = "";
let operand2 = "";
let total;

// Arithmetic operations
const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
};

// Main Calculation Function
function operate(operator, operand1, operand2) {
    switch(operator) {
        case "+": return operations.add(operand1, operand2);
        case "-": return operations.subtract(operand1, operand2);
        case "&times;": return operations.multiply(operand1, operand2);
        case "÷": return operand2 === 0 ? "Error D:" : operations.divide(operand1, operand2);
    }
}

// Display Management
function updateDisplay() {
    display.innerText = currentDisplay.length > 15 
        ? currentDisplay.substring(0, 15) 
        : currentDisplay;
}

// Input Handling Functions
function handleDigitInput(e) {
    if (operator === "") {
        operand1 += e.target.innerText;
        currentDisplay = operand1;
    } else {
        operand2 += e.target.innerText;
        currentDisplay = operand2;
    }
    updateDisplay();
}

function handleOperatorInput(e) {
    if (!operand1) return;

    if (operand2) {
        total = operate(operator, parseFloat(operand1), parseFloat(operand2));
        currentDisplay = total;
        operand1 = total;
        operand2 = "";
    }

    operator = e.target.innerText;
    updateDisplay();
}

// Button Action Functions
function getResult() {
    if (operand1 && operand2 && operator) {
        total = operate(operator, parseFloat(operand1), parseFloat(operand2));
        currentDisplay = total;
        updateDisplay();
        operand1 = total;
        operand2 = "";
    }
}

function eraseValue() {
    let updatedDisplay = currentDisplay.slice(0, -1) || "0";

    if (operand1 === currentDisplay) {
        operand1 = updatedDisplay;
    } else if (operand2 === currentDisplay) {
        operand2 = updatedDisplay;
    }

    currentDisplay = updatedDisplay;
    updateDisplay();
}

function eraseAll() {
    currentDisplay = "0";
    operand1 = "";
    operand2 = "";
    operator = "";
    updateDisplay();
}

function convertDecimal() {
    if (currentDisplay.includes(".")) return;
    
    if (operand1 === currentDisplay) {
        operand1 += ".";
    } else if (operand2 === currentDisplay) {
        operand2 += ".";
    }
    
    currentDisplay += ".";
    updateDisplay();
}

function pressAnimation(e) {
    e.target.classList.add("active");
    setTimeout(() => e.target.classList.remove("active"), 100);
}

// Event Listeners
resultBtn.addEventListener("click", getResult);
eraseAllBtn.addEventListener("click", eraseAll);
eraseValueBtn.addEventListener("click", eraseValue);
decimalBtn.addEventListener("click", convertDecimal);

allKeys.forEach(key => key.addEventListener("click", pressAnimation));
digit.forEach(key => key.addEventListener("click", handleDigitInput));
operatorsButtons.forEach(op => op.addEventListener("click", handleOperatorInput));

// Keyboard Support
window.addEventListener("keydown", (e) => {
    if (['Enter', 'Backspace', 'Delete'].includes(e.key)) {
        e.preventDefault();
    }

    const keyMap = {
        "0": () => document.querySelector('.key.orange-keys.digit').click(),
        "1": () => document.querySelector('.key.blue-keys.digit').click(),
        "2": () => document.querySelector('.key.blue-keys.digit').click(),
        "3": () => document.querySelector('.key.blue-keys.digit').click(),
        "4": () => document.querySelector('.key.green-keys.digit').click(),
        "5": () => document.querySelector('.key.green-keys.digit').click(),
        "6": () => document.querySelector('.key.green-keys.digit').click(),
        "7": () => document.querySelector('.key.yellow-keys.digit').click(),
        "8": () => document.querySelector('.key.yellow-keys.digit').click(),
        "9": () => document.querySelector('.key.yellow-keys.digit').click(),
        "+": () => document.getElementById("add").click(),
        "-": () => document.getElementById("subtract").click(),
        "*": () => document.getElementById("multiply").click(),
        "/": () => document.getElementById("divide").click(),
        "Enter": () => document.getElementById("enter").click(),
        "Backspace": () => document.getElementById("erase").click(),
        "Delete": () => document.getElementById("erase-all").click(),
        ".": () => document.getElementById("decimal").click()
    };

    if (keyMap[e.key]) {
        keyMap[e.key]();
    }

});
