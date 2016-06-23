// Declare variables here for global use
var http = require('request');
var jsonServer = require('json-server');
var adminServer;
var adminRouter;
var adminMiddlewares;
var dataJsonServer;
var dataServer;
var dataServerInstance;
var dataRouter;
var dataMiddlewares;

/*=============================================================================
	Run the admin database (to store resource descriptions)
=============================================================================*/
	var startAdminServer = function() {
		adminServer = jsonServer.create();
		adminRouter = jsonServer.router('admin_db.json');
		adminMiddlewares = jsonServer.defaults();

		adminServer.use(adminMiddlewares);

		adminServer.use(function (req, res, next) {
			// Pass immediately on to JSON server
			next();

			// Stop and start the JSON server
		  if (req.method === 'POST' ||
		  		req.method === 'PUT' ||
		  		req.method === 'DELETE') {

		  	setTimeout(function() {
		  		http('http://localhost:1401/resources', function(error, response, body) {
		  			var resources = JSON.parse(body);
		  			console.log("Database updated at: http://localhost:1400");
		  			dataRouter.db.setState(generateDatabase(resources));
		  		});
		  	}, 2000);
		  }
		});

		adminServer.use(adminRouter);
		adminServer.listen(1401, function () {
		  console.log('Admin database running at: http://localhost:1401');
		  startDatabaseServer();
		});
	}

/*=============================================================================
	Generate a full resource (array of models)
	takes a description that defines what the resource looks like
	including it's model and associated description
=============================================================================*/
	var generateResource = function(description) {
		if (description.type === 'array') {
			var resource = [];
			for (var i = 0, x = description.length; i < x; i++) {
				var model = generateModel(description.model);

				model['id'] = i + 1;
				resource.push(model);
			}

			return resource;
		} else {
			// This resource isn't a collection, it's a single object, or another type.
			// Handle use cases
		}
	}

/*=============================================================================
	Returns a model object based on it's description
=============================================================================*/
	var generateModel = function(description) {
		var model = {};

		for (var i = 0, x = description.length; i < x; i++) {
			var key = description[i].key;
			model[key] = generatePropertyValue(description[i]);
		}

		return model;
	}

/*=============================================================================
	Returns a value for a properties key (for instance first_name)
	Get's passed in the property description and delegates to utility functions
	based on the properties type
=============================================================================*/
	var generatePropertyValue = function(property) {
		if (property.type === 'random') {
			return generateRandomValue(property);
		} else if (property.type === 'calculated') {
			return generateCalculatedValue(property);
		} else if (property.type === 'static') {
			return property.value;
		}
	}

/*=============================================================================
	Returns a random value given a properties description
	Uses faker.js (see docs for more info)
=============================================================================*/
	var faker = require('faker');
	var generateRandomValue = function(property) {
		var args;
		if (property.params) {
			var keys = Object.keys(property.params);
			args = keys.map(function(key, i) {
				return property.params[key];
			});
		}
		if (property.faker_category && property.faker_type) {
			return faker[property.faker_category][property.faker_type].apply(null, args);
		} else {
			return null;
		}
	}

/*=============================================================================
	Calculate a value based on other properties
=============================================================================*/
	var generateCalculatedValue = function(property) {
		return property.value;
	}

/*=============================================================================
	Returns a full database object from the descriptions stored in the
	admin DB
=============================================================================*/
	var generateDatabase = function(resources) {
		var database = {};

		for (var i = 0, x = resources.length; i < x; i ++) {
			var resource = resources[i];
			database[resource.name] = generateResource(resource);
		}

		return database;
	}

/*=============================================================================
	Start up the database API (one that will be consumed by client's
	front-end projects).
	Uses JSON server (see docs for more info)
=============================================================================*/
	var startDatabaseServer = function() {
		console.log('Starting database server')

		http('http://localhost:1401/resources', function(error, response, body) {
		  var resources = JSON.parse(body);
		  dataServer = jsonServer.create();
		  dataRouter = jsonServer.router(generateDatabase(resources));
		  dataMiddlewares = jsonServer.defaults();

		  dataServer.use(dataMiddlewares);
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
		var webpack = require('webpack');
		var WebpackDevServer = require('webpack-dev-server');
		var config = require('./webpack.config');

		new WebpackDevServer(webpack(config), {
		  publicPath: config.output.publicPath,
		  hot: true,
		  historyApiFallback: true
		}).listen(1402, 'localhost', function (err) {
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



