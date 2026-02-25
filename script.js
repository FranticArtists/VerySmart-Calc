const addition = document.getElementById('additionOperator')
const subtraction = document.getElementById('subtractionOperator')
const multiplication = document.getElementById('multiplicationOperator')
const division = document.getElementById('divisionOperator')

let result = document.getElementById('result')

const solve = document.getElementById('solveBtn')
solve.addEventListener('click', () => {
    const value1 = parseFloat(document.getElementById('firstNum').value)
    const value2 = parseFloat(document.getElementById('secondNum').value)
    
    const selectElement = document.getElementById('operation')
    let selectedValue = selectElement.value
    
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
})

function displayResult(p) {
    console.log('displayed result')
    const resultDiv = document.createElement('div')
    result.textContent = p
    resultDiv.append(result)
    document.querySelector('section').appendChild(resultDiv)
    console.log(result.innerText)
}

let p;

function addNums(value1, value2) {
    console.log('added nums')
    p = value1 + value2
    displayResult(p)
}

function subtractNums(value1, value2) {
    p = value1 - value2
    displayResult(p)
}

function multiplyNums(value1, value2) {
    p = value1 * value2
    displayResult(p)
}

function divideNums(value1, value2) {
    p = value1 / value2
    displayResult(p)
}

function roundNums(p, digit) {
    return Number(p.toFixed(digit));
}

function chopNums(number, digit) {
    let factor = Math.pow(10, digit);
    return Math.trunc(number * factor) / factor;
}

function absoluteError(p, pe) {
    return Math.abs(p - pe)
}

function relativeError(p, pe) {
    return Math.abs((p - pe) / pe)
}

function significantDigit(RelativeError) {
    for (let t = -20; t < 20; t++) {
        if (RelativeError <= 5 * Math.pow(10, t)) {
            return 5 * Math.pow(10, t);
        }
    }
}

function maximumAbsoluteError(SignificantDigit, p) {
    return SignificantDigit * p
}