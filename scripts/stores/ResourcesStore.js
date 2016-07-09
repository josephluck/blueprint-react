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
			resources_loading: true,
			right_bar_open: false
		});
	}

	toggleRightBar() {
		Store.get().set({
			right_bar_open: !Store.get().right_bar_open
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
				name: "new_resource",
				supported_methods: {
					get: true,
					post: true,
					put: true,
					delete: true
				},
				model: [
					{
						uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
					    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
					    return v.toString(16);
						}),
						type: "predefined",
						faker_type: "",
						faker_category: "",
						params: {},
						resource: {},
						predefined_type: "string",
						predefined_value: "",
						required: true
					}
				]
			}
		}).then((resource) => {
			Store.get().resources.push(resource);
			browserHistory.push(`/${resource.id}`);
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