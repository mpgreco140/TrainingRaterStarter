const express = require('express');
require('./config/config');
const models = require('./models');
require('./global_functions');
const sessions = require('./controllers/SessionsController');

const app = express();

app.get('/', (req, res) => { res.send('Hello World!') })

models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

if (CONFIG.app === 'dev') {
  models.sequelize.sync();
}


app.get('/sessions', sessions.getAll);
app.get('/sessions/:sessionId', sessions.get);

module.exports = app;
