const express = require('express');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/', indexRouter);

app.listen(8080);
console.log("Server started, listening on port 8080")
