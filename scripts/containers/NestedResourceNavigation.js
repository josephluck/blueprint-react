import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';

import ResourceForm from 'components/ResourceForm';

class NestedResourceNavigation extends Component {
	constructor(props) {
		console.log("Constructed")
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
		console.log("Fired componentWillReceiveProps")
		this.state.nested_resources = this.updateNestedResources(props);
		this.state.current_nested_resource = this.updateNestedResource(props);
	}

	updateNestedResources(props) {
		console.log("Fired updateNestedResources");
		let indicies = props.params.splat.split('/').map(Number);
		let nested_resources = [];

		nested_resources.push(props.resource.model[indicies[0]])

		for (var i = 1, x = indicies.length; i < x; i++) {
			let last_resource = nested_resources[nested_resources.length - 1];
			let model_index_to_push = indicies[i];
			let model_to_push = last_resource.resource.model[model_index_to_push];
			nested_resources.push(model_to_push);
		}

		console.log(nested_resources)

		return nested_resources;
	}

	updateNestedResource(props) {
		console.log("Fired updateNestedResource");
		let indicies = props.params.splat.split('/').map(Number);
		let last_resource = this.state.nested_resources[indicies.length - 1];
		return last_resource;
	}

	render() {
		console.log("Rendering")
		return (
			<div className="modal flex flex-vertical">
				<div className="section-title with-top-border flex flex-0">
					<span className="flex-1">
						<h1>{"Render"}</h1>
					</span>
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
