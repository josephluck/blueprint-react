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
			resourcesLoading: true,
			rightBarOpen: true
		});
	}

	toggleRightBar() {
		Store.get().set({
			rightBarOpen: !Store.get().rightBarOpen
		});
	}

	getResources() {
		Store.get().set({resourcesLoading: true});
		Api.get({
			url: {
				name: 'resources',
				params: '?_sort=name&_order=ASC'
			}
		}).then((res) => {
			Store.get().resources.reset(res.body);
		});
		Store.get().set({resourcesLoading: false});
	}

	createNewResource() {
		Api.post({
			url: {
				name: 'resources'
			},
			payload: {
				type: 'array',
				length: 5,
				documentationDescription: '',
				name: 'newResource',
				supportedMethods: {
					get: true,
					post: true,
					put: true,
					destroy: true
				},
				model: [
					{
						uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
							let r = Math.random() * 16 | 0;
							let v = c === 'x' ? r : (r & 0x3 | 0x8);
							return v.toString(16);
						}),
						documentationDescription: '',
						type: 'predefined',
						fakerSubCategory: '',
						fakerCategory: '',
						fakerParams: {},
						resource: {},
						predefinedType: 'string',
						predefinedValue: '',
						required: true
					}
				]
			}
		}).then((resource) => {
			Store.get().resources.push(resource);
			browserHistory.push(`/${resource.id}`);
		});
	}

	removeResource(resourceId) {
		const index = Store.get().resources.findIndex((resource) => {
			return resource.id === resourceId;
		});

		Store.get().resources.splice(index, 1);
	}

	updateResource(resource) {
		let resourceToUpdate = Store.get().resources.find((_resource) => {
			return _resource.id === resource.id;
		});

		resourceToUpdate.reset(resource);
	}
}

export default new ResourcesStore();
