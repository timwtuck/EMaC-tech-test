const ENV = process.env.NODE_ENV || 'development';

const path = `${__dirname}/${ENV}/data.json`;
module.exports = require(path);
