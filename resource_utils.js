var faker = require('faker');
var _resources = [];

module.exports = {
/*=============================================================================
	Generate a full resource (array of models)
	takes a description that defines what the resource looks like
	including it's model and associated description
=============================================================================*/
	generateResource: function(description, resources) {
		if (resources) {
			_resources = resources;
		}

		if (description.type === 'array') {
			var resource = [];
			for (var i = 0, x = description.length; i < x; i++) {
				var model = this.generateModel(description.model);

				model['id'] = i + 1;
				resource.push(model);
			}

			return resource;
		} else {
			// This resource isn't a collection, it's a single object, or another type.
			// Handle use cases
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
			console.log(property);
			return this.generateResource(property.resource);
		}
	},

/*=============================================================================
	Returns a random value given a properties description
	Uses faker.js (see docs for more info)
=============================================================================*/
	generateRandomValue: function(property) {
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
	}
}