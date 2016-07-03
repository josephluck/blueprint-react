import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';

import ResourceForm from 'components/ResourceForm';
import ResourceStore from 'stores/ResourceStore';

class NestedModel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nested_resource: this.updateNestedResource(props)
		};
	}

	componentWillReceiveProps(props) {
		this.state.nested_resource = this.updateNestedResource(props);
	}

	updateNestedResource(props) {
		let indicies = props.params.splat.split('/').map(Number);
		let last_indicie = indicies[indicies.length - 1];
		return props.resource.model[last_indicie];
	}

	render() {
		return (
			<div className="modal flex flex-vertical">
				<div className="section-title with-top-border flex flex-0">
					<span className="flex-1">
						{`${this.state.nested_resource.key} model description`}
					</span>
					<Link to={`/${this.props.resource.id}`}>
						{"Save and close"}
					</Link>
				</div>
				{this.state.nested_resource.resource.model ?
					<div className="flex-1 overflow-auto">
						<ResourceForm
							resource={this.state.nested_resource.resource}
							resources={this.props.resources}
							nested={true} />
					</div>
					: null
				}
				{this.props.children}
			</div>
		)
	}
}

export default Provide(NestedModel, [
	'resource',
	'resources'
]);
