import React, {Component} from 'react';
import {cool} from 'react-freezer-js';

import Store from 'stores/Store';
import ResourcesStore from 'stores/ResourcesStore';

import ResourcesList from 'containers/ResourcesList';
import RightBar from 'containers/RightBar';

class App extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		ResourcesStore.getResources();
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
				{Store.get().resources.length > 0 ?
					<div className="flex flex-1">
						<div className="main-content flex flex-vertical">
							<div className="flex">{this.props.children}</div>
						</div>
						<RightBar />
					</div>
				: null
				}
			</div>
		);
	}
}

App.propTypes = {
	children: React.PropTypes.node
};

export default cool(App, Store);
