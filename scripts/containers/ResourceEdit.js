import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';

// Stores
import ResourcesStore from 'stores/ResourcesStore';

class ResourceEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resource: {},
			faker_categories: [
				{
					name: 'Name',
					value: 'name'
				},
				{
					name: 'Address',
					value: 'address'
				},
				{
					name: 'Random',
					value: 'random'
				}
			]
		};
	}

	componentWillReceiveProps(props) {
		this.state.resource = props.resource.toJS();
	}

	saveValue(name, value) {
		this.state.resource[name] = value;
		this.forceUpdate();
	}

	handleModelChange(model, name, value) {
		model[name] = value;
		this.forceUpdate();
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
							<div className="input-label">{"Name"}</div>
							<input value={this.state.resource.name}
								onChange={(e) => {
									this.saveValue('name', e.target.value);
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
											this.saveValue('length', parseInt(e.target.value));
										}}>
									</input>
								</div>
								: null
							}
						</div>

						<div className="section-title with-top-border">
							{`${this.state.resource.name} model description`}
						</div>

						<div className="box">
							{Object.keys(this.state.resource.model).map((key, i) => {
								var model = this.state.resource.model[key];

								return (
									<div key={i} className="flex model-input-group">
										<div className="flex-1 right-margin">
											<div className="input-label">{"Key name"}</div>
											<input value={model.key}
												onChange={(e) => {
													this.handleModelChange(model, 'key', e.target.value);
												}} />
										</div>
										<div className="flex-2">
											<div className="input-label">{"Type"}</div>
											<select value={model.type}
												onChange={(e) => {
													this.handleModelChange(model, 'type', e.target.value);
												}}>
												<option value={"random"}>
													{"Random"}
												</option>
												<option value={"predefined"}>
													{"Pre-defined"}
												</option>
												<option value={"calculated"}>
													{"Calculated"}
												</option>
											</select>

											{model.type === 'random' ?
												<div>
													<div className="input-label">{"Random category"}</div>
													<select value={model.faker_category}
														onChange={(e) => {
															this.handleModelChange(model, 'faker_category', e.target.value);
														}}>
														{this.state.faker_categories.map((category, i) => {
															return (
																<option value={category.value}>
																	{category.name}
																</option>
															)
														})}
													</select>


												</div>
												: null
											}
										</div>
									</div>
								)
							})}
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