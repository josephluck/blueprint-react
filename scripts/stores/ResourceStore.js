import Store from 'stores/Store';
import Api from 'utils/Api';
import {browserHistory} from 'react-router';

import ResourcesStore from 'stores/ResourcesStore';

class ResourceStore {
/*=============================================================================
	Set initial state in the Store.
=============================================================================*/
	constructor() {
		Store.initialize({
			resource: {},
			edited_resource: {},
			resource_loading: true,
			child_models: []
		});
	}

	getResource({
		resourceId
	}) {
		let resource = Store.get().resources.find((resource, i) => {
			return resource.id === parseInt(resourceId, 10)
		}).toJS();

		resource.model = resource.model.map((model, value) => {
			if (model.faker_type === 'arrayElement' || model.faker_type === 'objectElement') {
				model.params.json = JSON.stringify(model.params.json, null, 2);
			}

			return model;
		});

		Store.get().resource.reset(resource);
		Store.get().edited_resource.reset(resource);
	}

	saveResource(resource) {
		Store.get().set({resource_saving: true});

		resource.model = resource.model.map((model, value) => {
			if (model.faker_type === 'arrayElement' || model.faker_type === 'objectElement') {
				model.params.json = JSON.parse(model.params.json);
			}

			return model;
		});

		Api.put({
			url: {
				name: 'resource',
				resourceId: resource.id
			},
			payload: resource
		}).then((resource) => {
			resource.model = resource.model.map((model, value) => {
				if (model.faker_type === 'arrayElement' || model.faker_type === 'objectElement') {
					model.params.json = JSON.stringify(model.params.json, null, 2);
				}

				return model;
			});

			Store.get().set({
				resource_saving: false,
				resource: resource,
				edited_resource: resource
			});
			ResourcesStore.updateResource(resource);
			browserHistory.push(`/${resource.id}`);
		});
	}

	deleteResource(resource) {
		Store.get().set({resource_saving: true});

		Api.delete({
			url: {
				name: 'resource',
				resourceId: resource.id
			}
		}).then(() => {
			browserHistory.push(`/`);
			Store.get().set({resource_saving: false});
			ResourcesStore.removeResource(resource.id);
		});
	}

	updateCurrentlyEditingResource(resource) {
		resource.model = resource.model.map((model, value) => {
			if (model.faker_type === 'arrayElement' || model.faker_type === 'objectElement') {
				model.params.json = JSON.parse(model.params.json);
			}

			return model;
		});
		Store.get().edited_resource.reset(resource);
	}

	persistEditedResourceToResource(edited_resource) {
		Store.get().resource.reset(edited_resource);
	}
}

export default new ResourceStore();