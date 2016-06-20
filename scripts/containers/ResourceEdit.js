import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';
import FakerCategories from 'data/FakerCategories';
import FakerSubCategories from 'data/FakerSubCategories';
import Faker from 'faker';

window.faker = Faker;

// Stores
import ResourcesStore from 'stores/ResourcesStore';

class ResourceEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resource: {},
			faker_categories: FakerCategories,
			faker_sub_categories: FakerSubCategories
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

	handleModelParamsChange(model, name, value) {
		model.params[name] = value;
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
						<div className="box without-bottom-padding">
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

						<div className="box without-bottom-padding">
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
																<option key={i}
																	value={category.value}>
																	{category.name}
																</option>
															)
														})}
													</select>


													<div className="input-label">{"Random sub-category"}</div>
													<select value={model.faker_type}
														onChange={(e) => {
															this.handleModelChange(model, 'faker_type', e.target.value);
														}}>
														{this.state.faker_sub_categories[model.faker_category].map((type, i) => {
															return (
																<option key={i}
																	value={type.value}>
																	{type.name}
																</option>
															)
														})}
													</select>
													{model.faker_type === "streetAddress" ?
														<div className="checkbox-wrap">
															<input type="checkbox"
																checked={model.params.useFullAddress === true}
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'useFullAddress', e.target.checked);
																}} />
															<span className="checkbox-label">{"Use full address?"} {model.params.useFullAddress}</span>
														</div>
														: null
													}
													{model.faker_type === "department" ?
														<div>
															<div className="input-label">{"Max value"}</div>
															<input value={model.params.max}
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'max', e.target.value);
																}} />
															<div className="input-label">{"Fixed amount"}</div>
															<input value={model.params.fixedAmount}
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'fixedAmount', e.target.value);
																}} />
														</div>
														: null
													}
													{model.faker_type === "price" ?
														<div>
															<div className="input-label">{"Min value"}</div>
															<input value={model.params.min}
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'min', e.target.value);
																}} />
															<div className="input-label">{"Max value"}</div>
															<input value={model.params.max}
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'max', e.target.value);
																}} />
															<div className="input-label">{"Decimal places"}</div>
															<input value={model.params.dec}
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'dec', e.target.value);
																}} />
															<div className="input-label">{"Symbol"}</div>
															<input value={model.params.symbol}
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'symbol', e.target.value);
																}} />
														</div>
														: null
													}
													{model.faker_type === "number" ?
														<div>
															<div className="input-label">{"Min value"}</div>
															<input value={model.params.min}
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'min', e.target.value);
																}} />
															<div className="input-label">{"Max value"}</div>
															<input value={model.params.max}
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'max', e.target.value);
																}} />
														</div>
														: null
													}
													{model.faker_type === "between" ?
														<div>
															<div className="input-label">{"From"}</div>
															<input value={model.params.from}
																type="date"
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'from', e.target.value);
																}} />
															<div className="input-label">{"To"}</div>
															<input value={model.params.to}
																type="date"
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'to', e.target.value);
																}} />
														</div>
														: null
													}
													{model.faker_type === "future" || model.faker_type === "past" ?
														<div>
															<div className="input-label">{"From date"}</div>
															<input value={model.params.refDate}
																type="date"
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'refDate', e.target.value);
																}} />
															<div className="input-label">{"Number of years"}</div>
															<input value={model.params.years}
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'years', e.target.value);
																}} />
														</div>
														: null
													}
													{model.faker_type === "recent" ?
														<div>
															<div className="input-label">{"Number of days"}</div>
															<input value={model.params.days}
																onChange={(e) => {
																	this.handleModelParamsChange(model, 'days', e.target.value);
																}} />
														</div>
														: null
													}
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