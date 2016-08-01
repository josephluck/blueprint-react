// Declare variables here for global use
var http = require('request');
var jsonServer = require('json-server');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var resourceUtils = require('./resource_utils');
var dataRouter;
// var _resources;

/*=============================================================================
	When resources are updated, restart the database server
=============================================================================*/
var databaseServerUpdaterMiddleware = function (req, res, next) {
	// Pass immediately on to JSON server
	next();

	// Stop and start the JSON server
  if (req.method === 'POST' ||
  		req.method === 'PUT' ||
  		req.method === 'DELETE') {

  	setTimeout(() => {
  		http('http://localhost:1401/resources', (error, response, body) => {
  			var resources = JSON.parse(body);
  			// _resources = JSON.parse(body);
  			console.log("Database updated at: http://localhost:1400");
  			dataRouter.db.setState(resourceUtils.generateDatabase(resources));
  		});
  	}, 2000);
  }
}

/*=============================================================================
	Run the admin database (to store resource descriptions)
=============================================================================*/
var startAdminServer = function() {
	var adminServer = jsonServer.create();
	var adminRouter = jsonServer.router('admin_db.json');

	adminServer.use(jsonServer.defaults());
	adminServer.use(databaseServerUpdaterMiddleware);
	adminServer.use(adminRouter);

	adminServer.listen(1401, () => {
	  console.log('Admin database running at: http://localhost:1401');
	  startDatabaseServer();
	});
}

var resourceMethodHelperMiddleware = function (req, res, next) {
	// Check that the method is supported by the configuration
	// first get the resource description in question and then
	// check that the method is supported before passing it to
	// json server. Otherwise throw a 405 method not allowed
	var requestedResourceName = req.originalUrl.split('/')[1];
	var requestedResourceDescription = resources.find(function(resource) {
	// var requestedResourceDescription = _resources.find(function(resource) {
		return resource.name === requestedResourceName;
	});

	if (requestedResourceDescription) {
  	if (req.method === 'GET' && requestedResourceDescription.supportedMethods.get) {
  		next();
  	} else if (req.method === 'POST' && requestedResourceDescription.supportedMethods.post) {
  		validationErrors = resourceUtils.validateRequest(requestedResourceDescription, req.body);
  		if (validationErrors) {
  			res.status(400).send(validationErrors)
  		} else {
  			next();
  		}
  	} else if (req.method === 'PUT' && requestedResourceDescription.supportedMethods.put) {
  		next();
  	} else if (req.method === 'DELETE' && requestedResourceDescription.supportedMethods.destroy) {
  		next();
  	} else {
  		res.status(405).send(`Method isn't supported for this resource`);
  	}
	} else {
		// The resource doesn't exist but JSON server will handle the response for us
		next();
	}
}

/*=============================================================================
	Start up the database API (one that will be consumed by client's
	front-end projects).
	Uses JSON server (see docs for more info)
=============================================================================*/
var startDatabaseServer = function() {
	console.log('Starting database server')

	http('http://localhost:1401/resources', (error, response, body) => {
	  var resources = JSON.parse(body);
	  // _resources = resources;
	  var dataServer = jsonServer.create();
	  dataRouter = jsonServer.router(resourceUtils.generateDatabase(resources));

	  dataServer.use(bodyParser.json());
	  dataServer.use(jsonServer.defaults());

	  dataServer.use(resourceMethodHelperMiddleware);

	  dataServer.use(dataRouter);
	  dataServer.listen(1400, function () {
	    console.log('Database running at: http://localhost:1400');
	  });
	});
}

/*=============================================================================
	Start up the admin front-end for managing resources and settings
=============================================================================*/
var startFrontEndServer = function() {
	new WebpackDevServer(webpack(webpackConfig), {
	  publicPath: webpackConfig.output.publicPath,
	  hot: true,
	  historyApiFallback: true
	}).listen(1402, 'localhost', (err) => {
	  if (err) {
	    console.log(err);
	  }
	  console.log('Frontend server running at: http://localhost:1402');
	});
}

/*=============================================================================
	Bootstrap
=============================================================================*/
startAdminServer();
startFrontEndServer();