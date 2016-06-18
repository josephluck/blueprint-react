import Freezer from 'freezer-js';

/*=============================================================================
	This is the main store.
	State for sub-stores are handled in their constructors.
	This is for encapsulation and in order to handle computed derived state.
=============================================================================*/
var Store = new Freezer({
	params: {}
});

/*=============================================================================
	An intialize method that lets a sub-store initialize some state.
	The initialize method should only be run in constructor() functions from
	sub-stores. Please view a sub-store for more information.
	For redundency, this method checks whether the sub-store is trying to
	overright any existing state. This is similar to Redux reducers.
=============================================================================*/
Store.initialize = (newState) => {
	let current_state = Store.get();
	let current_state_keys = Object.keys(current_state);
	let new_state_keys = Object.keys(newState);
	let key_already_exists_in_store = false;
	let key_that_already_exists = "";

	for (let i = 0; i < current_state_keys.length; i++) {
		let key_to_check = current_state_keys[i];
    if (new_state_keys.indexOf(key_to_check) > -1) {
      key_already_exists_in_store = true;
      key_that_already_exists = new_state_keys[i];
      break;
    }
	}

	if (key_already_exists_in_store) {
		console.warn(`You are trying to initialize a Store key that already exists in the store. The key you are trying to intialize is: "${key_that_already_exists}"`);
	}

	Store.set({
		...current_state, // Include the current state
		...newState // Merge in the new state
	})
}


/*=============================================================================
	Persist history entries in the store (for undo button)
=============================================================================*/
var StoreHistory = [];

window.undo = function() {
	Store.trigger('history:undo');
}

Store.on('history:undo', () => {
	if (StoreHistory.length) {
		Store.get().reset(StoreHistory[0]);
		StoreHistory.shift();
	};
});

Store.on('history:add', () => {
	StoreHistory.push(Store.get());
	if (StoreHistory.length > 10) {
		StoreHistory.pop();
	}
})

Store.on('history:reset', () => {
	if (StoreHistory.length) {
		StoreHistory = [];
	};
});



/*=============================================================================
	Store changes in the store in a window variable so state can be copied
	to clipboard (good for debugging purposes)
=============================================================================*/
Store.on('update', () => {
	window.current_state = Store.get();
});

/*=============================================================================

=============================================================================*/
window.setStoreState = function(state) {
	Store.trigger('setStoreState', state);
};

Store.on('setStoreState', (state) => {
	Store.get().reset(state);
	console.log('Store state reset');
});


/*=============================================================================
	Catch javascript errors and push them in to an array. These should be
	pushed to a server for catching errors on a client's machine.
	It should push things about the user agent including browser, version,
	screen size etc.
=============================================================================*/
window.application_errors = [];

window.onerror = function(message, url, line, column) {
	window.application_errors.push({
		error_date: new Date().toISOString(),
		error_message: message,
		error_occured_at_url: url,
		error_occured_at_line: line,
		error_occured_at_column: column,
		application_state_at_time_of_error: Store.get().toJS()
	});
}

export default Store;