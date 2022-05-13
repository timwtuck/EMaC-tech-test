const server = require('express')();
const apiRouter = require('./routes/api');
const errorHandler = require('./errors.js');

server.use('/api', apiRouter);

//errors
server.use(errorHandler.pathNotFound);
server.use(errorHandler.customError);

module.exports = server;
