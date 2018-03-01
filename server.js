const http = require('http');
const express = require('express');
const app = express();
const isDevMode = process.env.NODE_ENV === 'development';
const request = require('request')
const history = require('connect-history-api-fallback');
const config = require('config');

app.use(require('morgan')('short'));
app.use(history());

(function initWebpack() {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack/common.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

  app.use(express.static(__dirname + '/', {
    setHeaders: function(res, path, stat) {
      res.header('Cache-Control', 'no-cache, no-store, must-revalidate'); // 1 year in milliseconds
    }
  }));
  
})();

app.get(/.*/, function root(req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

const PORT = process.env.PORT || config.get('port');

const server = http.createServer(app);
server.listen(PORT, function onListen() {
  const address = server.address();
  console.log('Listening on: %j', address);
  console.log(' -> that probably means: http://localhost:%d', address.port);
});
