const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');
const logger = require("./api/logger-middleware")

const server = express();

const gateKeeper = (req, res, next) => {
  // Data can come in the body, url parameters, query string, headers
  // New way of reading data sent by client
  const password = req.headers.password;

  if (!password) {
    res.status(400).json({ message: "Please provide a password." })
  } else if (password.toLowerCase() === 'mellon') {
    next();
  } else {
    res.status(401).json({ message: 'You shall not pass!'})
  }
}

const doubler = (req, res, next) => {
  // Everything coming from the URL is a string
  const number = +req.query.number || 1;

  req.doubled = number * 2;

  next();
}

// Global Middleware
server.use(helmet()); // Third party
server.use(gateKeeper);
server.use(express.json()); // Built-in
server.use(logger); // Custom
server.use(morgan('dev')); // Third party

server.use('/api/hubs', hubsRouter);

server.get('/', doubler, (req, res) => {
  res.status(200).json({ number: req.doubled })
});

module.exports = server;
