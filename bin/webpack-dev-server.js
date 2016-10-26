var fs = require('fs');
require('babel-register')(JSON.parse(fs.readFileSync('./.babelrc', 'utf8')));

var devServer = require('../webpack/webpack-dev-server');
devServer = devServer.default ? devServer.default : devServer; // Node version export compat fix.

var config = require('../webpack/config');
config = config.default ? config.default : config; // Node version export compat fix.

const host = config.get('webpack_host');
const port = config.get('webpack_port');
devServer.listen(port, host, function () {
  console.log('Webpack dev server running at ${host}: ${port}'); // eslint-disable-line
});
