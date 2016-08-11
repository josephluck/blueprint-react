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
		this.canSaveResource = true;
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

	updateResource(resource) {
		let updatedResource = Store.get().resource.reset(resource);
		this.saveResource(updatedResource);
	}

	/*------------------------------------------------------
		Save a resource to the server
	------------------------------------------------------*/
	saveResource(resourceFromStore) {
		if (this.canSaveResource) {
			console.log('Called');
			this.canSaveResource = false;
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
				this.canSaveResource = true;
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
		return;
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
}

export default new ResourceStore();
