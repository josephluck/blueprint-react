import Freezer from 'freezer-js';

/*=============================================================================
	This is the main store.
	State for sub-stores are handled in their constructors.
	This is for encapsulation and in order to handle computed derived state.
=============================================================================*/
let Store = new Freezer({}, {});
let StoreHistory = [];

/*=============================================================================
	An intialize method that lets a sub-store initialize some state.
	The initialize method should only be run in constructor() functions from
	sub-stores. Please view a sub-store for more information.
	For redundency, this method checks whether the sub-store is trying to
	overright any existing state. This is similar to Redux reducers.
=============================================================================*/
Store.initialize = (newState) => {
	let currentState = Store.get();
	let currentStateKeys = Object.keys(currentState);
	let newStateKeys = Object.keys(newState);
	let keyAlreadyExistsInStore = false;
	let keyThatAlreadyExists = '';

	for (let i = 0; i < currentStateKeys.length; i++) {
		let keyToCheck = currentStateKeys[i];
    if (newStateKeys.indexOf(keyToCheck) > -1) {
      keyAlreadyExistsInStore = true;
      keyThatAlreadyExists = newStateKeys[i];
      break;
    }
	}

	if (keyAlreadyExistsInStore) {
		console.warn(`
			You are trying to initialize a Store key that already exists in the store.
			The key you are trying to intialize is: "${keyThatAlreadyExists}"
		`);
	}

	Store.set({
		...currentState,
		...newState
	});
};

/*=============================================================================
	Persist history entries in the store (for undo button)
=============================================================================*/

window.undo = function () {
	Store.trigger('history:undo');
};

Store.on('history:undo', () => {
	if (StoreHistory.length) {
		Store.get().reset(StoreHistory[0]);
		StoreHistory.shift();
	}
});

Store.on('history:add', () => {
	StoreHistory.push(Store.get());
	if (StoreHistory.length > 10) {
		StoreHistory.pop();
	}
});

Store.on('history:reset', () => {
	if (StoreHistory.length) {
		StoreHistory = [];
	}
});



/*=============================================================================
	Store changes in the store in a window variable so state can be copied
	to clipboard (good for debugging purposes)
=============================================================================*/
Store.on('update', () => {
	window.currentState = Store.get();
});

/*=============================================================================

=============================================================================*/
window.setStoreState = function (state) {
	Store.trigger('setStoreState', state);
};

Store.on('setStoreState', (state) => {
	Store.get().reset(state);
	console.log('Store state reset');
});

export default Store;
