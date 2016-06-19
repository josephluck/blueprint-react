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
		}).then((res) => {
			Store.get().resource.reset(res);
			Store.get().edited_resource.reset(res);
			Store.get().set({resource_loading: false});
		});
	}
}

export default new ResourceStore();