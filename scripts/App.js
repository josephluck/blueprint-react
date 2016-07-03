import React, {Component} from 'react';
import { cool } from 'react-freezer-js';

import Store from 'stores/Store';
import ResourcesStore from 'stores/ResourcesStore';

import ResourcesList from 'containers/ResourcesList';
import RightBar from 'containers/RightBar';

class App extends Component {
	constructor(props) {
		super(props);
		Store.get().set({
			params: props.params
		})
	}

	componentWillMount() {
		ResourcesStore.getResources();
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
	  		<div className="left-nav flex flex-vertical">
	  			<div className="logo">
	  				<span>{"B"}</span>
	  			</div>
		  		<ResourcesList />
		  	</div>
		  	<div className="main-content flex flex-vertical">
		  	{Store.get().resources.length > 0 ?
			  	<div className="flex">{this.props.children}</div>
			  	: null
			  }
			  </div>
			  <RightBar />
		  </div>
		)
	}
}

export default cool(App, Store);
