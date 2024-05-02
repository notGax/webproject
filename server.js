const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

const app = express();
app.use(express.json());

let db;

MongoClient.connect('mongodb://localhost:27017/webproj', function(err, client) {
    if (err) throw err;

    db = client.db('webproj');

    app.post('/api/tasks', (req, res) => {
        const task = req.body.task;

        db.collection('tasks').insertOne({ task }, (err, result) => {
            if (err) {
                console.error('Error inserting task:', err);
                return res.status(500).send('Error inserting task');
            }

            res.json(result.ops[0]);
        });
    });

    // Start the Express server inside the callback
    app.listen(3000, function() {
        console.log('Server running on port 3000');
    });
});

app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'calculator.html'));
});

app.get('/todo', (req, res) => {
    res.sendFile(path.join(__dirname, 'todo.html'));
});



app.post('/convert', (req, res) => {
    const { amount, from, to } = req.body;

    https.get(`https://v6.exchangerate-api.com/v6/ce9666572fb59b99d2d9dc13/latest/${from}`, apiRes => {
        let data = '';

        apiRes.on('data', chunk => {
            data += chunk;
        });

        apiRes.on('end', () => {
            const parsedData = JSON.parse(data);

            if (!parsedData.conversion_rates) {
                console.error('Error response from API:', parsedData);
                return res.status(500).send('Error performing conversion');
            }
            const rate = parsedData.conversion_rates[to];
            const result = amount * rate;
            res.send({ result });
        });
    }).on('error', error => {
        console.error(error);
        res.status(500).send('Error performing conversion');
    });
});


app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;

    let result;
    switch(operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                return res.status(400).send('Cannot divide by zero');
            }
            result = num1 / num2;
            break;
        default:
            return res.status(400).send('Invalid operation');
    }

    res.send({ result });
});

app.listen(3000, () => console.log('Server running on port 3000'));