const keys = document.querySelectorAll(".key");
const doyKey = document.querySelector(".punctuation");
const output = document.getElementById("output");

// operators keys
const sumKey = document.querySelector(".sum");
const minusKey = document.querySelector(".minus");
const multiplyKey = document.querySelector(".multiply");
const divideKey = document.querySelector(".divide");

// result and erasing keys
const resultKey = document.querySelector(".enter");
const eraseKey = document.querySelector(".erase");
const eraseAll = document.querySelector(".erase-all");

let result = 0;
let num1;
let num2;
let operator;

function add(...args) {
  let sum = [...args].reduce((a, b) => a + b, 0);
  result = sum;
  return result;
}
function subtract(...args) {
  let minus = args.reduce((a, b) => a - b);
  result = minus;
  return result;
}

function multiply(...args) {
  let multiplication = args.reduce((a, b) => a * b);
  result = multiplication;
  return result;
}

function divide(...args) {
    let division = args.reduce((a, b) => a / b);
    result = division;
    return result;
}