import Store from 'stores/Store';
import Api from 'utils/Api';

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
		Api.get({
			url: {
				name: 'resources'
			}
		}).then((res) => {
			Store.get().resources.reset(res);
		})
	}
}

export default new ResourcesStore();