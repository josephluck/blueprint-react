import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';

// Stores
import ResourcesStore from 'stores/ResourcesStore';

class ResourceEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resource: {}
		};
	}

	handleNameChange(e) {
		this.state.resource.name = e.target.value;
		this.forceUpdate();
	}

	componentWillReceiveProps(props) {
		this.state.resource = props.resource.toJS();
	}

/*=============================================================================
	Render office tasks
=============================================================================*/
	render() {
		return (
			<div>
				{!this.props.resource_loading ?
					<div>
						<div className="section-title flex">
							<span className="flex-1">
								{`${this.props.resource.name} resource description`}
							</span>
							<a>
								{"Save"}
							</a>
						</div>
						<div className="box">
							<div className="input-label">
								{"Name"}
							</div>
							<input value={this.state.resource.name}
								onChange={::this.handleNameChange} />
						</div>


						<div className="section-title with-top-border">
							{`${this.props.resource.name} model description`}
						</div>
					</div>
					: null
				}
			</div>
		)
	}
}

export default Provide(ResourceEdit, [
	'resource',
	'resource_loading'
])