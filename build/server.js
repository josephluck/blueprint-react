require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// Declare letiables here for global use
	
	// F deployment, the two admin server will serve
	// the bundle.js front-end app from build/bundle.js
	// so that this application can be deployed as a simple node
	// application.
	
	// We need to work out how the two json servers can be
	// slimmed down into one json server handling both the admin
	// and public apis
	
	// Refactor server code in to separate files, making
	// good use of ES2016 import / export code.
	
	// Remove references to Faker.js since this is an implementation
	// detail.
	
	// Implement testing
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var http = __webpack_require__(1);
	var JsonServer = __webpack_require__(2);
	var BodyParser = __webpack_require__(3);
	var ResourceUtils = __webpack_require__(4);
	
	// Path to adminDb.json relative to the root folder
	var pathToAdminPersistentStorage = './backend/adminDb.json';
	var dataRouter = void 0;
	
	var Server = function () {
		function Server() {
			_classCallCheck(this, Server);
		}
	
		_createClass(Server, [{
			key: 'startAdminServer',
	
			/*=============================================================================
	  	Run the admin database (to store resource descriptions)
	  =============================================================================*/
			value: function startAdminServer() {
				var _this = this;
	
				this.adminServer = JsonServer.create();
				this.adminRouter = JsonServer.router(pathToAdminPersistentStorage);
				var jsonServerMiddleware = JsonServer.defaults();
	
				this.adminServer.use(jsonServerMiddleware);
				this.adminServer.use(this.databaseServerUpdaterMiddleware);
				this.adminServer.use(this.adminRouter);
	
				this.adminServer.listen(1401, function () {
					console.log('Admin database running at: http://localhost:1401');
					_this.startDatabaseServer();
				});
			}
	
			/*=============================================================================
	  	Start up the database API (one that will be consumed by client's
	  	front-end projects).
	  	Uses JSON server (see docs for more info)
	  =============================================================================*/
	
		}, {
			key: 'startDatabaseServer',
			value: function startDatabaseServer() {
				var _this2 = this;
	
				http('http://localhost:1401/resources', function (error, response, body) {
					var resources = JSON.parse(body);
					var database = ResourceUtils.generateDatabase(resources);
					_this2.dataServer = JsonServer.create();
					dataRouter = JsonServer.router(database);
	
					_this2.dataServer.use(BodyParser.json());
					_this2.dataServer.use(JsonServer.defaults());
					_this2.dataServer.use(_this2.resourceMethodHelperMiddleware.bind(resources));
					_this2.dataServer.use(dataRouter);
	
					_this2.dataServer.listen(1400, function () {
						console.log('Database running at: http://localhost:1400');
					});
				});
			}
		}, {
			key: 'resourceMethodHelperMiddleware',
			value: function resourceMethodHelperMiddleware(req, res, next, resources) {
				// Check that the method is supported by the configuration
				// first get the resource description in question and then
				// check that the method is supported before passing it to
				// json server. Otherwise throw a 405 method not allowed
				var requestedResourceName = req.originalUrl.split('/')[1];
				var requestedResourceDescription = resources.find(function (resource) {
					return resource.name === requestedResourceName;
				});
	
				if (requestedResourceDescription) {
					if (req.method === 'GET' && requestedResourceDescription.supportedMethods.get) {
						next();
					} else if (req.method === 'POST' && requestedResourceDescription.supportedMethods.post) {
						var validationErrors = ResourceUtils.validateRequest(requestedResourceDescription, req.body);
						if (validationErrors) {
							res.status(400).send(validationErrors);
						} else {
							next();
						}
					} else if (req.method === 'PUT' && requestedResourceDescription.supportedMethods.put) {
						next();
					} else if (req.method === 'DELETE' && requestedResourceDescription.supportedMethods.destroy) {
						next();
					} else {
						res.status(405).send('Method isn\'t supported for this resource');
					}
				} else {
					// The resource doesn't exist but JSON server will handle the response for us
					next();
				}
			}
	
			/*=============================================================================
	  	When resources are updated, restart the database server
	  =============================================================================*/
	
		}, {
			key: 'databaseServerUpdaterMiddleware',
			value: function databaseServerUpdaterMiddleware(req, res, next) {
				// Pass immediately on to JSON server
				next();
	
				// Stop and start the JSON server
				if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
					setTimeout(function () {
						http('http://localhost:1401/resources', function (error, response, body) {
							console.log('Database updated at: http://localhost:1400');
							var resources = JSON.parse(body);
							var database = ResourceUtils.generateDatabase(resources);
							dataRouter.db.setState(database);
						});
					}, 2000);
				}
			}
		}, {
			key: 'start',
			value: function start() {
				this.startAdminServer();
			}
		}]);
	
		return Server;
	}();
	
	var server = new Server();
	server.start();

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("json-server");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var faker = __webpack_require__(5);
	var validate = __webpack_require__(6);
	var moment = __webpack_require__(7);
	
	/*=============================================================================
		Set some options for date validation
	=============================================================================*/
	validate.extend(validate.validators.datetime, {
		parse: function parse(value) {
			return +moment.utc(value);
		},
		format: function format(value, options) {
			var format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
			return moment.utc(value).format(format);
		}
	});
	
	/*=============================================================================
		Add new validators
	=============================================================================*/
	validate.validators.boolean = function (value) {
		if (value !== false && value !== true) {
			return 'must be true or false';
		}
	};
	
	var ResourceUtils = function () {
		function ResourceUtils() {
			_classCallCheck(this, ResourceUtils);
		}
	
		_createClass(ResourceUtils, [{
			key: 'generateResource',
	
			/*=============================================================================
	  	Generate a full resource (array of models)
	  	takes a description that defines what the resource looks like
	  	including it's model and associated description
	  =============================================================================*/
			value: function generateResource(description, resources, isNestedResource) {
				if (resources) {
					this.resources = resources;
				}
	
				if (description.type === 'array') {
					var resource = [];
					for (var i = 0, x = description.length; i < x; i++) {
						var model = this.generateModel(description.model);
						if (isNestedResource !== true) {
							model.id = i + 1;
						}
						resource.push(model);
					}
	
					return resource;
				}
				return this.generateModel(description.model);
			}
	
			/*=============================================================================
	  	Returns a model object based on it's description
	  =============================================================================*/
	
		}, {
			key: 'generateModel',
			value: function generateModel(description) {
				var model = {};
	
				for (var i = 0, x = description.length; i < x; i++) {
					var key = description[i].key;
					model[key] = this.generatePropertyValue(description[i]);
				}
	
				return model;
			}
	
			/*=============================================================================
	  	Returns a value for a properties key (for instance first_name)
	  	Get's passed in the property description and delegates to utility functions
	  	based on the properties type
	  =============================================================================*/
	
		}, {
			key: 'generatePropertyValue',
			value: function generatePropertyValue(property) {
				if (property.type === 'random') {
					return this.generateRandomValue(property);
				} else if (property.type === 'childResource') {
					return this.generateValueFromAnotherResource(property);
				} else if (property.type === 'object') {
					if (property.resource && property.resource.type) {
						return this.generateResource(property.resource, null, true);
					}
					return null;
				} else if (property.type === 'predefined') {
					return property.predefinedValue;
				}
			}
	
			/*=============================================================================
	  	Returns a random value given a properties description
	  	Uses faker.js (see docs for more info)
	  =============================================================================*/
	
		}, {
			key: 'generateRandomValue',
			value: function generateRandomValue(property) {
				if (property.fakerCategory && property.fakerSubCategory) {
					var args = [];
					if (property.fakerParams) {
						var keys = Object.keys(property.fakerParams);
						args = keys.map(function (key) {
							return property.fakerParams[key];
						});
					}
					return faker[property.fakerCategory][property.fakerSubCategory].apply(null, args);
				}
				return null;
			}
	
			/*=============================================================================
	  	Check whether a child resource has a model key that requests it's parent i.e:
	  		users_model : [{
	  		type: 'childResource',
	  		childResourceName: 'comments'
	  	}];
	  	comments_model: [{
	  		type: 'childResource',
	  		childResourceName: 'users'
	  	}];
	  		The above will fail since it'll cause an infinite loop of generateResource
	  	calls.
	  =============================================================================*/
	
		}, {
			key: 'doesChildResourceContainsRecursiveParent',
			value: function doesChildResourceContainsRecursiveParent(resourceName, childResource) {
				for (var i = 0, x = childResource.model.length; i < x; i++) {
					if (childResource.model[i].type === 'childResource') {
						if (childResource.model[i].name === resourceName) {
							return true;
						}
					}
				}
				return false;
			}
	
			/*=============================================================================
	  	Get a random sub-set of an array
	  =============================================================================*/
	
		}, {
			key: 'getRandomSample',
			value: function getRandomSample(array, count) {
				var indices = [];
				var result = new Array(count);
				for (var i = 0; i < count; i++) {
					var j = Math.floor(Math.random() * (array.length - i) + i);
					result[i] = !array[indices[j] ? j : indices[j]];
					indices[j] = !indices[i] ? i : indices[i];
				}
				return result;
			}
	
			/*=============================================================================
	  	Generate a key's value from another resource i.e. a post has an author
	  	where posts and users are resources
	  =============================================================================*/
	
		}, {
			key: 'generateValueFromAnotherResource',
			value: function generateValueFromAnotherResource(property) {
				var resourceDescription = void 0;
				for (var i = 0, x = this.resources.length; i < x; i++) {
					if (this.resources[i].name === property.childResourceName) {
						resourceDescription = this.resources[i];
						break;
					}
				}
	
				if (resourceDescription) {
					var childResourceContainsRecursiveParent = this.doesChildResourceContainsRecursiveParent(property.childResourceName, resourceDescription);
					if (childResourceContainsRecursiveParent) {
						return 'ERROR, ' + property.childResourceName + ' is a recursive key';
					}
					// Refactor this line below so it doesn't generate the resource
					// but is the prevously-generated resource.
					var resource = this.generateResource(resourceDescription);
	
					if (property.childResourceMethod === 'array') {
						if (property.childResourceLimit) {
							var limit = parseFloat(property.childResourceLimit);
							if (limit > resource.length) {
								return resource;
							}
							return this.getRandomSample(resource, limit);
						}
						return resource;
					} else if (property.childResourceMethod === 'object') {
						return resource[Math.floor(Math.random() * resource.length)];
					} else if (property.childResourceMethod === 'id') {
						return resource[Math.floor(Math.random() * resource.length)].id;
					}
				}
			}
	
			/*=============================================================================
	  	Returns a full database object from the descriptions stored in the
	  	admin DB
	  =============================================================================*/
	
		}, {
			key: 'generateDatabase',
			value: function generateDatabase(resources) {
				this.resources = resources;
				var database = {};
	
				for (var i = 0, x = resources.length; i < x; i++) {
					var resource = resources[i];
					database[resource.name] = this.generateResource(resource);
				}
	
				return database;
			}
	
			/*=============================================================================
	  	Validates a POST or PUT request against the model description if the key
	  	is a required parameter.
	  =============================================================================*/
	
		}, {
			key: 'validateRequest',
			value: function validateRequest(resource, request) {
				return validate(request, resource.validationConfig);
			}
	
			/*=============================================================================
	  	Generate validation config (for validate.js) for a resource
	  =============================================================================*/
	
		}, {
			key: 'generateValidationConfigForResource',
			value: function generateValidationConfigForResource(resource) {
				var _this = this;
	
				var validationConfig = {};
	
				// Generate a validate.js configuraton from the model description
				resource.model.map(function (parameter) {
					if (parameter.type === 'childResource') {
						// Handle a nested resource and validate it
					} else if (parameter.type === 'object') {
						// Handle a nested object / array and validate it
					} else {
						validationConfig[parameter.key] = _this.getSingleRequestParameterValidationRequirements(parameter);
					}
				});
	
				return validationConfig;
			}
	
			/*=============================================================================
	  	Generate the validate.js requirements for a single model.
	  =============================================================================*/
	
		}, {
			key: 'getSingleRequestParameterValidationRequirements',
			value: function getSingleRequestParameterValidationRequirements(parameter) {
				var config = {};
	
				if (parameter.required) {
					config.presence = true;
				}
	
				if (parameter.type === 'predefined') {
					// Handle predefined values
				} else if (parameter.type === 'random') {
					var exampleValue = this.generateRandomValue(parameter);
					var isBoolean = typeof exampleValue === 'boolean';
					var isString = typeof exampleValue === 'string';
	
					// Date validation (range)
					if (parameter.fakerCategory === 'date') {
						var dateType = parameter.fakerSubCategory;
						var fakerParams = parameter.fakerParams;
						if (dateType === 'between') {
							config.datetime = {};
							if (fakerParams.from) {
								config.datetime.earliest = fakerParams.from;
							}
							if (fakerParams.to) {
								config.datetime.latest = fakerParams.to;
							}
						} else if (dateType === 'future') {
							config.datetime = {};
							if (fakerParams.refDate) {
								config.datetime.earliest = fakerParams.refDate;
							}
							if (fakerParams.years) {
								//
								// NOTE: Refactor this so it works when this is run so it's always looking at todays date
								// Consider storing latest as the string 'today' and checking for that string when
								// validation is run
								//
	
								var refDate = fakerParams.refDate || new Date();
								config.datetime.latest = moment(refDate).add(fakerParams.years, 'years').format('YYYY-MM-DD');
							}
						} else if (dateType === 'past') {
							config.datetime = {};
							if (fakerParams.refDate) {
								config.datetime.latest = fakerParams.refDate;
							}
							if (fakerParams.years) {
								config.datetime.earliest = moment(fakerParams.refDate).subtract(fakerParams.years, 'years').format('YYYY-MM-DD');
							}
						} else if (dateType === 'month') {
							if (parameter.fakerSubCategory === 'month') {
								config.inclusion = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
							}
						} else {
							// Else it's just a random date, no min or max needed
							config.datetime = true;
						}
					} else if (parameter.fakerSubCategory === 'email') {
						config.email = true;
					} else if (parameter.fakerSubCategory === 'url') {
						config.url = true;
					} else if (isString && parameter.fakerSubCategory === 'arrayElement') {
						// We have to check if array is an array of strings since validate.js doesn't support
						// nested objects. TODO: write a validator that supports deepEqual of nested objects.
						config.inclusion = parameter.fakerParams.json;
					} else if (isBoolean) {
						config.boolean = true;
					} else if (parameter.fakerSubCategory === 'number') {
						config.numericality = true;
					}
				}
	
				return config;
			}
		}]);
	
		return ResourceUtils;
	}();
	
	module.exports = new ResourceUtils();

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("faker");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("validate.js");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map