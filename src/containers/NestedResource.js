import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';
import ResourceForm from 'components/ResourceForm';

class NestedModel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nestedResource: this.updateNestedResource(props)
		};
	}

	componentWillReceiveProps(props) {
		this.state.nestedResource = this.updateNestedResource(props);
	}

	updateNestedResource(props) {
		let indicies = props.params.splat.split('/').map(Number);
		let lastIndicie = indicies[indicies.length - 1];
		return props.resource.model[lastIndicie];
	}

	render() {
		return (
			<div className="modal flex flex-vertical">
				<div className="section-title with-top-border flex flex-0">
					<span className="flex-1">
						{`${this.state.nestedResource.key} model description`}
					</span>
					<Link to={`/${this.props.resource.id}`}>
						{"Save and close"}
					</Link>
				</div>
				{this.state.nestedResource.resource.model ?
					<div className="flex-1 overflow-auto">
						<ResourceForm
							resource={this.state.nestedResource.resource}
							resources={this.props.resources}
							nested={true} />
					</div>
					: null
				}
			</div>
		);
	}
}

NestedModel.propTypes = {
	params: React.PropTypes.object,
	resource: React.PropTypes.object,
	resources: React.PropTypes.array
};

export default Provide(NestedModel, [
	'resource',
	'resources'
]);
