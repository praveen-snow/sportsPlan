var express = require('express');
var proxyMiddleware = require('http-proxy-middleware');
var url = require('url');
var app = express();
var PORT = process.env.PORT || 3030;

app.use(express.static(__dirname + '/../build/webpack'));
app.use('/assets', express.static(__dirname + '/../src/assets'));
app.listen(PORT);

console.log("Running dist server on port " + PORT);
