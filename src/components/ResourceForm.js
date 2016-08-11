import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import FakerCategories from 'data/FakerCategories';
import FakerSubCategories from 'data/FakerSubCategories';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/tomorrow';
import ResourceStore from 'stores/ResourceStore';

class ResourceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resource: props.resource.toJS(),
			resources: props.resources.toJS()
		};
	}

	saveValue(name, value) {
		let newState = this.state;
		newState.resource[name] = value;
		this.setState(newState);
		ResourceStore.updateResource(newState.resource);
	}

	setResourceCRUD(name) {
		let newState = this.state;
		newState.resource.supportedMethods[name] = !newState.resource.supportedMethods[name];
		this.setState(newState);
		// ResourceStore.setResourceCRUD(name);
	}

	handleModelChange(model, name, value) {
		let newState = this.state;
		let newModel = this.state.resource.model.find((key) => {
			return key.uuid === model.uuid;
		});
		newModel[name] = value;
		this.setState(newState);
		ResourceStore.updateResource(newState.resource);
	}

	handleModelTypeChanged(model, type) {
		let newState = this.state;
		let newModel = this.state.resource.model.find((key) => {
			return key.uuid === model.uuid;
		});
		if (type === 'resource') {
			newModel.childResource = {};
		} else {
			newModel.childResource = '';
		}
		if (type === 'object') {
			newModel.resource = {
				type: 'array',
				length: 5,
				model: [
					{
						uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
							let r = Math.random() * 16 | 0;
							let v = c === 'x' ? r : (r & 0x3 | 0x8);
							return v.toString(16);
						}),
						type: 'predefined',
						fakerSubCategory: '',
						fakerCategory: '',
						fakerParams: {},
						resource: {},
						predefinedType: 'string',
						predefinedValue: '',
						required: false
					}
				]
			};
		} else {
			newModel.resource = {};
		}
		this.setState(newState);
		ResourceStore.updateResource(newState.resource);
	}

	setSelectedRandomCategory(model, value) {
		let newState = this.state;
		let newModel = this.state.resource.model.find((key) => {
			return key.uuid === model.uuid;
		});
		newModel.fakerCategory = value;
		newModel.fakerSubCategory = '';
		newModel.fakerParams = {};
		this.setState(newState);
		ResourceStore.updateResource(newState.resource);
	}

	setSelectedRandomSubcategory(model, category) {
		let newState = this.state;
		let newModel = this.state.resource.model.find((key) => {
			return key.uuid === model.uuid;
		});
		newModel.selectedFakerSubCategory = category;
		newModel.fakerSubCategory = category.value;
		newModel.fakerParams = this.resetRandomParams(category);
		this.setState(newState);
		ResourceStore.updateResource(newState.resource);
	}

	resetRandomParams(selectedFakerSubCategory) {
		let params = {};
		selectedFakerSubCategory.params.map((param) => {
			if (param.type === 'input') {
				if (param.inputType === 'number') {
					params[param.param] = 0;
				} else if (param.inputType === 'date') {
					params[param.param] = new Date();
				} else {
					params[param.param] = '';
				}
			} else if (param.type === 'select') {
				params[param.param] = param.options[0].value;
			} else if (param.type === 'editor') {
				params[param.param] = '';
			}
		});
		return params;
	}

	handleModelParamsChange(model, name, value) {
		let newState = this.state;
		let newModel = this.state.resource.model.find((key) => {
			return key.uuid === model.uuid;
		});
		newModel.fakerParams[name] = value;
		this.setState(newState);
		ResourceStore.updateResource(newState.resource);
	}

	handleModelPredefinedTypeChange(model) {
		let newState = this.state;
		let newModel = this.state.resource.model.find((key) => {
			return key.uuid === model.uuid;
		});
		newModel.predefinedValue = '';
		this.setState(newState);
		ResourceStore.updateResource(newState.resource);
	}

	handleSelectedChildResource(model, resourceName) {
		let newState = this.state;
		let newModel = this.state.resource.model.find((key) => {
			return key.uuid === model.uuid;
		});
		let selectedChildResource = this.props.resources.find((resource) => {
			return resource.name === resourceName;
		});
		newModel.childResourceName = selectedChildResource.name;
		newModel.childResourceType = selectedChildResource.type;
		this.setState(newState);
		ResourceStore.updateResource(newState.resource);
	}

	render() {
		return (
			<div className="flex-1 overflow-auto">
				<div className="flex pa3 pb0">
					<div className="flex-1 mr3">
						{this.props.nested === false ?
							<div>
								<div className="input-label">{'Name'}</div>
								<input value={this.state.resource.name || ''}
									onChange={(e) => {
										const value = e.target.value.replace(/\W+/g, ' ').replace(/ /g, '_');
										this.saveValue('name', value);
									}}>
								</input>
							</div>
							: null
						}
						<div className="input-label">{'Type'}</div>
						<select value={this.state.resource.type}
							onChange={(e) => {
								this.saveValue('type', e.target.value);
							}}>
							<option value={'array'}>{'Array'}</option>
							<option value={'singular'}>{'Signular'}</option>
						</select>
						{this.state.resource.type === 'array' ?
							<div>
								<div className="input-label">{'Length'}</div>
								<input value={this.state.resource.length || ''}
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
					{!this.props.nested ?
						<div className="flex-1 flex">
							<div className="flex-1 flex flex-column">
								<div className="flex-0 input-label">{'Supported methods'}</div>
								<div className="flex-0 flex">
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supportedMethods.get === true}
											onClick={() => {
												this.setResourceCRUD('get');
											}} />
										{'GET'}
									</label>
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supportedMethods.post === true}
											onClick={() => {
												this.setResourceCRUD('post');
											}} />
										{'POST'}
									</label>
								</div>
								<div className="flex-0 flex">
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supportedMethods.put === true}
											onClick={() => {
												this.setResourceCRUD('put');
											}} />
										{'PUT'}
									</label>
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supportedMethods.destroy === true}
											onClick={() => {
												this.setResourceCRUD('destroy');
											}} />
										{'DELETE'}
									</label>
								</div>


								<div className="flex-0 input-label">{'Supported API utilities'}</div>
								<div className="flex-0 flex">
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supportedUtils.filter === true}
											onClick={() => {
												this.setResourceCRUD('filter');
											}} />
										{'Filters'}
									</label>
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supportedUtils.pagination === true}
											onClick={() => {
												this.setResourceCRUD('pagination');
											}} />
										{'Pagination'}
									</label>
								</div>
								<div className="flex-0 flex">
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supportedUtils.search === true}
											onClick={() => {
												this.setResourceCRUD('search');
											}} />
										{'Search'}
									</label>
								</div>
							</div>
						</div>
						: null
					}
				</div>

				<div className="section-title with-top-border flex">
					<span className="flex-1">
						{`${this.state.resource.name || ''} model description`}
					</span>
					<a href=""
						onClick={(e) => {
							e.preventDefault();
							this.addAnotherKey();
						}}>
						{'Add another key'}
					</a>
				</div>
				{this.state.resource.model.map((model, i) => {
					return (
						<div key={i}
							className="pa3">
							<div key={model.id || model.uuid}
								className="flex model-input-group">
								<div className="flex-1 mr3">
									<div className="input-label flex">
										<span className="flex-1">{'Key name'}</span>
										<a href=""
											onClick={(e) => {
												e.preventDefault();
												this.removeModelKey(model, i);
											}}>
											{'Remove key'}
										</a>
									</div>
									<input value={model.key || ''}
										onChange={(e) => {
											const value = e.target.value.replace(/\W+/g, ' ').replace(/ /g, '_');
											this.handleModelChange(model, 'key', value);
										}} />
									<div className="flex-0 input-label">{'Required?'}</div>
									<select value={model.required}
										onChange={(e) => {
											this.handleModelChange(model, 'required', e.target.value === 'true');
										}}>
										<option value={false}>{'No'}</option>
										<option value={true}>{'Yes'}</option>
									</select>
								</div>
								<div className="flex-1 overflow-hidden">
									<div className="input-label flex-1">
										<span className="flex-1">{'Type'}</span>
									</div>
									<select value={model.type}
										onChange={(e) => {
											this.handleModelChange(model, 'type', e.target.value);
											this.handleModelTypeChanged(model, e.target.value);
										}}>
										<option value={'predefined'}>
											{'Pre-defined'}
										</option>
										<option value={'childResource'}>
											{'From another resource'}
										</option>
										<option value={'object'}>
											{'Object / array of objects'}
										</option>
										<option value={'random'}>
											{'Random'}
										</option>
									</select>

									{model.type === 'predefined' ?
										<div>
											<div className="input-label">{'Type'}</div>
											<select value={model.predefinedType}
												onChange={(e) => {
													this.handleModelChange(model, 'predefinedType', e.target.value);
													this.handleModelPredefinedTypeChange(model, e.target.value);
												}}>
												<option value="string">{'String'}</option>
												<option value="number">{'Number'}</option>
												<option value="boolean">{'Boolean'}</option>
												<option value="date">{'Date'}</option>
											</select>

											{model.predefinedType === 'string' ?
												<div>
													<div className="input-label">{'Value'}</div>
													<input value={model.predefinedValue || ''}
														onChange={(e) => this.handleModelChange(model, 'predefinedValue', e.target.value)} />
												</div>
												:
												<div>
													{model.predefinedType === 'number' ?
														<div>
															<div className="input-label">{'Value'}</div>
															<input value={model.predefinedValue || ''}
																type="number"
																onChange={(e) => this.handleModelChange(model, 'predefinedValue', e.target.value)} />
														</div>
														:
														<div>
															{model.predefinedType === 'boolean' ?
																<div>
																	<div className="input-label">{'Value'}</div>
																	<select value={model.predefinedValue}
																		onChange={(e) => this.handleModelChange(model, 'predefinedValue', e.target.value === 'true')}>
																		<option value={false}>{'False'}</option>
																		<option value={true}>{'True'}</option>
																	</select>
																</div>
																:
																<div>
																	{model.predefinedType === 'date' ?
																		<div>
																			<div className="input-label">{'Value'}</div>
																			<input value={model.predefinedValue || ''}
																				type="date"
																				onChange={(e) => this.handleModelChange(model, 'predefinedValue', e.target.value)} />
																		</div>
																		: null
																	}
																</div>
															}
														</div>
													}
												</div>
											}
										</div>
										: null
									}

									{model.type === 'childResource' ?
										<div>
											<div className="input-label">{'Resource'}</div>
											<select value={model.childResourceName}
												onChange={(e) => this.handleSelectedChildResource(model, e.target.value)}>
												<option disabled value="pleasechoose">{'Please choose'}</option>
												{this.state.resources.map((resource, resourceIndex) => {
													if (resource.id !== this.state.resource.id) {
														return (
															<option key={resourceIndex}
																value={resource.name}>
																{resource.name}
															</option>
														);
													}
													return null;
												})}
											</select>

											{model.childResourceType === 'array' ?
												<div>
													<div className="input-label">{'Method'}</div>
													<select value={'pleasechoose'}
														value={model.childResourceMethod}
														onChange={(e) => {
															this.handleModelChange(model, 'childResourceMethod', e.target.value);
														}}>
														<option value="id">{'Randomly selected id from array'}</option>
														<option value="object">{'Randomly selected object from array'}</option>
														<option value="array">{'Subset from array'}</option>
													</select>
												</div>
												: null
											}

											{model.childResourceMethod === 'array' ?
												<div>
													<div className="input-label">{'Limit (leave blank for entire array)'}</div>
													<input value={model.childResource_limit || ''}
														onChange={(e) => {
															this.handleModelChange(model, 'childResource_limit', e.target.value);
														}} />
												</div>
												: null
											}
										</div>
										: null
									}

									{model.type === 'object' ?
										<a onClick={(e) => {
											e.preventDefault();
											browserHistory.push(`${window.location.pathname}/${i}`);
										}}>
											{'Configure'}
										</a>
										: null
									}

									{model.type === 'random' ?
										<div>
											<div className="input-label">{'Random category'}</div>
											<select value={'pleasechoose'}
												value={model.fakerCategory}
												onChange={(e) => this.setSelectedRandomCategory(model, e.target.value)}>
												<option disabled value="pleasechoose">{'Please choose'}</option>
												{FakerCategories.map((category, categoryIndex) => {
													return (
														<option key={categoryIndex}
															value={category.value}>
															{category.name}
														</option>
													);
												})}
											</select>

											{model.fakerCategory ?
												<div>
													<div className="input-label">{'Random sub-category'}</div>
													<select value={'pleasechoose'}
														value={model.fakerSubCategory}
														onChange={(e) => {
															let selectedFakerSubCategory = FakerSubCategories[model.fakerCategory].find((category) => {
																return category.value === e.target.value;
															});
															this.setSelectedRandomSubcategory(model, selectedFakerSubCategory);
														}}>
														<option disabled value="pleasechoose">{'Please choose'}</option>
														{FakerSubCategories[model.fakerCategory].map((type, categoryIndex) => {
															return (
																<option key={categoryIndex}
																	value={type.value}>
																	{type.name}
																</option>
															);
														})}
													</select>
													{model.fakerSubCategory ?
														<div>
															{model.selectedFakerSubCategory.params.map((param, paramIndex) => {
																return (
																	<div key={paramIndex}>
																		<div className="input-label">{param.name}</div>
																		{param.type === 'select' ?
																			<select value={model.fakerParams[param.param]}
																				onChange={(e) => {
																					let value = e.target.value;
																					if (e.target.value === 'false') {
																						value = false;
																					} else if (e.target.value === 'true') {
																						value = true;
																					}
																					this.handleModelParamsChange(model, param.param, value);
																				}}>
																				{param.options.map((option, optionIndex) => {
																					return (
																						<option key={optionIndex}
																							value={option.value}>
																							{option.description}
																						</option>
																					);
																				})}
																			</select>
																			: null
																		}
																		{param.type === 'input' ?
																			<div>
																				{param.inputType === 'date' ?
																					<input value={model.fakerParams[param.param] || ''}
																						type="date"
																						onChange={(e) => this.handleModelParamsChange(model, param.param, e.target.value)}
																					/>
																					:
																					<input value={model.fakerParams[param.param] || ''}
																						onChange={(e) => {
																							let value = e.target.value;
																							if (param.inputType === 'number') {
																								value = parseFloat(e.target.value) || 0;
																							}
																							this.handleModelParamsChange(model, param.param, value);
																						}}
																					/>
																				}
																			</div>
																			: null
																		}
																		{param.type === 'json' ?
																			<div className="editor-wrap">
																				<AceEditor
																					mode="json"
																					theme="tomorrow"
																					width="100%"
																					height="100%"
																					editorProps={{
																						$blockScrolling: true
																					}}
																					setOptions={{
																						showGutter: false,
																						showLineNumbers: false,
																						highlightGutterLine: false
																					}}
																					highlightActiveLine={false}
																					enableLiveAutocompletion={true}
																					tabSize={2}
																					onChange={(value) => this.handleModelParamsChange(model, param.param, value)}
																					value={model.fakerParams[param.param]}
																					name={`model-${i}`}
																				/>
																			</div>
																			: null
																		}
																	</div>
																);
															})}
														</div>
														: null
													}
												</div>
												: null
											}
										</div>
										: null
									}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

ResourceForm.propTypes = {
	nested: React.PropTypes.bool,
	resource: React.PropTypes.object,
	resources: React.PropTypes.array
};

export default ResourceForm;
