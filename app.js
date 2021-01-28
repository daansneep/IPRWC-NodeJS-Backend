const express = require('express');
const bodyParser = require('body-parser');

const profileRoutes = require('./routes/profileRoutes');
const webshopRoutes = require('./routes/webshopRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// view engine setup
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/profile', profileRoutes);
app.use('/webshop', webshopRoutes);
app.use('/auth', authRoutes);

app.listen(8080);
