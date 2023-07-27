const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

for (let key of keys) {
    const value = key.dataset.key;
    
    key.addEventListener('click', () => {
        if (value === "clear") {
            input = "";  // input is empty
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        } else if (value === "backspace") {
            input = input.slice(0,-1);  // removes the last element in the input box
            display_input.innerHTML = CleanInput(input);
        } else if (value === "=") {
            let result = eval(PrepareInput(input));  
            // eval is not good practice usually as it could allow users to execcute javascript on your site, however in this case
            // as the input can be only the numbers pressed it cannot create those injection and would be only locally on their computers
            display_output.innerHTML = CleanOutput(result);
        } else if (value === "brackets") {
            if (
                input.indexOf("(") == -1 ||  // if the open bracket doesn't exist or
                input.indexOf("(") != -1 &&  // the open bracket exists and 
                input.indexOf(")") != -1 &&  // the closing bracket also exists and 
                input.lastIndexOf("(") < input.lastIndexOf(")")  // if ")" is after "("
                ) {
                input += "(";  // open a new bracket 
            } else if (
                input.indexOf("(") != -1 &&  // open brack exists and 
                input.indexOf(")") == -1 ||  // closing bracket doesn't exist or
                input.indexOf("(") != -1 &&  // if opening does exist and
                input.indexOf(")") != -1 &&  // if closing bracket also exist and
                input.lastIndexOf("(") > input.lastIndexOf(")")  // of "(" is after ")" can be added ")"
                ) {
                input += ")"; 
            }  
            display_input.innerHTML = CleanInput(input);
        } else {
            if (ValidateInput(value)) {
            input += value;
            display_input.innerHTML = CleanInput(input); 
            }
        }
    })
}

// cleaning inputs

function CleanInput(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;
    
    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == "*") {
            input_array[i] = ' <span class="operator">x</span> '; // it will display an x every time is clicked
        } else if (input_array[i] == "/") {
            input_array[i] = ' <span class="operator">÷</span> '; // it will display an ÷ every time is clicked
        } else if (input_array[i] == "+") {
            input_array[i] = ' <span class="operator">+</span> '; // it will display an + every time is clicked
        } else if (input_array[i] == "-") {
            input_array[i] = ' <span class="operator">-</span> '; // it will display an - every time is clicked
        } else if (input_array[i] == "(") {
            input_array[i] = ' <span class="brackets">(</span> '; // it will display an ( every time is clicked
        } else if (input_array[i] == ")") {
            input_array[i] = ' <span class="brackets">)</span> '; // it will display an ) every time is clicked
        } else if (input_array[i] == "%") {
            input_array[i] = ' <span class="percent">%</span> '; // it will display an % every time is clicked
        }
    }
    return input_array.join("");
}


function CleanOutput(output) {
    let output_string = output.toString();  // bring output into a string
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];
    
    let output_array = output_string.split("");
    
    if (output_array.length > 3) {
        for (let i = output_array.length - 3; i > 0; i-=3) {
            output_array.splice(i, 0, ","); // 
        }
    }
    
    if (decimal) {
        output_array.push(".");
        output_array.push(decimal);
    }
    
    return output_array.join("");
}

function ValidateInput(value) {
    let last_input = input.slice(-1);  // last element entered
    let operators = ["+", "-", "*", "/"];
    
    if (value == "." && last_input ==".") {
        return false;  // to avoid to consecutive points
    }
    
    if (operators.includes(value)) {
        if (operators.includes(last_input)) {
            return false;
        } else {
            return true;
        }
    }
    return true;
}

function PrepareInput (input) {
    let input_array = input.split("");
    
    for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] == "%") {
            input_array[i] = "/100";
        }
    }
    
    return input_array.join("");
}