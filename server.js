/*=============================================================================
	Run the admin database (to store resource descriptions)
=============================================================================*/
	var adminJsonServer = require('json-server');
	var adminServer = adminJsonServer.create();
	var adminRouter = adminJsonServer.router('admin_db.json');
	var adminMiddlewares = adminJsonServer.defaults();

	adminServer.use(adminMiddlewares);
	adminServer.use(adminRouter);
	adminServer.listen(1401, function () {
	  console.log('Admin database running at: http://localhost:1401');
	});

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
			return generateModel(description.model);
		}
	}

/*=============================================================================
	Returns a model object based on it's description
=============================================================================*/
	var generateModel = function(description) {
		var model = {};
		var model_keys = Object.keys(description);

		for (var i = 0, x = model_keys.length; i < x; i++) {
			var key = model_keys[i];
			model[key] = generatePropertyValue(description[key]);
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
	var generateDatabase = function() {
		var database = {};

		database['users'] = generateResource({
			type: 'array',
			name: 'users',
			length: 500,
			model: {
				first_name: {
					type: 'random',
					faker_category: 'name',
					faker_type: 'firstName',
				},
				last_name: {
					type: 'random',
					faker_category: 'name',
					faker_type: 'firstName'
				},
				address_line_1: {
					type: 'random',
					faker_category: 'random',
					faker_type: 'number',
					params: {
						max: 300,
						min: 1
					}
				},
				address_line_2: {
					type: 'random',
					faker_category: 'address',
					faker_type: 'streetName'
				},
				town: {
					type: 'random',
					faker_category: 'address',
					faker_type: 'county'
				},
				county: {
					type: 'random',
					faker_category: 'address',
					faker_type: 'state'
				},
				postcode: {
					type: 'random',
					faker_category: 'address',
					faker_type: 'zipCode'
				},
				country: {
					type: 'random',
					faker_category: 'address',
					faker_type: 'country'
				},
				date_of_birth: {
					type: 'random',
					faker_category: 'date',
					faker_type: 'between',
					params: {
						from: '2015-01-01',
						to: '2015-12-31'
					}
				},
				deleted: {
					type: 'random',
					faker_category: 'random',
					faker_type: 'boolean'
				}
			}
		});

		return database;
	}

/*=============================================================================
	Start up the API.
	Uses JSON server (see docs for more info)
=============================================================================*/
	var dataJsonServer = require('json-server');
	var dataServer = dataJsonServer.create();
	var dataRouter = dataJsonServer.router(generateDatabase());
	var dataMiddlewares = dataJsonServer.defaults();

	dataServer.use(dataMiddlewares);
	dataServer.use(dataRouter);
	dataServer.listen(1400, function () {
	  console.log('Database running at: http://localhost:1400');
	});




// // Local front-end dev server for consumer facing app
// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var config = require('./webpack.config');

// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true
// }).listen(1402, 'localhost', function (err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log('Frontend server running at: http://localhost:1402');
// });