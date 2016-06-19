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
}

export default new ResourcesStore();