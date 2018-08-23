const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./server/config/config.json');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
require('./server/routes')(app);

app.set('superSecret', config.secret); // secret variable

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the yellow team server.',
}));

module.exports = app;