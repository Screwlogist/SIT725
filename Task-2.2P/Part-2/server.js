const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);


    const sum = num1 + num2;


    res.json({
        result: sum
    });
});

app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    const difference = num1 - num2;

    res.json({
        result: difference
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`GET Examples below`);
    console.log(`- Addition: http://localhost:${port}/add?num1=5&num2=10`);
    console.log(`- Subtraction: http://localhost:${port}/subtract?num1=15&num2=5`);
});