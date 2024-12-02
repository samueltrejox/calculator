// main element
const digit = document.querySelectorAll(".digit");

// erase elements
const eraseAllBtn = document.getElementById("erase-all");
const eraseValueBtn = document.getElementById("erase");

// operators and results
const resultBtn = document.getElementById("enter");
const operatorsButtons = document.querySelectorAll(".operator");

let currentDisplay = "0";
let operator = "";
let operand1 = "";
let operand2 = "";
let total;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// event listener for digits
digit.forEach((key) => {
  key.addEventListener("click", (e) => {
    if (operator === "") {
      operand1 += e.target.innerText;
      currentDisplay = operand1;
    } else {
      operand2 += e.target.innerText;
      currentDisplay = operand2;
    }
    updateDisplay();
  });
});

// event listeners for buttons
resultBtn.addEventListener("click", () => {
  if (!operand1 || !operand2 || !operator) {
    return;
  } else if (operand1 && operand2) {
    total = operate(operator, parseInt(operand1), parseInt(operand2));
    currentDisplay = total;
    updateDisplay();
    operand1 = total;
    operand2 = "";
  }
});

operatorsButtons.forEach((op) => {
  op.addEventListener("click", (e) => {
    let operatorPressed = false;
    if (!operand1 || operatorPressed) return;
    operatorPressed = true;
    if (operand2) {
      total = operate(operator, parseInt(operand1), parseInt(operand2));
      currentDisplay = total;
      operand1 = total;
      operand2 = "";
    }

    operator = e.target.innerText;
    updateDisplay();
  });
});

eraseAllBtn.addEventListener('click', eraseAll);
eraseValueBtn.addEventListener('click', eraseValue);

function updateDisplay() {
  const displayElement = document.getElementById("output");
  displayElement.innerText = currentDisplay;
  if (currentDisplay.length > 15) {
    displayElement.innerText = currentDisplay.substring(0, 15);
  }
}

function eraseValue() {
    let updatedDisplay = currentDisplay.slice(0, -1) || '0';
    
    if (operand1 === currentDisplay) {
        operand1 = updatedDisplay;
    } else if (operand2 === currentDisplay) {
        operand2 = updatedDisplay;
    }
    
    currentDisplay = updatedDisplay;
    updateDisplay();
}

function eraseAll() {
    currentDisplay = '0';
    operand1 = '';
    operand2 = '';
    operator = '';
    updateDisplay();
}


function operate(operator, operand1, operand2) {
  switch (operator) {
    case "+":
      return add(operand1, operand2);
    case "-":
      return subtract(operand1, operand2);
    case "&times;":
      return multiply(operand1, operand2);
    case "÷":
      return operand2 === 0 ? "Error D:" : divide(operand1, operand2);
  }
}
