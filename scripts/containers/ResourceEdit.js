import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';

// Stores
import ResourcesStore from 'stores/ResourcesStore';

class ResourceEdit extends Component {
	constructor(props) {
		super(props);
	}

/*=============================================================================
	Render office tasks
=============================================================================*/
	render() {
		return (
			<div>
				<div className="section-title">
					{`${this.props.resource.name} resource description`}
				</div>
				<div className="box">
					{this.props.resource.name}
				</div>


				<div className="section-title with-top-border">
					{`${this.props.resource.name} model description`}
				</div>
			</div>
		)
	}
}

export default Provide(ResourceEdit, [
	'resource',
	'resource_loading'
])