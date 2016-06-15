/* eslint-disable no-var, strict */



var generateDatabase = function() {
	// This should return an object from the
	// database randomly generated from the
	// resources
	return {
		"users": [
			{
				"id": 1,
				"name": "Joseph"
			},
			{
				"id": 2,
				"name": "Hannah"
			}
		]
	}
}

// json-server for serving 3rd party apps
var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router(generateDatabase());
var middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, function () {
  console.log('JSON Server is running');
});





// Front-end UI
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(5000, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:5000');
});