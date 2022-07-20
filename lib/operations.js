let isOperation = (command) => {
    return (
        (command == 'sum' || command == '+') ||
        (command == 'subtraction' || command == '-') ||
        (command == 'division' || command == '/') ||
        (command == 'multiplication' || command == '*')
    )
}

let isSum = (command) => (command == 'sum' || command == '+')
let isSubtraction = (command) => (command == 'subtraction' || command == '-')
let isDivision = (command) => (command == 'division' || command == '/')
let isMultiplication = (command) => (command == 'multiplication' || command == '*')

let setOperationResult = (command, finalResult, numberInput) => {
    let operationResult = finalResult;

    if (isSum(command)) {
        operationResult += numberInput;
    }

    if (isSubtraction(command)) {
        operationResult = operationResult - numberInput;
    }

    if (isDivision(command)) {
        operationResult /= numberInput;
    }

    if (isMultiplication(command)) {
        operationResult *= numberInput;
    }

    return operationResult
}

let processOperation = (command, message) => {
    let isFirstValueOne = isMultiplication(command) || isDivision(command);

    let messageParameters = message.split(' ');
    let allInputsValid = true;
    let finalResult = messageParameters.shift();

    messageParameters.map((numberInput) => {
        let isValidInput = isNaN(Number(numberInput));

        if (isValidInput) {
            allInputsValid = false;
        } else {
            finalResult = setOperationResult(command, Number(finalResult), Number(numberInput));
        }
    })

    return {
        allInputsValid,
        finalResult
    }
}

let commandToChar = (command) => {
    let charCommand = '';

    if (isSum(command)){
        charCommand = '+';
    }
    
    if (isSubtraction(command)){
        charCommand = '-';
    }
    
    if (isMultiplication(command)){
        charCommand = '*';
    }
    
    if (isDivision(command)){
        charCommand = '/';
    }

    return charCommand;
}

module.exports = {
    setOperationResult,
    isOperation,
    processOperation,
    commandToChar
}