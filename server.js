/*=============================================================================
	Run the admin database (to store resource descriptions)
=============================================================================*/
	var startAdminServer = function() {
		var adminJsonServer = require('json-server');
		var adminServer = adminJsonServer.create();
		var adminRouter = adminJsonServer.router('admin_db.json');
		var adminMiddlewares = adminJsonServer.defaults();

		adminServer.use(adminMiddlewares);
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
			model[key] = generatePropertyValue(description);
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
		return faker[property.faker_category][property.faker_type].apply(null, args);
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
		var http = require('request');

		http('http://localhost:1401/resources', function (error, response, body) {
		  var resources = JSON.parse(body);
		  var dataJsonServer = require('json-server');
		  var dataServer = dataJsonServer.create();
		  var dataRouter = dataJsonServer.router(generateDatabase(resources));
		  var dataMiddlewares = dataJsonServer.defaults();

		  dataServer.use(dataMiddlewares);
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