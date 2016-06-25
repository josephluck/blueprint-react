// Declare variables here for global use
var http = require('request');
var jsonServer = require('json-server');
var faker = require('faker');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
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
		  			_resources = JSON.parse(body);
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
		} else if (property.type === 'child_resource') {
			return generateValueFromAnotherResource(property);
		}
	}

/*=============================================================================
	Returns a random value given a properties description
	Uses faker.js (see docs for more info)
=============================================================================*/
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
	Check whether a child resource has a model key that requests it's parent i.e:

	users_model : [{
		type: 'child_resource',
		child_resource_name: 'comments'
	}];
	comments_model: [{
		type: 'child_resource',
		child_resource_name: 'users'
	}];

	The above will fail since it'll cause an infinite loop of generateResource
	calls.
=============================================================================*/
	function childResourceContainsRecursiveParent(resource_name, child_resource) {
		for (var i = 0, x = child_resource.model.length; i < x; i++) {
			if (child_resource.model[i].type === 'child_resource') {
				if (child_resource.model[i].name === resource_name) {
					return true
				}
			}
		}

		return false
	}

/*=============================================================================
	Get a random sub-set of an array
=============================================================================*/
	function getRandomSample(array, count) {
    var indices = [];
    var result = new Array(count);
    for (var i = 0; i < count; i++) {
      var j = Math.floor(Math.random() * (array.length - i) + i);
      result[i] = array[indices[j] === undefined ? j : indices[j]];
      indices[j] = indices[i] === undefined ? i : indices[i];
    }
    return result;
	}

/*=============================================================================
	Generate a key's value from another resource i.e. a post has an author
	where posts and users are resources
=============================================================================*/
	generateValueFromAnotherResource = function(property) {
		for (var i = 0, x = _resources.length; i < x; i++) {
			if (_resources[i].name === property.child_resource_name) {
				var resource_description = _resources[i];
				break;
			}
		}

		if (childResourceContainsRecursiveParent(property.child_resource_name, resource_description)) {
			return "ERROR, " + property.child_resource_name + " is a recursive key";
		} else {
			// Refactor this line below so it doesn't generate the resource
			// but is the prevously-generated resource.
			var resource = generateResource(resource_description);

			if (property.child_resource_method === 'array') {
				if (property.child_resource_limit) {
					var limit = parseFloat(property.child_resource_limit);
					if (limit > resource.length) {
						return resource;
					} else {
						return getRandomSample(resource, limit);
					}
				} else {
					return resource;
				}
			} else if (property.child_resource_method === 'object') {
				return resource[Math.floor((Math.random() * resource.length))];
			} else if  (property.child_resource_method === 'id') {
				return resource[Math.floor((Math.random() * resource.length))].id;
			}
		}
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
		  _resources = resources;
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