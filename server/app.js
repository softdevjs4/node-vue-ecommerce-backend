const passport = require("passport");
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// DB connection
mongoose.connect(config.get('mongoURI'), { useNewUrlParser: true })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log(err));

// Load body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Helmet
app.use(helmet());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./utils/passport")(passport);

// Helper for development environment
if (app.get('env') == 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enable...');
}

// CORS middleware
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}

app.use(allowCrossDomain)

// All routes
require('./api/index')(app);

// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listing on port ${3000}`));