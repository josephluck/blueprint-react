import Store from 'stores/Store';
import Api from 'utils/Api';
import {browserHistory} from 'react-router';
import ResourceUtils from '../../backend/ResourceUtils.js';

import ResourcesStore from 'stores/ResourcesStore';

class ResourceStore {
	/*------------------------------------------------------
		Set initial state in the Store.
	------------------------------------------------------*/
	constructor() {
		Store.initialize({
			resource: {}
		});
	}

	/*------------------------------------------------------
		Get the resource from the store
	------------------------------------------------------*/
	getResource({
		resourceId
	}) {
		let resource = Store.get().resources.find((_resource) => {
			return _resource.id === parseInt(resourceId, 10);
		}).toJS();

		resource.model = resource.model.map((model) => {
			if (model.fakerSubcategory === 'arrayElement' || model.fakerSubcategory === 'objectElement') {
				model.fakerParams.json = JSON.stringify(model.fakerParams.json, null, 2);
			}

			return model;
		});

		Store.get().resource.reset(resource);
	}

	/*------------------------------------------------------
		Save a resource to the server
	------------------------------------------------------*/
	saveResource(resourceFromStore) {
		Store.get().set({resourceSaving: true});

		let resource = resourceFromStore.toJS();
		resource.model = resource.model.map((model) => {
			if (model.fakerSubcategory === 'arrayElement' || model.fakerSubcategory === 'objectElement') {
				model.fakerParams.json = JSON.parse(model.fakerParams.json);
			}

			return model;
		});

		resource.validationConfig = ResourceUtils.generateValidationConfigForResource(resource);

		Api.put({
			url: {
				name: 'resource',
				resourceId: resource.id
			},
			payload: resource
		}).then((resp) => {
			resource.model = resp.body.model.map((model) => {
				if (model.fakerSubcategory === 'arrayElement' || model.fakerSubcategory === 'objectElement') {
					model.fakerParams.json = JSON.stringify(model.fakerParams.json, null, 2);
				}

				return model;
			});

			Store.get().set({
				resourceSaving: false,
				resource: resource
			});
			ResourcesStore.updateResource(resource);
		});
	}

	/*------------------------------------------------------
		Delete a resource from the server
	------------------------------------------------------*/
	deleteResource(resource) {
		Store.get().set({resourceSaving: true});

		Api.destroy({
			url: {
				name: 'resource',
				resourceId: resource.id
			}
		}).then(() => {
			browserHistory.push(`/`);
			Store.get().set({resourceSaving: false});
			ResourcesStore.removeResource(resource.id);
		});
	}

	/*------------------------------------------------------
		Add a new model key to a resource
	------------------------------------------------------*/
	addAnotherKey() {
		Store.get().resource.model.unshift({
			uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
				let r = Math.random() * 16 | 0;
				let v = c === 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			}),
			type: 'predefined',
			fakerSubCategory: '',
			fakerCategory: '',
			fakerParams: {},
			resource: {},
			predefinedType: 'string',
			predefinedValue: '',
			required: false
		});
	}

	/*------------------------------------------------------
		Remove a model key from the resource
	------------------------------------------------------*/
	removeModelKey(model, index) {
		Store.get().resource.model.splice(index, 1);
	}

	/*------------------------------------------------------
		Save a value on the resource that isn't in it's model
		for instance, the resource name
	------------------------------------------------------*/
	saveValue(name, value) {
		Store.get().resource.set(name, value);
	}

	/*------------------------------------------------------
		Save CRUD abilities on the resource
	------------------------------------------------------*/
	setResourceCRUD(name) {
		Store.get().resource.supportedMethods.set(name, !Store.get().resource.supportedMethods[name]);
	}

	/*------------------------------------------------------
		Handle a model value's change. For instance the
		key name of a model
	------------------------------------------------------*/
	handleModelChange(model, name, value) {
		model.set(name, value);
	}

	/*------------------------------------------------------
		When the model's type is changed, update its
		attributes
	------------------------------------------------------*/
	handleModelTypeChanged(model, type) {
		if (type === 'resource') {
			model.set('childResource', {});
		} else {
			model.set('childResource', '');
		}
		if (type === 'object') {
			model.resource.reset({
				type: 'array',
				length: 5,
				model: [
					{
						uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
							let r = Math.random() * 16 | 0;
							let v = c === 'x' ? r : (r & 0x3 | 0x8);
							return v.toString(16);
						}),
						type: 'predefined',
						fakerSubCategory: '',
						fakerCategory: '',
						fakerParams: {},
						resource: {},
						predefinedType: 'string',
						predefinedValue: '',
						required: false
					}
				]
			});
		} else {
			model.set('resource', {});
		}
	}

	/*------------------------------------------------------
		When changing the selected random category, reset
		the sub category and any params related to the sub
		category
	------------------------------------------------------*/
	setSelectedRandomCategory(model, value) {
		model.set({
			fakerCategory: value,
			fakerSubCategory: '',
			fakerParams: {}
		});
	}

	/*------------------------------------------------------
		When the sub category changes, reset the params
	------------------------------------------------------*/
	setSelectedRandomSubcategory(model, category) {
		model.set({
			selectedFakerSubCategory: category,
			fakerSubCategory: category.value,
			fakerParams: this.resetRandomParams(category)
		});
	}

	/*------------------------------------------------------
		When faker sub category params change
	------------------------------------------------------*/
	handleModelParamsChange(model, name, value) {
		model.fakerParams.set(name, value);
	}

	/*------------------------------------------------------
		Switch over the sub categories params and reset the
		values to default values
	------------------------------------------------------*/
	resetRandomParams(selectedFakerSubCategory) {
		let params = {};
		selectedFakerSubCategory.params.map((param) => {
			if (param.type === 'input') {
				if (param.inputType === 'number') {
					params[param.param] = 0;
				} else if (param.inputType === 'date') {
					params[param.param] = new Date();
				} else {
					params[param.param] = '';
				}
			} else if (param.type === 'select') {
				params[param.param] = param.options[0].value;
			} else if (param.type === 'editor') {
				params[param.param] = '';
			}
		});
		return params;
	}

	/*------------------------------------------------------
		Set the predefined value of a predefined model
	------------------------------------------------------*/
	handleModelPredefinedTypeChange(model) {
		model.reset({
			predefinedValue: ''
		});
	}

	/*------------------------------------------------------
		If a child resource is chosen, set it based on it's
		name
	------------------------------------------------------*/
	handleSelectedChildResource(model, resourceName) {
		let resource = Store.get().resources.find((_resource) => {
			return _resource.name === resourceName;
		});

		model.set('childResourceName', resource.name);
		model.set('childResourceType', resource.type);
	}
}

export default new ResourceStore();
