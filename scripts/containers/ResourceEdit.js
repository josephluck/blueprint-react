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

					<div className="flex-1 overflow-auto">
						<div className="box without-bottom-padding">
							<div className="input-label">{"Name"}</div>
							<input value={this.state.resource.name}
								onChange={(e) => {
									var value = e.target.value.replace(/\W+/g, " ").replace(/ /g,"_");
									this.saveValue('name', value);
								}}>
							</input>
							<div className="input-label">{"Type"}</div>
							<select value={this.state.resource.type}
								onChange={(e) => {
									this.saveValue('type', e.target.value);
								}}>
								<option value={"array"}>{"Array"}</option>
								<option value={"singular"}>{"Signular"}</option>
							</select>
							{this.state.resource.type === 'array' ?
								<div>
									<div className="input-label">{"Length"}</div>
									<input value={this.state.resource.length}
										onChange={(e) => {
											let value = 0;

											if (!isNaN(parseFloat(e.target.value)) && isFinite(e.target.value)) {
												value = parseFloat(e.target.value);
											}
											this.saveValue('length', value);
										}}>
									</input>
								</div>
								: null
							}
						</div>

						<div className="section-title with-top-border flex">
							<span className="flex-1">
								{`${this.state.resource.name} model description`}
							</span>
							<a href=""
								onClick={(e) => {
									e.preventDefault();
									this.addAnotherKey();
								}}>
								{"Add another key"}
							</a>
						</div>

						<ModelForm resource={this.state.resource}></ModelForm>
					</div>
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
