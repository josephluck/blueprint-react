import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import FakerCategories from 'data/FakerCategories';
import FakerSubCategories from 'data/FakerSubCategories';
import Faker from 'faker';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/tomorrow';
import validate from 'validate.js';
import moment from 'moment';
window.faker = Faker;
window.validate = validate;
window.moment = moment;

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

	addAnotherKey() {
		this.state.resource.model.unshift({
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
		});
	}

	removeModelKey(model, index) {
		this.state.resource.model.splice(index, 1);
	}

	saveValue(name, value) {
		this.state.resource.set(name, value);
	}

	setResourceCRUD(name) {
		this.state.resource.supportedMethods.set(name, !this.state.resource.supportedMethods[name]);
	}

	handleModelChange(model, name, value) {
		model.set(name, value);
	}

	handleModelTypeChanged(model, type) {
		if (type === 'resource') {
			model.set('childResource', {});
		} else {
			model.set('childResource', '');
		}
		if (type === 'object') {
			model.resource.reset({
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
			});
		} else {
			model.set('resource', {});
		}
	}

	handleRandomCategoryChanged(model, value) {
		model.set({
			fakerCategory: value,
			fakerSubCategory: '',
			fakerParams: {}
		});
	}

	// Consider storing this in faker subcategories json instead of here
	// that way the params could be mapped over as an object in this component
	// based on the subcategory which will make this component more dynamically
	// generated and not hard-coded and would provide a great foundation for
	// including more random generation libraries
	resetRandomParams(model, fakerCategory) {
		let params = {};
		if (fakerCategory === 'state') {
			params = {
				useAbbr: null
			};
		} else if (fakerCategory === 'streetAddress') {
			params = {
				useFullAddress: null
			};
		} else if (fakerCategory === 'zipCode') {
			params = {
				format: null
			};
		} else if (fakerCategory === 'department') {
			params = {
				max: null,
				fixedAmount: null
			};
		} else if (fakerCategory === 'price') {
			params = {
				min: null,
				max: null,
				dec: null,
				symbol: null
			};
		} else if (fakerCategory === 'companyName') {
			params = {
				format: null
			};
		} else if (fakerCategory === 'between') {
			params = {
				from: null,
				to: null
			};
		} else if (fakerCategory === 'future') {
			params = {
				years: null,
				refDate: null
			};
		} else if (fakerCategory === 'month') {
			params = {
				options: null
			};
		} else if (fakerCategory === 'past') {
			params = {
				years: null,
				refDate: null
			};
		} else if (fakerCategory === 'recent') {
			params = {
				days: null
			};
		} else if (fakerCategory === 'weekday') {
			params = {
				options: null
			};
		} else if (fakerCategory === 'account') {
			params = {
				length: null
			};
		} else if (fakerCategory === 'amount') {
			params = {
				min: null,
				max: null,
				dec: null,
				symbol: null
			};
		} else if (fakerCategory === 'mask') {
			params = {
				length: null,
				parens: null,
				elipsis: null
			};
		} else if (fakerCategory === 'abstract' ||
			fakerCategory === 'animals' ||
			fakerCategory === 'business' ||
			fakerCategory === 'cats' ||
			fakerCategory === 'city' ||
			fakerCategory === 'fashion' ||
			fakerCategory === 'food' ||
			fakerCategory === 'image' ||
			fakerCategory === 'nature' ||
			fakerCategory === 'nightlife' ||
			fakerCategory === 'people' ||
			fakerCategory === 'sports' ||
			fakerCategory === 'technics' ||
			fakerCategory === 'transport') {
			params = {
				width: null,
				height: null
			};
		} else if (fakerCategory === 'color') {
			params = {
				baseRed255: null,
				baseGreen255: null,
				baseBlue255: null
			};
		} else if (fakerCategory === 'email') {
			params = {
				firstName: null,
				lastName: null,
				provider: null
			};
		} else if (fakerCategory === 'exampleEmail') {
			params = {
				firstName: null,
				lastName: null
			};
		} else if (fakerCategory === 'password') {
			params = {
				len: null,
				memorable: null,
				pattern: null,
				prefix: null
			};
		} else if (fakerCategory === 'userName') {
			params = {
				firstName: null,
				lastName: null
			};
		} else if (fakerCategory === 'lines') {
			params = {
				lineCount: null
			};
		} else if (fakerCategory === 'paragraph') {
			params = {
				sentenceCount: null
			};
		} else if (fakerCategory === 'paragraphs') {
			params = {
				paragraphCount: null,
				separatora: null
			};
		} else if (fakerCategory === 'sentence') {
			params = {
				wordCount: null,
				range: null
			};
		} else if (fakerCategory === 'sentences') {
			params = {
				sentenceCount: null,
				separatora: null
			};
		} else if (fakerCategory === 'text') {
			params = {
				times: null
			};
		} else if (fakerCategory === 'word') {
			params = {
				num: null
			};
		} else if (fakerCategory === 'words') {
			params = {
				num: null
			};
		} else if (fakerCategory === 'findName') {
			params = {
				firstName: null,
				lastName: null,
				gender: null
			};
		} else if (fakerCategory === 'firstName') {
			params = {
				gender: null
			};
		} else if (fakerCategory === 'lastName') {
			params = {
				gender: null
			};
		} else if (fakerCategory === 'prefix') {
			params = {
				gender: null
			};
		} else if (fakerCategory === 'phoneFormatsArrayIndex') {
			params = {
				phoneFormatsArrayIndex: null
			};
		} else if (fakerCategory === 'phoneNumber') {
			params = {
				format: null
			};
		} else if (fakerCategory === 'arrayElement') {
			params = {
				array: null
			};
		} else if (fakerCategory === 'number') {
			params = {
				options: null
			};
		} else if (fakerCategory === 'objectElement') {
			params = {
				object: null,
				field: null
			};
		} else if (fakerCategory === 'word') {
			params = {
				type: null
			};
		} else if (fakerCategory === 'words') {
			params = {
				count: null
			};
		} else if (fakerCategory === 'commonFileExt') {
			params = {
				type: null
			};
		} else if (fakerCategory === 'commonFileName') {
			params = {
				ext: null,
				type: null
			};
		} else if (fakerCategory === 'fileExt') {
			params = {
				mimeType: null
			};
		} else if (fakerCategory === 'fileName') {
			params = {
				ext: null,
				type: null
			};
		}

		model.fakerParams.reset(params);
	}

	handleModelPredefinedTypeChange(model) {
		model.reset({
			predefinedValue: ''
		});
	}

	handleSelectedChildResource(model, resourceName) {
		let resource = this.state.resources.find((_resource) => {
			return _resource.name === resourceName;
		});

		model.set('childResourceName', resource.name);
		model.set('childResourceType', resource.type);
	}

	handleModelParamsChange(model, name, value) {
		model.fakerParams.set(name, value);
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
						<div className="flex-2 flex">
							<div className="flex-1 flex flex-vertical large-left-margin">
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
							<div className="flex-1 flex flex-vertical large-left-margin">
								<div className="input-label flex-0">{'Documentation description'}</div>
								<textarea className="flex-1"
									value={this.state.resource.documentation_description}
									onChange={(e) => {
										this.saveValue('documentation_description', e.target.value);
									}}>
								</textarea>
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
							className="box without-bottom-padding with-bottom-border">
							<div key={model.id || model.uuid}
								className="flex model-input-group">
								<div className="flex-1 large-right-margin">
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
								</div>
								<div className="flex-1 overflow-hidden large-right-margin">
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
														onChange={(e) => {
															this.handleModelChange(model, 'predefinedValue', e.target.value);
														}} />
												</div>
												:
												<div>
													{model.predefinedType === 'number' ?
														<div>
															<div className="input-label">{'Value'}</div>
															<input value={model.predefinedValue || ''}
																type="number"
																onChange={(e) => {
																	this.handleModelChange(model, 'predefinedValue', e.target.value);
																}} />
														</div>
														:
														<div>
															{model.predefinedType === 'boolean' ?
																<div>
																	<div className="input-label">{'Value'}</div>
																	<select value={model.predefinedValue}
																		onChange={(e) => {
																			this.handleModelChange(model, 'predefinedValue', e.target.value === 'true');
																		}}>
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
																				onChange={(e) => {
																					this.handleModelChange(model, 'predefinedValue', e.target.value);
																				}} />
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
											<select value={'pleasechoose'}
												value={model.childResourceName}
												onChange={(e) => {
													this.handleSelectedChildResource(model, e.target.value);
												}}>
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
														<option disabled value="pleasechoose">{'Please choose'}</option>
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
											// Use browser history to push current ${i} in to URL
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
												onChange={(e) => {
													this.handleRandomCategoryChanged(model, e.target.value);
												}}>
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
															this.handleModelChange(model, 'fakerSubCategory', e.target.value);
															this.resetRandomParams(model, e.target.value);
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
															{model.fakerSubCategory === 'streetAddress' ?
																<div>
																	<div className="input-label">{'Use full address'}</div>
																	<select value={model.fakerParams.useFullAddress}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'useFullAddress', e.target.value === 'true');
																		}}>
																		<option value={false}>{'No'}</option>
																		<option value={true}>{'Yes'}</option>
																	</select>
																</div>
																: null
															}
															{model.fakerSubCategory === 'price' ?
																<div>
																	<div className="input-label">{'Min value'}</div>
																	<input value={model.fakerParams.min || ''}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'min', value);
																		}} />
																	<div className="input-label">{'Max value'}</div>
																	<input value={model.fakerParams.max || ''}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'max', value);
																		}} />
																	<div className="input-label">{'Decimal places'}</div>
																	<input value={model.fakerParams.dec || ''}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'dec', value);
																		}} />
																	<div className="input-label">{'Symbol'}</div>
																	<input value={model.fakerParams.symbol || ''}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'symbol', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'between' ?
																<div>
																	<div className="input-label">{'From'}</div>
																	<input value={model.fakerParams.from || ''}
																		type="date"
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'from', e.target.value);
																		}} />
																	<div className="input-label">{'To'}</div>
																	<input value={model.fakerParams.to || ''}
																		type="date"
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'to', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'future' || model.fakerSubCategory === 'past' ?
																<div>
																	<div className="input-label">{'Number of years'}</div>
																	<input value={model.fakerParams.years || ''}
																		onChange={(e) => {
																			let value = parseInt(e.target.value, 10) || 0;
																			this.handleModelParamsChange(model, 'years', value);
																		}} />
																	<div className="input-label">{'From date'}</div>
																	<input value={model.fakerParams.refDate || ''}
																		type="date"
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'refDate', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'recent' ?
																<div>
																	<div className="input-label">{'Number of days'}</div>
																	<input value={model.fakerParams.days || ''}
																		onChange={(e) => {
																			let value = parseInt(e.target.value, 10) || 0;
																			this.handleModelParamsChange(model, 'days', value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'amount' ?
																<div>
																	<div className="input-label">{'Min value'}</div>
																	<input value={model.fakerParams.min || ''}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'min', value);
																		}} />
																	<div className="input-label">{'Max value'}</div>
																	<input value={model.fakerParams.max || ''}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'max', value);
																		}} />
																	<div className="input-label">{'Decimal places'}</div>
																	<input value={model.fakerParams.dec || ''}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'dec', value);
																		}} />
																	<div className="input-label">{'Symbol'}</div>
																	<input value={model.fakerParams.symbol || ''}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'symbol', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'mask' ?
																<div>
																	<div className="input-label">{'Length of number'}</div>
																	<input value={model.fakerParams.length || ''}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'length', value);
																		}} />
																	<div className="input-label">{'Wrap in parenthesis?'}</div>
																	<select value={model.fakerParams.parens}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'parens', e.target.value === 'true');
																		}}>
																		<option value={false}>{'No'}</option>
																		<option value={true}>{'Yes'}</option>
																	</select>
																	<div className="input-label">{'Include an ellipsis?'}</div>
																	<select value={model.fakerParams.ellipsis}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'ellipsis', e.target.value === 'true');
																		}}>
																		<option value={false}>{'No'}</option>
																		<option value={true}>{'Yes'}</option>
																	</select>
																</div>
																: null
															}
															{model.fakerCategory === 'image' && model.fakerSubCategory !== 'avatar' ?
																<div>
																	<div className="input-label">{'Width'}</div>
																	<input value={model.fakerParams.width || ''}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'width', value);
																		}} />
																	<div className="input-label">{'Height'}</div>
																	<input value={model.fakerParams.height || ''}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'height', value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'email' ?
																<div>
																	<div className="input-label">{'First name'}</div>
																	<input value={model.fakerParams.firstName || ''}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'firstName', e.target.value);
																		}} />
																	<div className="input-label">{'Last name'}</div>
																	<input value={model.fakerParams.lastName || ''}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'lastName', e.target.value);
																		}} />
																	<div className="input-label">{'Provider'}</div>
																	<input value={model.fakerParams.provider || ''}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'provider', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'exampleEmail' ?
																<div>
																	<div className="input-label">{'First name'}</div>
																	<input value={model.fakerParams.firstName || ''}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'firstName', e.target.value);
																		}} />
																	<div className="input-label">{'Last name'}</div>
																	<input value={model.fakerParams.lastName || ''}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'lastName', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'password' ?
																<div>
																	<div className="input-label">{'Length of password'}</div>
																	<input value={model.fakerParams.length || ''}
																		onChange={(e) => {
																			let value = parseInt(e.target.value, 10) || 0;
																			this.handleModelParamsChange(model, 'length', value);
																		}} />
																	<div className="input-label">{'Memorable password?'}</div>
																	<select value={model.fakerParams.memorable}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'memorable', e.target.value === 'true');
																		}}>
																		<option value={false}>{'No'}</option>
																		<option value={true}>{'Yes'}</option>
																	</select>
																</div>
																: null
															}
															{model.fakerSubCategory === 'userName' ?
																<div>
																	<div className="input-label">{'First name'}</div>
																	<input value={model.fakerParams.firstName || ''}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'firstName', e.target.value);
																		}} />
																	<div className="input-label">{'Last name'}</div>
																	<input value={model.fakerParams.lastName || ''}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'lastName', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'lines' ?
																<div>
																	<div className="input-label">{'Number of lines'}</div>
																	<input value={model.fakerParams.lines || ''}
																		onChange={(e) => {
																			let value = parseInt(e.target.value, 10) || 0;
																			this.handleModelParamsChange(model, 'lines', value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'paragraphs' ?
																<div>
																	<div className="input-label">{'Number of paragraphs'}</div>
																	<input value={model.fakerParams.paragraphCount || ''}
																		onChange={(e) => {
																			let value = parseInt(e.target.value, 10) || 0;
																			this.handleModelParamsChange(model, 'paragraphCount', value);
																		}} />
																	<div className="input-label">{'Separator'}</div>
																	<input value={model.fakerParams.seperator || ''}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'seperator', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'sentence' ?
																<div>
																	<div className="input-label">{'Number of words'}</div>
																	<input value={model.fakerParams.wordCount || ''}
																		onChange={(e) => {
																			let value = parseInt(e.target.value, 10) || 0;
																			this.handleModelParamsChange(model, 'wordCount', value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'sentences' ?
																<div>
																	<div className="input-label">{'Number of sentences'}</div>
																	<input value={model.fakerParams.sentenceCount || ''}
																		onChange={(e) => {
																			let value = parseInt(e.target.value, 10) || 0;
																			this.handleModelParamsChange(model, 'sentenceCount', value);
																		}} />
																	<div className="input-label">{'Separator'}</div>
																	<input value={model.fakerParams.seperator || ''}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'seperator', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'text' ?
																<div>
																	<div className="input-label">{'Number of times'}</div>
																	<input value={model.fakerParams.times || ''}
																		onChange={(e) => {
																			let value = parseInt(e.target.value, 10) || 0;
																			this.handleModelParamsChange(model, 'times', value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'words' ?
																<div>
																	<div className="input-label">{'Number of words'}</div>
																	<input value={model.fakerParams.words || ''}
																		onChange={(e) => {
																			let value = parseInt(e.target.value, 10) || 0;
																			this.handleModelParamsChange(model, 'words', value);
																		}} />
																</div>
																: null
															}
															{model.fakerSubCategory === 'firstName' ||
																model.fakerSubCategory === 'lastName' ||
																model.fakerSubCategory === 'prefix' ?
																<div>
																	<div className="input-label">{'Gender'}</div>
																	<select value={model.gender}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'gender', e.target.value);
																		}}>
																		<option value={''}>
																			{'Either'}
																		</option>
																		<option value={'male'}>
																			{'Male'}
																		</option>
																		<option value={'female'}>
																			{'Female'}
																		</option>
																	</select>
																</div>
																: null
															}
															{model.fakerSubCategory === 'arrayElement' ?
																<div>
																	<div className="input-label">{'Array'}</div>
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
																			onChange={(value) => {
																				this.handleModelParamsChange(model, 'json', value);
																			}}
																			value={model.fakerParams.json}
																			name={`model-${i}`}
																		/>
																	</div>
																</div>
																: null
															}
															{model.fakerSubCategory === 'objectElement' ?
																<div>
																	<div className="input-label">{'Object'}</div>
																	<textarea value={model.fakerParams.json}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'json', e.target.value);
																		}}>
																	</textarea>
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
										: null
									}
								</div>
								<div className="flex-1 flex flex-vertical">
									<div className="flex-0 input-label">{'Required?'}</div>
									<select value={model.required}
										onChange={(e) => {
											this.handleModelChange(model, 'required', e.target.value === 'true');
										}}>
										<option value={false}>{'No'}</option>
										<option value={true}>{'Yes'}</option>
									</select>
									<div className="input-label flex-0">{'Documentation description'}</div>
									<textarea className="flex-1"
										value={model.documentation_description}
										onChange={(e) => {
											this.handleModelChange(model, 'documentation_description', e.target.value);
										}}>
									</textarea>
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
