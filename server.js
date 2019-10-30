const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

const logger = (req, res, next) => {
  console.log(`MY CUSTOM LOGGER: [${new Date().toISOString()}] ${req.method} to ${req.path} from ${req.get('host')}`)
  next();
}

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

// Global Middleware
server.use(helmet()); // Third party
server.use(gateKeeper);
server.use(express.json()); // Built-in
server.use(logger); // Custom
server.use(morgan('dev')); // Third party

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
