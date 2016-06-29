import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';
import FakerCategories from 'data/FakerCategories';
import FakerSubCategories from 'data/FakerSubCategories';
import Faker from 'faker';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/tomorrow';
import ModelForm from 'components/ModelForm';

window.faker = Faker;

import ResourceStore from 'stores/ResourceStore';

class NestedModel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resource: props.resource.toJS(),
			child_models: [],
			child_resource: {
				resource: {}
			},
			faker_categories: FakerCategories,
			faker_sub_categories: FakerSubCategories
		};
	}

	componentDidMount() {
		this.updateChildResourcesFromProps(this.props.params.splat);
	}

	componentWillReceiveProps(props) {
		this.state.resource = props.resource;
		this.updateChildResourcesFromProps(props.params.splat);
		this.forceUpdate();
	}

	updateChildResourcesFromProps(splat) {
		let indicies = splat.split('/').map(Number);
		let models = indicies.map((indicie, i) => {
			return this.state.resource.model[indicie];
		});

		let child_resource = models[models.length - 1];

		this.setState({
			child_models: models,
			child_resource: child_resource
		});
	}

	addAnotherKey() {
		this.state.child_resource.resource.model.unshift({
			type: "predefined",
			params: {}
		});
		this.forceUpdate();
		this.updateCurrentlyEditingResource();
	}

	updateCurrentlyEditingResource() {
		ResourceStore.updateCurrentlyEditingResource(this.state.resource);
	}

	persistEditedResourceToResource() {
		ResourceStore.persistEditedResourceToResource(this.state.resource);
	}

/*=============================================================================
	Render office tasks
=============================================================================*/
	render() {
		return (
			<div className="modal flex flex-vertical">
				<div className="flex-1 overflow-auto">
					<div className="section-title with-top-border flex">
						<span className="flex-1">
							{`${this.state.child_resource.key} model description`}
						</span>
						<Link className="large-right-margin"
							to={`/${this.props.resource.id}`}
							onClick={(e) => {
								this.persistEditedResourceToResource();
							}}>
							{"Save and close"}
						</Link>
						<a href=""
							onClick={(e) => {
								e.preventDefault();
								this.addAnotherKey();
							}}>
							{"Add another key"}
						</a>
					</div>
					{this.state.child_resource.resource.model ?
						<ModelForm resource={this.state.child_resource.resource}></ModelForm>
						: null
					}
				</div>
			</div>
		)
	}
}

export default Provide(NestedModel, [
	'resources',
	'resource'
])