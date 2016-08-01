var faker = require('faker');
var validate = require('validate.js');
var moment = require('moment');
var _resources = [];

/*=============================================================================
	Set some options for date validation
=============================================================================*/
validate.extend(validate.validators.datetime, {
  parse: function(value, options) {
    return + moment.utc(value);
  },
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

/*=============================================================================
	Add new validators
=============================================================================*/
validate.validators.boolean = function(value, options, key, attributes) {
	if (value !== false && value !== true) {
		return "must be true or false";
	}
}

module.exports = {
	/*=============================================================================
		Generate a full resource (array of models)
		takes a description that defines what the resource looks like
		including it's model and associated description
	=============================================================================*/
	generateResource: function(description, resources, isNestedResource) {
		if (resources) {
			_resources = resources;
		}

		if (description.type === 'array') {
			var resource = [];
			for (var i = 0, x = description.length; i < x; i++) {
				var model = this.generateModel(description.model);

				if (isNestedResource !== true) {
					model['id'] = i + 1;
				}

				resource.push(model);
			}

			return resource;
		} else {
			return this.generateModel(description.model);
		}
	},

	/*=============================================================================
		Returns a model object based on it's description
	=============================================================================*/
	generateModel: function(description) {
		var model = {};

		for (var i = 0, x = description.length; i < x; i++) {
			var key = description[i].key;
			model[key] = this.generatePropertyValue(description[i]);
		}

		return model;
	},

	/*=============================================================================
		Returns a value for a properties key (for instance first_name)
		Get's passed in the property description and delegates to utility functions
		based on the properties type
	=============================================================================*/
	generatePropertyValue: function(property) {
		if (property.type === 'random') {
			return this.generateRandomValue(property);
		} else if (property.type === 'childResource') {
			return this.generateValueFromAnotherResource(property);
		} else if (property.type === 'object') {
			if (property.resource && property.resource.type) {
				return this.generateResource(property.resource, null, true);
			} else {
				return null
			}
		} else if (property.type === 'predefined') {
			return property.predefinedValue;
		}
	},

	/*=============================================================================
		Returns a random value given a properties description
		Uses faker.js (see docs for more info)
	=============================================================================*/
	generateRandomValue: function(property) {
		if (property.fakerCategory && property.fakerSubCategory) {
			var args = [];
			if (property.fakerParams) {
				var keys = Object.keys(property.fakerParams);
				args = keys.map(function(key, i) {
					return property.fakerParams[key];
				});
			}
			return faker[property.fakerCategory][property.fakerSubCategory].apply(null, args);
		} else {
			return null;
		}
	},

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
	childResourceContainsRecursiveParent: function(resourceName, childResource) {
		for (var i = 0, x = childResource.model.length; i < x; i++) {
			if (childResource.model[i].type === 'childResource') {
				if (childResource.model[i].name === resourceName) {
					return true
				}
			}
		}

		return false
	},

	/*=============================================================================
		Get a random sub-set of an array
	=============================================================================*/
	getRandomSample: function(array, count) {
    var indices = [];
    var result = new Array(count);
    for (var i = 0; i < count; i++) {
      var j = Math.floor(Math.random() * (array.length - i) + i);
      result[i] = array[indices[j] === undefined ? j : indices[j]];
      indices[j] = indices[i] === undefined ? i : indices[i];
    }
    return result;
	},

	/*=============================================================================
		Generate a key's value from another resource i.e. a post has an author
		where posts and users are resources
	=============================================================================*/
	generateValueFromAnotherResource: function(property) {
		for (var i = 0, x = _resources.length; i < x; i++) {
			if (_resources[i].name === property.childResourceName) {
				var resourceDescription = _resources[i];
				break;
			}
		}

		if (resourceDescription) {
			if (this.childResourceContainsRecursiveParent(property.childResourceName, resourceDescription)) {
				return "ERROR, " + property.childResourceName + " is a recursive key";
			} else {
				// Refactor this line below so it doesn't generate the resource
				// but is the prevously-generated resource.
				var resource = this.generateResource(resourceDescription);

				if (property.childResourceMethod === 'array') {
					if (property.childResourceLimit) {
						var limit = parseFloat(property.childResourceLimit);
						if (limit > resource.length) {
							return resource;
						} else {
							return this.getRandomSample(resource, limit);
						}
					} else {
						return resource;
					}
				} else if (property.childResourceMethod === 'object') {
					return resource[Math.floor((Math.random() * resource.length))];
				} else if  (property.childResourceMethod === 'id') {
					return resource[Math.floor((Math.random() * resource.length))].id;
				}
			}
		}
	},

	/*=============================================================================
		Returns a full database object from the descriptions stored in the
		admin DB
	=============================================================================*/
	generateDatabase: function(resources) {
		_resources = resources;
		var database = {};

		for (var i = 0, x = resources.length; i < x; i ++) {
			var resource = resources[i];
			database[resource.name] = this.generateResource(resource);
		}

		return database;
	},

	/*=============================================================================
		Validates a POST or PUT request against the model description if the key
		is a required parameter.
	=============================================================================*/
	validateRequest: function(resource, request) {
		return validate(request, resource.validationConfig);
	},

	/*=============================================================================
		Generate validation config (for validate.js) for a resource
	=============================================================================*/
	generateValidationConfigForResource: function(resource) {
		var validationConfig = {};

		// Generate a validate.js configuraton from the model description
		resource.model.map((parameter) => {
			if (parameter.type === "childResource") {
				// Handle a nested resource and validate it
			} else if (parameter.type === "object") {
				// Handle a nested object / array and validate it
			} else {
				validationConfig[parameter.key] = this.getSingleRequestParameterValidationRequirements(parameter);
			}
		});

		return validationConfig;
	},

	/*=============================================================================
		Generate the validate.js requirements for a single model.
	=============================================================================*/
	getSingleRequestParameterValidationRequirements: function(parameter) {
		var config = {};
		var requiredType;

		if (parameter.required) {
			config.presence = true;
		}

		if (parameter.type === "predefined") {
			requiredType = parameter.predefinedType;
		} else if (parameter.type === "random") {
			var exampleValue = this.generateRandomValue(parameter); // Generate a random value from the resource description and grab it's type
			var isDate = moment(exampleValue).isValid();
			var isNumber = !isNaN(exampleValue);
			var isBoolean = typeof(exampleValue) === "boolean";
			var isString = typeof(exampleValue) === "string";

			if (isDate) {
				requiredType = "date";
			} else if (isNumber) {
				requiredType = "number";
			} else if (isBoolean) {
				requiredType = "boolean";
			} else {
				requiredType = "string";
			}

			// Date validation (range)
			if (parameter.fakerCategory === "date") {
				var dateType = parameter.fakerSubCategory; // Get the params from the model for min max etc
				var fakerParams = parameter.fakerParams;
				if (dateType === "between") {
					config.datetime = {}
					if (fakerParams.from) {
						config.datetime.earliest = fakerParams.from;
					}
					if (fakerParams.to) {
						config.datetime.latest = fakerParams.to;
					}
				} else if (dateType === "future") {
					config.datetime = {}
					if (fakerParams.refDate) {
						config.datetime.earliest = fakerParams.refDate;
					}
					if (fakerParams.years) {
						//
						// NOTE: Refactor this so it works when this is run so it's always looking at todays date
						// Consider storing latest as the string "today" and checking for that string when
						// validation is run
						//

						var refDate = fakerParams.refDate || new Date()
						config.datetime.latest = moment(refDate).add(fakerParams.years, 'years').format('YYYY-MM-DD');
					}
				} else if (dateType === "past") {
					config.datetime = {}
					if (fakerParams.refDate) {
						config.datetime.latest = fakerParams.refDate;
					}
					if (fakerParams.years) {
						config.datetime.earliest = moment(fakerParams.refDate).subtract(fakerParams.years, 'years').format('YYYY-MM-DD');
					}
				} else if (dateType === "month") {
					if (parameter.fakerSubCategory === "month") {
						config.inclusion = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
					}
				} else {
					// Else it's just a random date, no min or max needed
					config.datetime = true;
				}
			} else if (parameter.fakerSubCategory === "email") {
				config.email = true;
			} else if (parameter.fakerSubCategory === "url") {
				config.url = true
			} else if (isString && parameter.fakerSubCategory === "arrayElement") {
				// We have to check if array is an array of strings since validate.js doesn't support
				// nested objects. TODO: write a validator that supports deepEqual of nested objects.
				config.inclusion = parameter.fakerParams.json;
			} else if (isBoolean) {
				config.boolean = true;
			} else if (parameter.fakerSubCategory === "number") {
				config.numericality = true;
			}
		}

		return config;
	}
}