// Calculator application JavaScript

// Initialize Materialize components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize select dropdown
    var selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
});

// Calculate button event handler
document.getElementById('calculateBtn').addEventListener('click', calculateResult);

/**
 * Performs the calculation by calling the API
 */
async function calculateResult() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const operation = document.getElementById('operation').value;

    // Validate input
    if (!num1 || !num2) {
        M.toast({html: 'Please enter both numbers!', classes: 'red'});
        return;
    }

    try {
        // Call the API endpoint
        const response = await fetch(`/${operation}?num1=${num1}&num2=${num2}`);

        // Check if response is ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Display result and show result container
        displayResult(data.result);
    } catch (error) {
        console.error('Error:', error);
        M.toast({html: 'Error calculating result!', classes: 'red'});
    }
}

/**
 * Displays the calculation result
 * @param {number} result - The calculation result
 */
function displayResult(result) {
    // Update result text
    document.getElementById('result').textContent = `Result: ${result}`;

    // Show result container if hidden
    const resultContainer = document.getElementById('resultContainer');
    if (resultContainer.classList.contains('hide')) {
        resultContainer.classList.remove('hide');
    }

    // Add animation effect
    const resultElement = document.getElementById('result');
    resultElement.classList.add('scale-transition');
    resultElement.classList.add('scale-in');

    // Remove animation class after animation completes
    setTimeout(() => {
        resultElement.classList.remove('scale-in');
    }, 500);
}