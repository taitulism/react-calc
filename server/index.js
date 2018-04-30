const express = require('express');

const add       = require('./add');
const substract = require('./substract');
const multiply  = require('./multiply');
const divide    = require('./divide');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    next();
});

app.get('/add/:firstNum/:secondNum', add);
app.get('/substract/:firstNum/:secondNum', substract);
app.get('/multiply/:firstNum/:secondNum', multiply);
app.get('/divide/:firstNum/:secondNum', divide);

app.listen(3001, () => {
    console.log('Listening on port 3001...');
});
