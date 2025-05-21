const result = document.getElementById('result');

function appendToDisplay(value) {    if (value === '.' && result.value.includes('.')) return;
    if (['+', '-', '*', '/', '%'].includes(value)) {
        const lastChar = result.value.slice(-1);
        if (['+', '-', '*', '/', '%'].includes(lastChar)) {
            result.value = result.value.slice(0, -1) + value;
            return;
        }
    }
    
    result.value += value;
}

function clearDisplay() {
    result.value = '';
}

function deleteLastChar() {
    result.value = result.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = result.value.replace(/×/g, '*');
        if (!expression) return;
        
        let calculatedResult = eval(expression);
        if (calculatedResult.toString().includes('.')) {
            calculatedResult = parseFloat(calculatedResult.toFixed(8));
        }
        
        result.value = calculatedResult;
    } catch (error) {
        result.value = 'Error';
        setTimeout(clearDisplay, 1500);
    }
}
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[\d+\-*/.%]/.test(key)) {
        appendToDisplay(key);
    }
        else if (key === 'Enter') {
        calculate();
    }
    else if (key === 'Backspace') {
        deleteLastChar();
    }
    else if (key === 'Escape') {
        clearDisplay();
    }
});