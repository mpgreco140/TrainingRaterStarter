const express = require('express');
require ('./config/config');
const models = require('./models');
const sessions = require

const app = express();

// CORS
app.use(function (req,res,next) {
  //Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  //Pass to next layer of middleware
  next();
});

app.get('/', (req, res) => { res.send('Hello World!') })

models.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connecr to the database:', err);
    });

if (CONFIG.app == 'dev') {
    models.sequelize.sync();
} 

app.get('/sessions', sessions.getAll)

module.exports = app;
