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
			resource: {}
		});
	}

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

	saveResource(_resource) {
		Store.get().set({resourceSaving: true});

		let resource = _resource.toJS();
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
			resp.model = resp.model.map((model) => {
				if (model.fakerSubcategory === 'arrayElement' || model.fakerSubcategory === 'objectElement') {
					model.fakerParams.json = JSON.stringify(model.fakerParams.json, null, 2);
				}

				return model;
			});

			Store.get().set({
				resourceSaving: false,
				resource: resp
			});
			ResourcesStore.updateResource(resp);
		});
	}

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
