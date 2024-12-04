// DOM Element Selectors
/* const digit = document.querySelectorAll(".digit");
const operatorsButtons = document.querySelectorAll(".operator");
const allKeys = document.querySelectorAll("button"); */

const display = document.getElementById("output");
/* const eraseAllBtn = document.getElementById("erase-all");
const eraseValueBtn = document.getElementById("erase");
const decimalBtn = document.getElementById("decimal");
const resultBtn = document.getElementById("enter"); */

// Calculator State Variables
let currentDisplay = "0";
let operator = "";
let operand1 = "";
let operand2 = "";
let total;

const maxDisplayLength = 15;

// Arithmetic operations
const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

// Main Calculation Function
function operate(operator, operand1, operand2) {
  switch (operator) {
    case "+":
      return operations.add(operand1, operand2);
    case "-":
      return operations.subtract(operand1, operand2);
    case "*":
      return operations.multiply(operand1, operand2);
    case "/":
      return operand2 === 0
        ? "Error D:"
        : operations.divide(operand1, operand2);
  }
}

// Display Management
function updateDisplay() {
  display.innerText =
    currentDisplay.length > maxDisplayLength
      ? currentDisplay.substring(0, maxDisplayLength)
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
  operator = e.target.value;
  updateDisplay();
}

// Button Action Functions
function getResult() {
  if (!operator || !operand1 || !operand2) return;

  total = operate(operator, parseFloat(operand1), parseFloat(operand2));
  currentDisplay = String(total).slice(0, maxDisplayLength);
  updateDisplay();
  operand1 = currentDisplay;
  operand2 = "";
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
  if (currentDisplay.includes(".") || currentDisplay.length > maxDisplayLength)
    return;

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
document.querySelectorAll(".key").forEach((button) => {
  button.addEventListener("click", (e) => {
    pressAnimation(e);
    const key = e.target.getAttribute("data-key");

    switch (key) {
      case "Enter":
        getResult();
        break;
      case "Backspace":
        eraseValue();
        break;
      case "Delete":
        eraseAll();
        break;
      case ".":
        convertDecimal();
        break;
      default:
        if (key >= "0" && key <= "9") {
          handleDigitInput(e);
        } else if (["+", "-", "*", "/"].includes(key)) {
          handleOperatorInput(e);
        }
        break;
    }
  });
});

// Keyboard Support
window.addEventListener("keydown", (e) => {
  if (["Enter", "Backspace", "Delete"].includes(e.key)) {
    e.preventDefault();
  }

  const keyButton = document.querySelector(`.key[data-key="${e.key}"]`);

  if (keyButton) {
    keyButton.click();
  }
});
