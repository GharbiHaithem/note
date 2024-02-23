// middleware/io.js

const socketConfig = require('../socketConfig');
const io = socketConfig.io;

const attachIOToRequest = (req, res, next) => {
  req.io = io;
  next();
};

module.exports = { attachIOToRequest };
