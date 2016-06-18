import React, {Component} from 'react';
import { cool } from 'react-freezer-js';

import Store from 'stores/Store';

import ResourcesList from 'containers/ResourcesList';

class App extends Component {
	constructor(props) {
		super(props);
		Store.get().set({
			params: props.params
		})
	}

	componentWillReceiveProps(props) {
		if (this.props.params !== props.params) {
			Store.get().set({
				params: props.params
			})
		}
	}

	render() {
	  return (
	  	<div className="app-container">
	  		<div className="left-nav">
		  		<ResourcesList></ResourcesList>
		  	</div>
		  	<div className="main-content">
			  	{this.props.children}
			  </div>
		  </div>
		)
	}
}

export default cool(App, Store);
