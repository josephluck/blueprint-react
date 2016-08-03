import faker from 'faker';
import validate from 'validate.js';
import moment from 'moment';

/*=============================================================================
	Set some options for date validation
=============================================================================*/
validate.extend(validate.validators.datetime, {
  parse: function (value) {
    return +moment.utc(value);
  },
  format: function (value, options) {
    let format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
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

class ResourceUtils {
	/*=============================================================================
		Generate a full resource (array of models)
		takes a description that defines what the resource looks like
		including it's model and associated description
	=============================================================================*/
	generateResource(description, resources, isNestedResource) {
		if (resources) {
			this.resources = resources;
		}

		if (description.type === 'array') {
			let resource = [];
			for (let i = 0, x = description.length; i < x; i++) {
				let model = this.generateModel(description.model);
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
	generateModel(description) {
		let model = {};

		for (let i = 0, x = description.length; i < x; i++) {
			let key = description[i].key;
			model[key] = this.generatePropertyValue(description[i]);
		}

		return model;
	}

	/*=============================================================================
		Returns a value for a properties key (for instance first_name)
		Get's passed in the property description and delegates to utility functions
		based on the properties type
	=============================================================================*/
	generatePropertyValue(property) {
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
	generateRandomValue(property) {
		if (property.fakerCategory && property.fakerSubCategory) {
			let args = [];
			if (property.fakerParams) {
				let keys = Object.keys(property.fakerParams);
				args = keys.map((key) => property.fakerParams[key]);
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
	doesChildResourceContainsRecursiveParent(resourceName, childResource) {
		for (let i = 0, x = childResource.model.length; i < x; i++) {
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
	getRandomSample(array, count) {
    let indices = [];
    let result = new Array(count);
    for (let i = 0; i < count; i++) {
      let j = Math.floor(Math.random() * (array.length - i) + i);
      result[i] = !array[indices[j] ? j : indices[j]];
      indices[j] = !indices[i] ? i : indices[i];
    }
    return result;
	}

	/*=============================================================================
		Generate a key's value from another resource i.e. a post has an author
		where posts and users are resources
	=============================================================================*/
	generateValueFromAnotherResource(property) {
		let resourceDescription;
		for (let i = 0, x = this.resources.length; i < x; i++) {
			if (this.resources[i].name === property.childResourceName) {
				resourceDescription = this.resources[i];
				break;
			}
		}

		if (resourceDescription) {
			let childResourceContainsRecursiveParent = this.doesChildResourceContainsRecursiveParent(property.childResourceName, resourceDescription);
			if (childResourceContainsRecursiveParent) {
				return 'ERROR, ' + property.childResourceName + ' is a recursive key';
			}
			// Refactor this line below so it doesn't generate the resource
			// but is the prevously-generated resource.
			let resource = this.generateResource(resourceDescription);

			if (property.childResourceMethod === 'array') {
				if (property.childResourceLimit) {
					let limit = parseFloat(property.childResourceLimit);
					if (limit > resource.length) {
						return resource;
					}
					return this.getRandomSample(resource, limit);
				}
				return resource;
			} else if (property.childResourceMethod === 'object') {
				return resource[Math.floor((Math.random() * resource.length))];
			} else if (property.childResourceMethod === 'id') {
				return resource[Math.floor((Math.random() * resource.length))].id;
			}
		}
	}

	/*=============================================================================
		Returns a full database object from the descriptions stored in the
		admin DB
	=============================================================================*/
	generateDatabase(resources) {
		this.resources = resources;
		let database = {};

		for (let i = 0, x = resources.length; i < x; i++) {
			let resource = resources[i];
			database[resource.name] = this.generateResource(resource);
		}

		return database;
	}

	/*=============================================================================
		Validates a POST or PUT request against the model description if the key
		is a required parameter.
	=============================================================================*/
	validateRequest(resource, request) {
		return validate(request, resource.validationConfig);
	}

	/*=============================================================================
		Generate validation config (for validate.js) for a resource
	=============================================================================*/
	generateValidationConfigForResource(resource) {
		let validationConfig = {};

		// Generate a validate.js configuraton from the model description
		resource.model.map((parameter) => {
			if (parameter.type === 'childResource') {
				// Handle a nested resource and validate it
			} else if (parameter.type === 'object') {
				// Handle a nested object / array and validate it
			} else {
				validationConfig[parameter.key] = this.getSingleRequestParameterValidationRequirements(parameter);
			}
		});

		return validationConfig;
	}

	/*=============================================================================
		Generate the validate.js requirements for a single model.
	=============================================================================*/
	getSingleRequestParameterValidationRequirements(parameter) {
		let config = {};

		if (parameter.required) {
			config.presence = true;
		}

		if (parameter.type === 'predefined') {
			// Handle predefined values
		} else if (parameter.type === 'random') {
			let exampleValue = this.generateRandomValue(parameter);
			let isBoolean = typeof (exampleValue) === 'boolean';
			let isString = typeof (exampleValue) === 'string';

			// Date validation (range)
			if (parameter.fakerCategory === 'date') {
				let dateType = parameter.fakerSubCategory;
				let fakerParams = parameter.fakerParams;
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

						let refDate = fakerParams.refDate || new Date();
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
}

export default new ResourceUtils();
