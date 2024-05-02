$(document).ready(function() {
    let display = $('#display');
    let currentInput = '';
    let operation = null;
    let firstOperand = null;

    $('.digit').on('click', function() {
        let digit = $(this).text();
        if (digit === '.' && currentInput.includes('.')) {
            return;
        }
    
        currentInput += digit;
        display.text(currentInput);
    });

    $('.operation').on('click', function() {
        firstOperand = parseFloat(currentInput);
        operation = $(this).text();
        currentInput = '';
    });

    $('#equals').on('click', function() {
        let secondOperand = parseFloat(currentInput);
    
        $.ajax({
            url: 'http://localhost:3000/calculate',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ num1: firstOperand, num2: secondOperand, operation }),
            success: function(response) {
                display.text(response.result);
                currentInput = '' + response.result;
                firstOperand = null;
                operation = null;
            },
            error: function(jqXHR) {
                if (jqXHR.status === 400) {
                    display.text(jqXHR.responseText);
                } else {
                    display.text('Error');
                }
            }
        });
    });

    $('#clear').on('click', function() {
        currentInput = '';
        operation = null;
        firstOperand = null;
        display.text('0');
    });
});