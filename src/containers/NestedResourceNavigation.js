import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';

import ResourceForm from 'components/ResourceForm';

class NestedResourceNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentNestedResource: {
				resource: {
					type: 'array',
					length: 5,
					name: 'nested_2',
					model: []
				}
			}
		};

		this.state.nestedResources = this.updateNestedResources(props);
		this.state.currentNestedResource = this.updateNestedResource(props);
	}

	componentWillReceiveProps(props) {
		this.state.nestedResources = this.updateNestedResources(props);
		this.state.currentNestedResource = this.updateNestedResource(props);
	}

	updateNestedResources(props) {
		let indicies = props.params.splat.split('/').map(Number);
		let nestedResources = [];

		nestedResources.push(props.resource.model[indicies[0]]);

		for (let i = 1, x = indicies.length; i < x; i++) {
			let lastResource = nestedResources[nestedResources.length - 1];
			let modelIndexToPush = indicies[i];
			let modelToPush = lastResource.resource.model[modelIndexToPush];
			nestedResources.push(modelToPush);
		}

		return nestedResources;
	}

	updateNestedResource(props) {
		let indicies = props.params.splat.split('/').map(Number);
		let lastResource = this.state.nestedResources[indicies.length - 1];
		return lastResource;
	}

	render() {
		return (
			<div className="modal flex flex-vertical">
				<div className="section-title with-top-border flex flex-0">
					<span className="flex-1">
						{this.state.nestedResources.map((resource, i) => {
							console.log(resource);
							if (i !== this.state.nestedResources.length - 1) {
								let path = window.location.pathname.split('/').slice(2, i + 3).join('/');
								return (
									<span>
										<Link to={`/${this.props.resource.id}/${path}`}>
											{resource.key}
										</Link>
										{' / '}
									</span>
								);
							}
							return (
								<span>{resource.key}</span>
							);
						})}
					</span>
					<Link to={`/${this.props.resource.id}`}>
						{'Save and close'}
					</Link>
				</div>
				<div className="flex-1 overflow-auto">
					{this.state.test ?
						<ResourceForm
							resource={this.state.currentNestedResource.resource}
							resources={this.props.resources}
							resource_id={this.props.resource.id}
							nested={true} />
						: null
					}
				</div>
			</div>
		);
	}
}

NestedResourceNavigation.propTypes = {
	params: React.PropTypes.object,
	resource: React.PropTypes.object,
	resources: React.PropTypes.array
};

export default Provide(NestedResourceNavigation, [
	'resource',
	'resources'
]);
