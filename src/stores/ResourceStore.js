import Store from 'stores/Store';
import Api from 'utils/Api';
import {browserHistory} from 'react-router';
import ResourceUtils from '../../backend/ResourceUtils.js';
import Utils from 'utils';

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
		this.saveResource = Utils.throttle(this.saveResource, 2000);
	}

	/*------------------------------------------------------
		Get the resource from the store
	------------------------------------------------------*/
	getResource({
		resourceId
	}) {
		let foundResource = Store.get().resources.find((resourceInResources) => {
			return resourceInResources.id === parseInt(resourceId, 10);
		});

		if (foundResource) {
			let editableResource = foundResource.toJS();
			editableResource.model = editableResource.model.map((model) => {
				if (model.fakerSubcategory === 'arrayElement' || model.fakerSubcategory === 'objectElement') {
					model.fakerParams.json = JSON.stringify(model.fakerParams.json, null, 2);
				}

				return model;
			});

			Store.get().resource.reset(editableResource);
		}
	}

	updateResource(resource) {
		let updatedResource = Store.get().resource.reset(resource);
		this.saveResource(updatedResource);
	}

	/*------------------------------------------------------
		Save a resource to the server
	------------------------------------------------------*/
	saveResource(resourceToUpdate) {
		console.log('Saved to DB');
		Store.get().set({resourceSaving: true});
		let resource = resourceToUpdate.toJS();
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
}

export default new ResourceStore();
