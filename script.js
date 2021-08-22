const calculator = document.querySelector(".calc-grid");
const btns = calculator.querySelectorAll("button");
const output = calculator.querySelector(`div[data-type="output"]`);


btns.forEach(btn => btn.addEventListener("click", e => {
    let btnType = e.target.dataset.type;
    let currentInput = e.target.textContent;
    let prevInput = calculator.dataset.prevInput; 
    let operator = calculator.dataset.operator;
    let firstNumber = Number(calculator.dataset.firstNumber);
    let secondNumber = Number(calculator.dataset.secondNumber);
    

    if (btnType === "num-btn") {
       if (!prevInput) {
           output.textContent = currentInput;
           calculator.dataset.prevInput = output.textContent;
       } else {
           output.textContent = prevInput + currentInput;
           calculator.dataset.prevInput = output.textContent;
       }
        
    }

    if (btnType === "op-btn") {
        if(prevInput && !operator) {
            calculator.dataset.firstNumber = prevInput;            
            calculator.dataset.operator = currentInput;
             
        } else if(prevInput && operator) {
            calculator.dataset.secondNumber = output.textContent;
            operate(firstNumber, operator, secondNumber);
        } else return; 
        delete calculator.dataset.prevInput;
    }

    if (btnType === "eq-btn") {
        calculator.dataset.secondNumber = output.textContent;
        operate(firstNumber, operator, secondNumber);
    }

    if (btnType === "del-btn") {

    }

    if (btnType === "ac-btn") {
        Object.keys(calculator.dataset).forEach(dataKey => delete calculator.dataset[dataKey]);
        output.textContent = "0";
    }

    
}));

function operate(a, op, b) {
    if (op === "+") {console.log(a+b)}
    if (op === "-") {console.log(a-b)}
    if (op === "×") {console.log(a*b)}
    if (op === "÷") {console.log(a/b)}
}