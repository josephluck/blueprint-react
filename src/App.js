import React, {Component} from 'react';
import {cool} from 'react-freezer-js';

import Store from 'stores/Store';
import ResourcesStore from 'stores/ResourcesStore';

import ResourcesList from 'containers/ResourcesList';

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
				<div className="left-nav flex flex-column">
					<ResourcesList />
				</div>
				{Store.get().resources.length > 0 ?
					<div className="flex flex-1">
						<div className="main-content flex flex-column">
							<div className="flex flex-1">
								{this.props.children}
							</div>
						</div>
					</div>
				: null
				}
			</div>
		);
	}
}

App.propTypes = {
	children: React.PropTypes.node,
	params: React.PropTypes.object
};

export default cool(App, Store);
