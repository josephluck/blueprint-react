import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';

import ResourceForm from 'components/ResourceForm';

class NestedResourceNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			test: "Yeah",
			"current_nested_resource": {
				"resource": {
					"type": "array",
					"length": 5,
					"name": "nested_2",
					"model": []
				}
			}
		}
		this.state.nested_resources = this.updateNestedResources(props);
		this.state.current_nested_resource = this.updateNestedResource(props);
	}

	componentWillReceiveProps(props) {
		this.state.nested_resources = this.updateNestedResources(props);
		this.state.current_nested_resource = this.updateNestedResource(props);
	}

	updateNestedResources(props) {
		let indicies = props.params.splat.split('/').map(Number);
		let nested_resources = [];

		nested_resources.push(props.resource.model[indicies[0]])

		for (var i = 1, x = indicies.length; i < x; i++) {
			let last_resource = nested_resources[nested_resources.length - 1];
			let model_index_to_push = indicies[i];
			let model_to_push = last_resource.resource.model[model_index_to_push];
			nested_resources.push(model_to_push);
		}

		return nested_resources;
	}

	updateNestedResource(props) {
		let indicies = props.params.splat.split('/').map(Number);
		let last_resource = this.state.nested_resources[indicies.length - 1];
		return last_resource;
	}

	render() {
		return (
			<div className="modal flex flex-vertical">
				<div className="section-title with-top-border flex flex-0">
					<span className="flex-1">
						{this.state.nested_resources.map((resource, i) => {
							console.log(resource);
							if (i !== this.state.nested_resources.length - 1) {
								let path = window.location.pathname.split('/').slice(2, i + 3).join('/');
								console.log(path);
								return (
									<span>
										<Link to={`/${this.props.resource.id}/${path}`}>
											{resource.key}
										</Link>
										{" / "}
									</span>
								)
							} else {
								return (
									<span>{resource.key}</span>
								)
							}
						})}
					</span>
					<Link to={`/${this.props.resource.id}`}>
						{"Save and close"}
					</Link>
				</div>
				<div className="flex-1 overflow-auto">
					{this.state.test ?
						<ResourceForm
							resource={this.state.current_nested_resource.resource}
							resources={this.props.resources}
							resource_id={this.props.resource.id}
							nested={true} />
						: null
					}
				</div>
			</div>
		)
	}
}

export default Provide(NestedResourceNavigation, [
	'resource',
	'resources'
]);

// <ResourceForm
// 	resource={this.state.current_nested_resource.resource}
// 	resources={this.props.resources}
// 	resource_id={this.props.resource.id}
// 	nested={true} />
