let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.getElementById("clear-btn");
const equalsButton = document.getElementById("equals-btn");
const deleteButton = document.querySelector("[data-delete]");
const pointButton = document.getElementById("point-btn");
const previousDisplay = document.getElementById("display-previous-id");
const currentDisplay = document.getElementById("display-current-id");

clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);
equalsButton.addEventListener("click", compute);

// Handle number and operator buttons
numberButtons.forEach((button) => {
    button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => setOperation(button.textContent));
});


// Append number onto screen
function appendNumber(number) {
    if (currentDisplay.textContent === '0' || shouldResetScreen) resetScreen();
    currentDisplay.textContent += number;
}

// Reset screen when click on new number
function resetScreen() {
    currentDisplay.textContent = "";
    shouldResetScreen = false;
}

function clear() {
    currentDisplay.textContent = "";
    previousDisplay.textContent = "";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
}

// Append the point (.) to the display
function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (currentDisplay.textContent === "") currentDisplay.textContent = "0";
    if (currentDisplay.textContent.includes(".")) return;
    currentDisplay.textContent += ".";
}

function deleteNumber() {
    currentDisplay.textContent = currentDisplay.textContent
        .toString()
        .slice(0, -1);
}

// Take the operator and send it to compute 
function setOperation(operator) {
    if (currentOperation !== null) compute();
    firstOperand = currentDisplay.textContent;
    currentOperation = operator;
    previousDisplay.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
}

// Give an error if divide by 0 and send over props to the math functions
function compute() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === "÷" && currentDisplay.textContent === "0") {
        alert("ERROR! Cannot divide by 0");
        return;
    }

    // send over the props to math functions
    secondOperand = currentDisplay.textContent;
    currentDisplay.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    
    // display the previous buttons clicked
    previousDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

// Basic math functions
function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// This function takes the OPERATOR and 2 NUMBERS and calls one of the functions above
function operate(operator, a, b) {
    // Convert to a number otherwise JS will concat it as String
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return substract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            if (b === 0) return null;
            return divide(a, b);
        default:
            return null;
    }
}
