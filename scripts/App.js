import React, {Component} from 'react';
import { cool } from 'react-freezer-js';

import Store from 'stores/Store';

import ResourcesList from 'containers/ResourcesList';
import RightBar from 'containers/RightBar';

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
	  		<div className="left-nav flex flex-vertical">
		  		<ResourcesList></ResourcesList>
		  		<div className="list-item">
		  			<a href="" className="button">{"New resource"}</a>
		  		</div>
		  	</div>
		  	<div className="main-content flex flex-vertical">
			  	{this.props.children}
			  </div>
			  <div className="right-bar flex flex-vertical">
			  	<RightBar></RightBar>
			  </div>
		  </div>
		)
	}
}

export default cool(App, Store);
