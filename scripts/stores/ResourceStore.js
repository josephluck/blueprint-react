import Store from 'stores/Store';
import Api from 'utils/Api';
import {browserHistory} from 'react-router';
import ResourceUtils from '../../resource_utils.js';

import ResourcesStore from 'stores/ResourcesStore';

class ResourceStore {
/*=============================================================================
	Set initial state in the Store.
=============================================================================*/
	constructor() {
		Store.initialize({
			resource: {},
			resource_loading: true
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
				model.faker_params.json = JSON.stringify(model.faker_params.json, null, 2);
			}

			return model;
		});

		Store.get().resource.reset(resource);
	}

	saveResource(resource) {
		Store.get().set({resource_saving: true});

		resource = resource.toJS();
		resource.model = resource.model.map((model, value) => {
			if (model.faker_type === 'arrayElement' || model.faker_type === 'objectElement') {
				model.faker_params.json = JSON.parse(model.faker_params.json);
			}

			return model;
		});

		resource.validation_config = ResourceUtils.generateValidationConfigForResource(resource);

		Api.put({
			url: {
				name: 'resource',
				resourceId: resource.id
			},
			payload: resource
		}).then((resource) => {
			resource.model = resource.model.map((model, value) => {
				if (model.faker_type === 'arrayElement' || model.faker_type === 'objectElement') {
					model.faker_params.json = JSON.stringify(model.faker_params.json, null, 2);
				}

				return model;
			});

			Store.get().set({
				resource_saving: false,
				resource: resource
			});
			ResourcesStore.updateResource(resource);
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
}

export default new ResourceStore();