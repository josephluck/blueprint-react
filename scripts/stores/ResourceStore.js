import Store from 'stores/Store';
import Api from 'utils/Api';

class ResourceStore {
/*=============================================================================
	Set initial state in the Store.
=============================================================================*/
	constructor() {
		Store.initialize({
			resource: {},
			edited_resource: {},
			resource_loading: true
		});
	}

	getResource({
		resourceId
	}) {
		Store.get().set({resource_loading: true});
		Api.get({
			url: {
				name: 'resource',
				resourceId: resourceId
			}
		}).then((resource) => {
			resource.model = resource.model.map((model, value) => {
				if (model.faker_type === 'arrayElement' || model.faker_type === 'objectElement') {
					model.params.json = JSON.stringify(model.params.json, 2);
				}

				return model;
			});

			Store.get().resource.reset(resource);
			Store.get().edited_resource.reset(resource);
			Store.get().set({resource_loading: false});
		});
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
					model.params.json = JSON.stringify(model.params.json, 2);
				}

				return model;
			});

			Store.get().resource.reset(resource);
			Store.get().edited_resource.reset(resource);
			Store.get().set({resource_saving: false});
		});
	}
}

export default new ResourceStore();