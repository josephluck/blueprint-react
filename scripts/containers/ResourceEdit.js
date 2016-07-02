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
import ResourceForm from 'components/ResourceForm';

window.faker = Faker;

import ResourceStore from 'stores/ResourceStore';

class ResourceEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resource: props.resource.toJS(),
			faker_categories: FakerCategories,
			faker_sub_categories: FakerSubCategories
		};
	}

	componentWillReceiveProps(props) {
		if (props.resource !== this.props.resource) {
			this.state.resource = props.resource.toJS();
			this.forceUpdate();
		}
	}

	shouldComponentUpdate(props) {
		return props.resource !== this.props.resource || props.params !== this.props.params;
	}

	updateCurrentlyEditingResource() {
		ResourceStore.updateCurrentlyEditingResource(this.state.resource);
	}

	saveResource() {
		ResourceStore.saveResource(this.state.resource);
	}

	deleteResource() {
		ResourceStore.deleteResource(this.state.resource);
	}

/*=============================================================================
	Render office tasks
=============================================================================*/
	render() {
		return (
			<div className="flex">
				<div className="flex flex-vertical">
					<div className="section-title flex flex-0">
						<span className="flex-1">
							{this.state.resource.name}
						</span>
						<a className="large-right-margin"
							href=""
							onClick={(e) => {
								e.preventDefault();
								this.deleteResource();
							}}>
							{"Delete"}
						</a>
						<a href=""
							onClick={(e) => {
								e.preventDefault();
								this.saveResource();
							}}>
							{"Save"}
						</a>
					</div>
					<ResourceForm resource={this.state.resource}
						nested={false}
					/>
				</div>
				{this.props.children}
			</div>
		)
	}
}

export default Provide(ResourceEdit, [
	'resources',
	'resource'
])
