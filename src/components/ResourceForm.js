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
			resource: props.resource,
			resources: props.resources
		};
	}

	shouldComponentUpdate(props) {
		return this.props.resource !== props.resource;
	}

	componentWillReceiveProps(props) {
		if (this.props.resource !== props.resource) {
			this.state.resource = props.resource;
		}
	}

	render() {
		return (
			<div className="flex-1 overflow-auto">
				<div className="flex box without-bottom-padding">
					<div className="flex-1">
						{this.props.nested === false ?
							<div>
								<div className="input-label">{'Name'}</div>
								<input value={this.state.resource.name || ''}
									onChange={(e) => {
										const value = e.target.value.replace(/\W+/g, ' ').replace(/ /g, '_');
										ResourceStore.saveValue('name', value);
									}}>
								</input>
							</div>
							: null
						}
						<div className="input-label">{'Type'}</div>
						<select value={this.state.resource.type}
							onChange={(e) => {
								ResourceStore.saveValue('type', e.target.value);
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

										ResourceStore.saveValue('length', value);
									}}>
								</input>
							</div>
							: null
						}
					</div>
					{!this.props.nested ?
						<div className="flex-1 flex">
							<div className="flex-1 flex flex-vertical large-left-margin">
								<div className="flex-0 input-label">{'Supported methods'}</div>
								<div className="flex-0 flex">
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supportedMethods.get === true}
											onClick={() => {
												ResourceStore.setResourceCRUD('get');
											}} />
										{'GET'}
									</label>
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supportedMethods.post === true}
											onClick={() => {
												ResourceStore.setResourceCRUD('post');
											}} />
										{'POST'}
									</label>
								</div>
								<div className="flex-0 flex">
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supportedMethods.put === true}
											onClick={() => {
												ResourceStore.setResourceCRUD('put');
											}} />
										{'PUT'}
									</label>
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supportedMethods.destroy === true}
											onClick={() => {
												ResourceStore.setResourceCRUD('destroy');
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
												ResourceStore.setResourceCRUD('filter');
											}} />
										{'Filters'}
									</label>
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supportedUtils.pagination === true}
											onClick={() => {
												ResourceStore.setResourceCRUD('pagination');
											}} />
										{'Pagination'}
									</label>
								</div>
								<div className="flex-0 flex">
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supportedUtils.search === true}
											onClick={() => {
												ResourceStore.setResourceCRUD('search');
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
							ResourceStore.addAnotherKey();
						}}>
						{'Add another key'}
					</a>
				</div>
				{this.state.resource.model.map((model, i) => {
					return (
						<div key={i}
							className="box without-bottom-padding with-bottom-border">
							<div key={model.id || model.uuid}
								className="flex model-input-group">
								<div className="flex-1 large-right-margin">
									<div className="input-label flex">
										<span className="flex-1">{'Key name'}</span>
										<a href=""
											onClick={(e) => {
												e.preventDefault();
												ResourceStore.removeModelKey(model, i);
											}}>
											{'Remove key'}
										</a>
									</div>
									<input value={model.key || ''}
										onChange={(e) => {
											const value = e.target.value.replace(/\W+/g, ' ').replace(/ /g, '_');
											ResourceStore.handleModelChange(model, 'key', value);
										}} />
									<div className="flex-0 input-label">{'Required?'}</div>
									<select value={model.required}
										onChange={(e) => {
											ResourceStore.handleModelChange(model, 'required', e.target.value === 'true');
										}}>
										<option value={false}>{'No'}</option>
										<option value={true}>{'Yes'}</option>
									</select>
								</div>
								<div className="flex-1 overflow-hidden large-right-margin">
									<div className="input-label flex-1">
										<span className="flex-1">{'Type'}</span>
									</div>
									<select value={model.type}
										onChange={(e) => {
											ResourceStore.handleModelChange(model, 'type', e.target.value);
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
													ResourceStore.handleModelChange(model, 'predefinedType', e.target.value);
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
														onChange={(e) => ResourceStore.handleModelChange(model, 'predefinedValue', e.target.value)} />
												</div>
												:
												<div>
													{model.predefinedType === 'number' ?
														<div>
															<div className="input-label">{'Value'}</div>
															<input value={model.predefinedValue || ''}
																type="number"
																onChange={(e) => ResourceStore.handleModelChange(model, 'predefinedValue', e.target.value)} />
														</div>
														:
														<div>
															{model.predefinedType === 'boolean' ?
																<div>
																	<div className="input-label">{'Value'}</div>
																	<select value={model.predefinedValue}
																		onChange={(e) => ResourceStore.handleModelChange(model, 'predefinedValue', e.target.value === 'true')}>
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
																				onChange={(e) => ResourceStore.handleModelChange(model, 'predefinedValue', e.target.value)} />
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
												onChange={(e) => ResourceStore.handleSelectedChildResource(model, e.target.value)}>
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
															ResourceStore.handleModelChange(model, 'childResourceMethod', e.target.value);
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
															ResourceStore.handleModelChange(model, 'childResource_limit', e.target.value);
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
												onChange={(e) => ResourceStore.setSelectedRandomCategory(model, e.target.value)}>
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
															ResourceStore.setSelectedRandomSubcategory(model, selectedFakerSubCategory);
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
																					ResourceStore.handleModelParamsChange(model, param.param, value);
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
																						onChange={(e) => ResourceStore.handleModelParamsChange(model, param.param, e.target.value)}
																					/>
																					:
																					<input value={model.fakerParams[param.param] || ''}
																						onChange={(e) => {
																							let value = e.target.value;
																							if (param.inputType === 'number') {
																								value = parseFloat(e.target.value) || 0;
																							}
																							ResourceStore.handleModelParamsChange(model, param.param, value);
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
																					onChange={(value) => ResourceStore.handleModelParamsChange(model, param.param, value)}
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
	resource: React.PropTypes.object
};

export default ResourceForm;
