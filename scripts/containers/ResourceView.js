import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';

// Stores
import ResourcesStore from 'stores/ResourcesStore';

class ResourceView extends Component {
	constructor(props) {
		super(props);
	}

/*=============================================================================
	Render office tasks
=============================================================================*/
	render() {
		return (
			<div className="list">
				{this.props.resource.name}
			</div>
		)
	}
}

export default Provide(ResourceView, [
	'resource',
	'resource_loading'
])