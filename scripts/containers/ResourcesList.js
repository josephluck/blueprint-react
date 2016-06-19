import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';

// Stores
import ResourcesStore from 'stores/ResourcesStore';

class Resources extends Component {
	constructor(props) {
		super(props);
	}

/*=============================================================================
	Fire AJAX requests for office tasks
=============================================================================*/
	componentWillMount() {
		ResourcesStore.getResources();
	}

/*=============================================================================
	Render office tasks
=============================================================================*/
	render() {
		return (
			<div className="list">
				{this.props.resources.map((resource, i) => {
					let class_name = "list-item";

					if (resource.id == this.props.params.resourceId) {
						class_name += " active";
					}

					return (
						<div key={i} className={class_name}>
							<Link to={`/resources/${resource.id}`}>{resource.name}</Link>
						</div>
					)
				})}
			</div>
		)
	}
}

export default Provide(Resources, [
	'resources',
	'resources_loading',
	'params'
])