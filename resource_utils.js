var faker = require('faker');
var validate = require('validate.js');
var moment = require('moment');
var _resources = [];

/*=============================================================================
	Set some optiosn for date validation
=============================================================================*/
validate.extend(validate.validators.datetime, {
  parse: function(value, options) {
    return +moment.utc(value);
  },
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

validate.validators.email = function(value, options, key, attributes) {
	var valid_email_address = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
	if (!valid_email_address) {
		return "is not a valid email address";
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
		} else if (property.type === 'child_resource') {
			return this.generateValueFromAnotherResource(property);
		} else if (property.type === 'object') {
			if (property.resource && property.resource.type) {
				return this.generateResource(property.resource, null, true);
			} else {
				return null
			}
		} else if (property.type === 'predefined') {
			return property.predefined_value;
		}
	},

/*=============================================================================
	Returns a random value given a properties description
	Uses faker.js (see docs for more info)
=============================================================================*/
	generateRandomValue: function(property) {
		if (property.faker_category && property.faker_subcategory) {
			var args = [];
			if (property.faker_params) {
				var keys = Object.keys(property.faker_params);
				args = keys.map(function(key, i) {
					return property.faker_params[key];
				});
			}
			return faker[property.faker_category][property.faker_subcategory].apply(null, args);
		} else {
			return null;
		}
	},

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
	childResourceContainsRecursiveParent: function(resource_name, child_resource) {
		for (var i = 0, x = child_resource.model.length; i < x; i++) {
			if (child_resource.model[i].type === 'child_resource') {
				if (child_resource.model[i].name === resource_name) {
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
			if (_resources[i].name === property.child_resource_name) {
				var resource_description = _resources[i];
				break;
			}
		}

		if (resource_description) {
			if (this.childResourceContainsRecursiveParent(property.child_resource_name, resource_description)) {
				return "ERROR, " + property.child_resource_name + " is a recursive key";
			} else {
				// Refactor this line below so it doesn't generate the resource
				// but is the prevously-generated resource.
				var resource = this.generateResource(resource_description);

				if (property.child_resource_method === 'array') {
					if (property.child_resource_limit) {
						var limit = parseFloat(property.child_resource_limit);
						if (limit > resource.length) {
							return resource;
						} else {
							return this.getRandomSample(resource, limit);
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
		return validate(request, resource.validation_config);
	},

/*=============================================================================
	Generate validation config (for validate.js) for a resource
=============================================================================*/
	generateValidationConfigForResource: function(resource) {
		var validation_config = {};

		// Generate a validate.js configuraton from the model description
		resource.model.map((parameter) => {
			if (parameter.type === "child_resource") {
				// Handle a nested resource and validate it
			} else if (parameter.type === "object") {
				// Handle a nested object / array and validate it
			} else {
				validation_config[parameter.key] = this.getSingleRequestParameterValidationRequirements(parameter);
			}
		});

		return validation_config;
	},

/*=============================================================================
	Generate the validate.js requirements for a single model.
=============================================================================*/
	getSingleRequestParameterValidationRequirements: function(parameter) {
		var config = {};
		var required_type;

		if (parameter.required) {
			config.presence = true;
		}

		if (parameter.type === "predefined") {
			required_type = parameter.predefined_type;
		} else if (parameter.type === "random") {
			var example_value = this.generateRandomValue(parameter); // Generate a random value from the resource description and grab it's type
			var is_date = moment(example_value).isValid();
			var is_number = !isNaN(example_value);
			var is_boolean = typeof(example_value) === "boolean";
			var is_string = typeof(example_value) === "string";

			if (is_date) {
				required_type = "date";
			} else if (is_number) {
				required_type = "number";
			} else if (is_boolean) {
				required_type = "boolean";
			} else {
				required_type = "string";
			}

			// Date validation (range)
			if (parameter.faker_category === "date") {
				var date_type = parameter.faker_subcategory; // Get the params from the model for min max etc
				var faker_params = parameter.faker_params;
				if (date_type === "between") {
					config.datetime = {}
					if (faker_params.from) {
						config.datetime.earliest = faker_params.from;
					}
					if (faker_params.to) {
						config.datetime.latest = faker_params.to;
					}
				} else if (date_type === "future") {
					config.datetime = {}
					if (faker_params.refDate) {
						config.datetime.earliest = faker_params.refDate;
					}
					if (faker_params.years) {
						config.datetime.latest = moment(faker_params.refDate).add(faker_params.years, 'years').format('YYYY-MM-DD');
					}
				} else if (date_type === "past") {
					config.datetime = {}
					if (faker_params.refDate) {
						config.datetime.latest = faker_params.refDate;
					}
					if (faker_params.years) {
						config.datetime.earliest = moment(faker_params.refDate).subtract(faker_params.years, 'years').format('YYYY-MM-DD');
					}
				} else if (date_type === "month") {
					if (parameter.faker_subcategory === "month") {
						config.inclusion = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
					}
				} else {
					// Else it's just a random date, no min or max needed
					config.datetime = true;
				}
			} else if (parameter.faker_subcategory === "email") {
				config.email = true;
			} else if (parameter.faker_subcategory === "url") {
				config.url = true
			} else if (parameter.faker_subcategory === "arrayElement") {
				config.inclusion = parameter.faker_params.json;
			}
		}

		return config;
	}
}