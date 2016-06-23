import Store from 'stores/Store';
import Api from 'utils/Api';
import {browserHistory} from 'react-router';

class ResourcesStore {
/*=============================================================================
	Set initial state in the Store.
=============================================================================*/
	constructor() {
		Store.initialize({
			resources: [],
			resources_loading: true
		});
	}

	getResources() {
		Store.get().set({resources_loading: true});
		Api.get({
			url: {
				name: 'resources',
				params: '?_sort=name&_order=ASC'
			}
		}).then((res) => {
			Store.get().resources.reset(res);
		});
		Store.get().set({resources_loading: false});
	}

	createNewResource() {
		Api.post({
			url: {
				name: 'resources'
			},
			payload: {
				type: "array",
				length: 5,
				name: "REPLACE_ME",
				model: []
			}
		}).then((resource) => {
			browserHistory.push(`/resources/${resource.id}`);
		});
	}

	removeResource(resource_id) {
		var index = Store.get().resources.findIndex((resource, i) => {
			return resource.id === resource_id;
		});

		Store.get().resources.splice(index, 1);
	}

	updateResource(resource) {
		var resource_to_update = Store.get().resources.find((_resource, i) => {
			return _resource.id === resource.id;
		});

		resource_to_update.reset(resource);
	}
}

export default new ResourcesStore();