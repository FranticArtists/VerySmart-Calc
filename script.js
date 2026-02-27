const addition = document.getElementById('additionOperator')
const subtraction = document.getElementById('subtractionOperator')
const multiplication = document.getElementById('multiplicationOperator')
const division = document.getElementById('divisionOperator')

let result = document.getElementById('result')
let polynomialResult = document.getElementById('polynomialResult')
let absoluteErrorResult = document.getElementById('absoluteErrorResult')
let relativeErrorResult = document.getElementById('relativeErrorResult')
let maximumErrorResult = document.getElementById('maximumErrorResult')
let significantDigitsResult = document.getElementById('significantDigitsResult')

let p;
let rawResult;

const solve = document.getElementById('submitBtn')
solve.addEventListener('click', () => {
    let value1 = parseFloat(document.getElementById('firstNum').value)
    let value2 = parseFloat(document.getElementById('secondNum').value)
    
    const selectedElement = document.getElementById('operation')
    let selectedValue = selectedElement.value
    
    console.log('clicked solve button')
    switch (selectedValue) {
        case "addition":
            console.log('user chose addition')
            addNums(value1, value2)
            break;
        case "subtraction":
            subtractNums(value1, value2)
            break;
        case "multiplication":
            multiplyNums(value1, value2)
            break;
        case "division":
            divideNums(value1, value2)
            break;
        default:
            break;
    }
    
    rawResult = p
    result.textContent = p
    absoluteErrorResult.textContent = '-'
    relativeErrorResult.textContent = '-'
    maximumErrorResult.textContent = '-'
    significantDigitsResult.textContent = '-'
})

const applyChopRoundBtn = document.getElementById('applyChopRoundBtn')
applyChopRoundBtn.addEventListener('click', () => {
    if (rawResult === undefined) {
        alert('Please calculate a result first')
        return
    }
    
    let selectedRadioValue = document.getElementById('cedrick').value
    let significantValue = document.getElementById('significantDigits').value
    
    if (!significantValue) {
        alert('Please enter number of significant digits')
        return
    }
    
    if (selectedRadioValue == "chop") {
        p = chopNums(rawResult, significantValue)
    } else {
        p = roundNums(rawResult, significantValue)
    }
    
    displayResultWithErrors(p, rawResult, significantValue)
})


function addNums(value1, value2) {
    p = value1 + value2
    return p 
}

function subtractNums(value1, value2) {
    p = value1 - value2
    return p
}

function multiplyNums(value1, value2) {
    p = value1 * value2
    return p
}

function divideNums(value1, value2) {
    p = value1 / value2
    return p
}


function displayResult(p) {
    console.log('displayed result')
    result.textContent = p
}

function displayResultWithErrors(processedResult, rawResult, significantDigits) {
    console.log('displayed result with errors')
    
    // Display the processed result
    result.textContent = processedResult
    
    // Calculate absolute error
    const absError = absoluteError(rawResult, processedResult)
    absoluteErrorResult.textContent = absError.toFixed(10)
    
    // Calculate relative error
    const relError = relativeError(rawResult, processedResult)
    relativeErrorResult.textContent = relError.toExponential(5)
    
    // Calculate maximum absolute error
    const maxError = maximumAbsoluteError(0.5, Math.pow(10, -(significantDigits)))
    maximumErrorResult.textContent = maxError.toExponential(5)
    
    // Display significant digits
    significantDigitsResult.textContent = significantDigits
}

function roundNums(p, digit) {
    return Number(p.toFixed(digit));
}

let chopped;
function chopNums(p, digit) {
    let factor = Math.pow(10, digit);
    return chopped = Math.trunc(p * factor) / factor;
}

function normalize(RelativeError) {
    for (let t = -20; t < 20; t++) {
        if (RelativeError <= 5 * Math.pow(10, t)) {
            return t
        }
    }
}

function absoluteError(p, pe) {
    return Math.abs(p - pe)
}

function relativeError(p, pe) {
    return Math.abs((p - pe) / pe)
}


function maximumAbsoluteError(SignificantDigit, p) {
    return SignificantDigit * p
}

function evalPolynomial(expression, scope) {
    try {
        return math.evaluate(expression, scope);
    }
    catch (error) {
        return "Error: " + error.message;
    }
}

const polynomialBtn = document.getElementById('evaluatePolynomialBtn')

polynomialBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const expression = document.getElementById('polynomialFunction').value;
    const variableValue = parseFloat(document.getElementById('polynomialVariable').value);
    
    if (!expression || isNaN(variableValue)) {
        alert('Please enter both a polynomial function and a value for x');
        return;
    }
    
    const scope = { x: variableValue };
    const polyResult = evalPolynomial(expression, scope);
    polynomialResult.textContent = polyResult;
})