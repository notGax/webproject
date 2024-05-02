document.getElementById('currency-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;

    fetch('/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, from, to })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = `${amount} ${from} is equal to ${data.result} ${to}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});