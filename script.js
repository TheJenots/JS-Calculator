const calculator = document.querySelector(".calc-grid");
const btns = calculator.querySelectorAll("button");
const display = calculator.querySelector(`div[data-type="output"]`);


btns.forEach(btn => btn.addEventListener("click", e => {
    let btnType = e.target.dataset.type;
    let currentInput = e.target.textContent;
    let prevInput = calculator.dataset.prevInput; 
    let operator = calculator.dataset.operator;
    let firstNumber = parseFloat(calculator.dataset.firstNumber);
    let secondNumber = parseFloat(calculator.dataset.secondNumber);    

    if (btnType === "num-btn") {
       if (!prevInput) {
           display.textContent = currentInput;
           calculator.dataset.prevInput = display.textContent;
       } else if (prevInput.includes(".") && currentInput === ".") {
           return;
       }else {
           display.textContent = prevInput + currentInput;
           calculator.dataset.prevInput = display.textContent;
       }
       
    }

    if (btnType === "op-btn") {
        if(prevInput && !operator) {
            firstNumber = parseFloat(prevInput);
            calculator.dataset.operator = currentInput;
            calculator.dataset.firstNumber = firstNumber;
            delete calculator.dataset.prevInput;
            
        } else if(prevInput && operator) {
            secondNumber = parseFloat(prevInput);
            calculator.dataset.secondNumber = secondNumber;
            operate(firstNumber, operator, secondNumber);
            calculator.dataset.operator = currentInput;
            calculator.dataset.firstNumber = display.textContent;
            delete calculator.dataset.secondNumber;
            delete calculator.dataset.prevInput;
        } 
    } 

    if (btnType === "eq-btn") {
        secondNumber = parseFloat(prevInput);
        calculator.dataset.secondNumber = secondNumber;
        operate(firstNumber, operator, secondNumber);
        Object.keys(calculator.dataset).forEach(dataKey => delete calculator.dataset[dataKey]);

    }

    if (btnType === "del-btn") {
        display.textContent = prevInput.slice(0, ((prevInput.length)-1));
        calculator.dataset.prevInput = display.textContent;
    }

    if (btnType === "ac-btn") {
        Object.keys(calculator.dataset).forEach(dataKey => delete calculator.dataset[dataKey]);
        display.textContent = "0";
    }

    
}));

function operate(a, op, b) {
    let result = "";
    if (op === "+") result = a + b;
    if (op === "-") result = a - b;
    if (op === "×") result = a * b;
    if (op === "÷") result = a / b;
    display.textContent = result.toString().slice(0, 9);
}

