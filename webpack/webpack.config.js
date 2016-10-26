var fs = require('fs');
require('babel-register')(JSON.parse(fs.readFileSync('./.babelrc', 'utf8')));

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var config = require('./config');
config = config.default ? config.default : config; // Node version export compat fix.
console.log('ENV [', config.get('env'), ']');
module.exports = require('./webpack/' + config.get('env'));
