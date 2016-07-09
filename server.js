// Declare variables here for global use
var http = require('request');
var jsonServer = require('json-server');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var resourceUtils = require('./resource_utils');
var adminServer;
var adminRouter;
var adminMiddlewares;
var dataJsonServer;
var dataServer;
var dataServerInstance;
var dataRouter;
var dataMiddlewares;
var _resources;

/*=============================================================================
	Run the admin database (to store resource descriptions)
=============================================================================*/
	var startAdminServer = function() {
		adminServer = jsonServer.create();
		adminRouter = jsonServer.router('admin_db.json');
		adminMiddlewares = jsonServer.defaults();

		adminServer.use(adminMiddlewares);

		adminServer.use((req, res, next) => {
			// Pass immediately on to JSON server
			next();

			// Stop and start the JSON server
		  if (req.method === 'POST' ||
		  		req.method === 'PUT' ||
		  		req.method === 'DELETE') {

		  	setTimeout(() => {
		  		http('http://localhost:1401/resources', (error, response, body) => {
		  			var resources = JSON.parse(body);
		  			_resources = JSON.parse(body);
		  			console.log("Database updated at: http://localhost:1400");
		  			dataRouter.db.setState(resourceUtils.generateDatabase(resources));
		  		});
		  	}, 2000);
		  }
		});

		adminServer.use(adminRouter);
		adminServer.listen(1401, () => {
		  console.log('Admin database running at: http://localhost:1401');
		  startDatabaseServer();
		});
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
		  _resources = resources;
		  dataServer = jsonServer.create();
		  dataRouter = jsonServer.router(resourceUtils.generateDatabase(resources));
		  dataMiddlewares = jsonServer.defaults();

		  dataServer.use(dataMiddlewares);

		  dataServer.use((req, res, next) => {
		  	// Check that the method is supported by the configuration
		  	// first get the resource description in question and then
		  	// check that the method is supported before passing it to
		  	// json server. Otherwise throw a 405 method not allowed
		  	var requestedResourceName = req.originalUrl.split('/')[1];
		  	var requestedResourceDescription = _resources.find(function(resource) {
		  		return resource.name === requestedResourceName;
		  	});

		  	if (req.method === 'GET' && requestedResourceDescription.supported_methods.get) {
		  		next();
		  	} else if (req.method === 'POST' && requestedResourceDescription.supported_methods.post) {
		  		next();
		  	} else if (req.method === 'PUT' && requestedResourceDescription.supported_methods.put) {
		  		next();
		  	} else if (req.method === 'DELETE' && requestedResourceDescription.supported_methods.delete) {
		  		next();
		  	} else {
		  		res.status(405).send(`Method isn't supported for this resource`);
		  	}
		  });

		  dataServer.use(dataRouter);
		  dataServerInstance = dataServer.listen(1400, function () {
		    console.log('Database running at: http://localhost:1400');
		  });
		});
	}

/*=============================================================================
	Start up the admin front-end for managing resources and settings
=============================================================================*/
	var startFrontEndServer = function() {
		new WebpackDevServer(webpack(config), {
		  publicPath: config.output.publicPath,
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