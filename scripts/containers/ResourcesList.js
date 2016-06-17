import React, {Component} from 'react';
import Provide from 'hoc/Provide';

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
		ResourcesStore.getResources({
			...this.props
		});
	}

/*=============================================================================
	Render office tasks
=============================================================================*/
	render() {
		return (
			<div>
				{this.props.resources.map((resource, i) => {
					return (
						<div key={i}>
							<h1>{resource.name}</h1>
						</div>
					)
				})}
			</div>
		)
	}
}

export default Provide(Resources, [
	'resources',
	'resources_loading'
])