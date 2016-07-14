import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

import FakerCategories from 'data/FakerCategories';
import FakerSubCategories from 'data/FakerSubCategories';
import Faker from 'faker';
import brace from 'brace';
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
		return this.props.resource !== props.resource
	}

	componentWillReceiveProps(props) {
		if (this.props.resource !== props.resource) {
			this.state.resource = props.resource;
		}
	}

	addAnotherKey() {
		this.state.resource.model.unshift({
	  	uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
	      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	      return v.toString(16);
	  	}),
	  	type: "predefined",
	  	faker_subcategory: "",
	  	faker_category: "",
	  	faker_params: {},
	  	resource: {},
			predefined_type: "string",
			predefined_value: "",
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
		this.state.resource.supported_methods.set(name, !this.state.resource.supported_methods[name]);
	}

	handleModelChange(model, name, value) {
		model.set(name, value);
	}

	handleModelTypeChanged(model, type) {
		if (type === 'resource') {
			model.set("child_resource", {});
		} else {
			model.set("child_resource", undefined);
		}
		if (type === 'object') {
			model.resource.reset({
				type: "array",
				length: 5,
				model: [
					{
				  	uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
				      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				      return v.toString(16);
				  	}),
				  	type: "predefined",
				  	faker_subcategory: "",
				  	faker_category: "",
				  	faker_params: {},
				  	resource: {},
						predefined_type: "string",
						predefined_value: "",
						required: false
					}
				]
			});
		} else {
			model.set("resource", undefined);
		}
	}

	handleRandomCategoryChanged(model, value) {
		model.set({
			faker_category: value,
			faker_subcategory: "",
			faker_params: {}
		});
	}

	// Consider storing this in faker subcategories json instead of here
	// that way the params could be mapped over as an object in this component
	// based on the subcategory which will make this component more dynamically
	// generated and not hard-coded and would provide a great foundation for
	// including more random generation libraries
	resetRandomParams(model, faker_category) {
		let params = {};
		if (faker_category === "state") {
			params = {
				useAbbr: null
			};
		} else if (faker_category === "streetAddress") {
			params = {
				useFullAddress: null
			}
		} else if (faker_category === "zipCode") {
			params = {
				format: null
			}
		} else if (faker_category === "department") {
			params = {
				max: null,
				fixedAmount: null
			}
		} else if (faker_category === "price") {
			params = {
				min: null,
				max: null,
				dec: null,
				symbol: null
			}
		} else if (faker_category === "companyName") {
			params = {
				format: null
			}
		} else if (faker_category === "between") {
			params = {
				from: null,
				to: null
			}
		} else if (faker_category === "future") {
			params = {
				years: null,
				refDate: null
			}
		} else if (faker_category === "month") {
			params = {
				options: null
			}
		} else if (faker_category === "past") {
			params = {
				years: null,
				refDate: null
			}
		} else if (faker_category === "recent") {
			params = {
				days: null
			}
		} else if (faker_category === "weekday") {
			params = {
				options: null
			}
		} else if (faker_category === "account") {
			params = {
				length: null
			}
		} else if (faker_category === "amount") {
			params = {
				min: null,
				max: null,
				dec: null,
				symbol: null
			}
		} else if (faker_category === "mask") {
			params = {
				length: null,
				parens: null,
				elipsis: null
			}
		} else if (faker_category === "abstract" ||
			faker_category === "animals" ||
			faker_category === "business" ||
			faker_category === "cats" ||
			faker_category === "city" ||
			faker_category === "fashion" ||
			faker_category === "food" ||
			faker_category === "image" ||
			faker_category === "nature" ||
			faker_category === "nightlife" ||
			faker_category === "people" ||
			faker_category === "sports" ||
			faker_category === "technics" ||
			faker_category === "transport") {
			params = {
				width: null,
				height: null
			}
		} else if (faker_category === "color") {
			params = {
				baseRed255: null,
				baseGreen255: null,
				baseBlue255: null
			}
		} else if (faker_category === "email") {
			params = {
				firstName: null,
				lastName: null,
				provider: null
			}
		} else if (faker_category === "exampleEmail") {
			params = {
				firstName: null,
				lastName: null
			}
		} else if (faker_category === "password") {
			params = {
				len: null,
				memorable: null,
				pattern: null,
				prefix: null
			}
		} else if (faker_category === "userName") {
			params = {
				firstName: null,
				lastName: null
			}
		} else if (faker_category === "lines") {
			params = {
				lineCount: null
			}
		} else if (faker_category === "paragraph") {
			params = {
				sentenceCount: null
			}
		} else if (faker_category === "paragraphs") {
			params = {
				paragraphCount: null,
				separatora: null
			}
		} else if (faker_category === "sentence") {
			params = {
				wordCount: null,
				range: null
			}
		} else if (faker_category === "sentences") {
			params = {
				sentenceCount: null,
				separatora: null
			}
		} else if (faker_category === "text") {
			params = {
				times: null
			}
		} else if (faker_category === "word") {
			params = {
				num: null
			}
		} else if (faker_category === "words") {
			params = {
				num: null
			}
		} else if (faker_category === "findName") {
			params = {
				firstName: null,
				lastName: null,
				gender: null
			}
		} else if (faker_category === "firstName") {
			params = {
				gender: null
			}
		} else if (faker_category === "lastName") {
			params = {
				gender: null
			}
		} else if (faker_category === "prefix") {
			params = {
				gender: null
			}
		} else if (faker_category === "phoneFormatsArrayIndex") {
			params = {
				phoneFormatsArrayIndex: null
			}
		} else if (faker_category === "phoneNumber") {
			params = {
				format: null
			}
		} else if (faker_category === "arrayElement") {
			params = {
				array: null
			}
		} else if (faker_category === "number") {
			params = {
				options: null
			}
		} else if (faker_category === "objectElement") {
			params = {
				object: null,
				field: null
			}
		} else if (faker_category === "word") {
			params = {
				type: null
			}
		} else if (faker_category === "words") {
			params = {
				count: null
			}
		} else if (faker_category === "commonFileExt") {
			params = {
				type: null
			}
		} else if (faker_category === "commonFileName") {
			params = {
				ext: null,
				type: null
			}
		} else if (faker_category === "fileExt") {
			params = {
				mimeType: null
			}
		} else if (faker_category === "fileName") {
			params = {
				ext: null,
				type: null
			}
		}

		model.faker_params.reset(params);
	}

	handleModelPredefinedTypeChange(model, type) {
		model.reset({
			predefined_value: ""
		});
	}

	handleSelectedChildResource(model, resource_name) {
		let resource = this.state.resources.find((resource) => {
			return resource.name === resource_name
		});

		model.set("child_resource_name", resource.name);
		model.set("child_resource_type", resource.type);
	}

	handleModelParamsChange(model, name, value) {
		model.faker_params.set(name, value);
	}

	render() {
		return (
			<div className="flex-1 overflow-auto">
				<div className="flex box without-bottom-padding">
					<div className="flex-1">
						{this.props.nested === false ?
							<div>
								<div className="input-label">{"Name"}</div>
								<input value={this.state.resource.name}
									onChange={(e) => {
										var value = e.target.value.replace(/\W+/g, " ").replace(/ /g,"_");
										this.saveValue('name', value);
									}}>
								</input>
							</div>
							: null
						}
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
					{!this.props.nested ?
						<div className="flex-2 flex">
							<div className="flex-1 flex flex-vertical large-left-margin">
								<div className="flex-0 input-label">{"Supported methods"}</div>
								<div className="flex-0 flex">
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supported_methods.get === true}
											onClick={(e) => {
												this.setResourceCRUD('get');
											}} />
										{"GET"}
									</label>
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supported_methods.post === true}
											onClick={(e) => {
												this.setResourceCRUD('post');
											}} />
										{"POST"}
									</label>
								</div>
								<div className="flex-0 flex">
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supported_methods.put === true}
											onClick={(e) => {
												this.setResourceCRUD('put');
											}} />
										{"PUT"}
									</label>
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supported_methods.delete === true}
											onClick={(e) => {
												this.setResourceCRUD('delete');
											}} />
										{"DELETE"}
									</label>
								</div>


								<div className="flex-0 input-label">{"Supported API utilities"}</div>
								<div className="flex-0 flex">
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supported_utils.filter === true}
											onClick={(e) => {
												this.setResourceCRUD('filter');
											}} />
										{"Filters"}
									</label>
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supported_utils.pagination === true}
											onClick={(e) => {
												this.setResourceCRUD('pagination');
											}} />
										{"Pagination"}
									</label>
								</div>
								<div className="flex-0 flex">
									<label className="flex-1 checkbox-wrap">
										<input type="checkbox"
											checked={this.state.resource.supported_utils.search === true}
											onClick={(e) => {
												this.setResourceCRUD('search');
											}} />
										{"Search"}
									</label>
								</div>
							</div>
							<div className="flex-1 flex flex-vertical large-left-margin">
								<div className="input-label flex-0">{"Documentation description"}</div>
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
						{`${this.state.resource.name || ""} model description`}
					</span>
					<a href=""
						onClick={(e) => {
							e.preventDefault();
							this.addAnotherKey();
						}}>
						{"Add another key"}
					</a>
				</div>
				{this.state.resource.model.map((model, i) => {
					return (
						<div className="box without-bottom-padding with-bottom-border">
							<div key={model.id || model.uuid}
								className="flex model-input-group">
								<div className="flex-1 large-right-margin">
									<div className="input-label flex">
										<span className="flex-1">{"Key name"}</span>
										<a href=""
											onClick={(e) => {
												e.preventDefault();
												this.removeModelKey(model, i);
											}}>
											{"Remove key"}
										</a>
									</div>
									<input value={model.key}
										onChange={(e) => {
											var value = e.target.value.replace(/\W+/g, " ").replace(/ /g,"_");
											this.handleModelChange(model, 'key', value);
										}} />
								</div>
								<div className="flex-1 overflow-hidden large-right-margin">
									<div className="input-label flex-1">
										<span className="flex-1">{"Type"}</span>
									</div>
									<select value={model.type}
										onChange={(e) => {
											this.handleModelChange(model, 'type', e.target.value);
											this.handleModelTypeChanged(model, e.target.value);
										}}>
										<option value={"predefined"}>
											{"Pre-defined"}
										</option>
										<option value={"child_resource"}>
											{"From another resource"}
										</option>
										<option value={"object"}>
											{"Object / array of objects"}
										</option>
										<option value={"random"}>
											{"Random"}
										</option>
									</select>

									{model.type === 'predefined' ?
										<div>
											<div className="input-label">{"Type"}</div>
											<select value={model.predefined_type}
												onChange={(e) => {
													this.handleModelChange(model, 'predefined_type', e.target.value);
													this.handleModelPredefinedTypeChange(model, e.target.value);
												}}>
												<option value="string">{"String"}</option>
												<option value="number">{"Number"}</option>
												<option value="boolean">{"Boolean"}</option>
												<option value="date">{"Date"}</option>
											</select>

											{model.predefined_type === 'string' ?
												<div>
													<div className="input-label">{"Value"}</div>
													<input value={model.predefined_value}
														onChange={(e) => {
															this.handleModelChange(model, 'predefined_value', e.target.value);
														}} />
												</div>
												:
												<div>
													{model.predefined_type === 'number' ?
														<div>
															<div className="input-label">{"Value"}</div>
															<input value={model.predefined_value}
																type="number"
																onChange={(e) => {
																	this.handleModelChange(model, 'predefined_value', e.target.value);
																}} />
														</div>
														:
														<div>
															{model.predefined_type === 'boolean' ?
																<div>
																	<div className="input-label">{"Value"}</div>
																	<select value={model.predefined_value}
																		onChange={(e) => {
																			this.handleModelChange(model, 'predefined_value', eval(e.target.value));
																		}}>
																		<option value={false}>{"False"}</option>
																		<option value={true}>{"True"}</option>
																	</select>
																</div>
																:
																<div>
																	{model.predefined_type === 'date' ?
																		<div>
																			<div className="input-label">{"Value"}</div>
																			<input value={model.predefined_value}
																				type="date"
																				onChange={(e) => {
																					this.handleModelChange(model, 'predefined_value', e.target.value);
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

									{model.type === 'child_resource' ?
										<div>
											<div className="input-label">{"Resource"}</div>
											<select value={"pleasechoose"}
												value={model.child_resource_name}
												onChange={(e) => {
													this.handleSelectedChildResource(model, e.target.value);
												}}>
												<option disabled value="pleasechoose">{"Please choose"}</option>
												{this.state.resources.map((resource, i) => {
													if (resource.id !== this.state.resource.id) {
														return (
															<option key={i}
																value={resource.name}>
																{resource.name}
															</option>
														)
													} else {
														return null
													}
												})}
											</select>

											{model.child_resource_type === 'array' ?
												<div>
													<div className="input-label">{"Method"}</div>
													<select value={"pleasechoose"}
														value={model.child_resource_method}
														onChange={(e) => {
															this.handleModelChange(model, 'child_resource_method', e.target.value);
														}}>
														<option disabled value="pleasechoose">{"Please choose"}</option>
														<option value="id">{"Randomly selected id from array"}</option>
														<option value="object">{"Randomly selected object from array"}</option>
														<option value="array">{"Subset from array"}</option>
													</select>
												</div>
												: null
											}

											{model.child_resource_method === 'array' ?
												<div>
													<div className="input-label">{"Limit (leave blank for entire array)"}</div>
													<input value={model.child_resource_limit}
														onChange={(e) => {
															this.handleModelChange(model, 'child_resource_limit', e.target.value);
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
											{"Configure"}
										</a>
										: null
									}

									{model.type === 'random' ?
										<div>
											<div className="input-label">{"Random category"}</div>
											<select value={"pleasechoose"}
												value={model.faker_category}
												onChange={(e) => {
													this.handleRandomCategoryChanged(model, e.target.value);
												}}>
												<option disabled value="pleasechoose">{"Please choose"}</option>
												{FakerCategories.map((category, i) => {
													return (
														<option key={i}
															value={category.value}>
															{category.name}
														</option>
													)
												})}
											</select>

											{model.faker_category ?
												<div>
													<div className="input-label">{"Random sub-category"}</div>
													<select value={"pleasechoose"}
														value={model.faker_subcategory}
														onChange={(e) => {
															this.handleModelChange(model, 'faker_subcategory', e.target.value);
															this.resetRandomParams(model, e.target.value);
														}}>
														<option disabled value="pleasechoose">{"Please choose"}</option>
														{FakerSubCategories[model.faker_category].map((type, i) => {
															return (
																<option key={i}
																	value={type.value}>
																	{type.name}
																</option>
															)
														})}
													</select>
													{model.faker_subcategory ?
														<div>
															{model.faker_subcategory === "streetAddress" ?
																<div>
																	<div className="input-label">{"Use full address"}</div>
																	<select value={model.faker_params.useFullAddress}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'useFullAddress', eval(e.target.value));
																		}}>
																		<option value={false}>{"No"}</option>
																		<option value={true}>{"Yes"}</option>
																	</select>
																</div>
																: null
															}
															{model.faker_subcategory === "price" ?
																<div>
																	<div className="input-label">{"Min value"}</div>
																	<input value={model.faker_params.min}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'min', value);
																		}} />
																	<div className="input-label">{"Max value"}</div>
																	<input value={model.faker_params.max}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'max', value);
																		}} />
																	<div className="input-label">{"Decimal places"}</div>
																	<input value={model.faker_params.dec}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'dec', value);
																		}} />
																	<div className="input-label">{"Symbol"}</div>
																	<input value={model.faker_params.symbol}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'symbol', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "between" ?
																<div>
																	<div className="input-label">{"From"}</div>
																	<input value={model.faker_params.from}
																		type="date"
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'from', e.target.value);
																		}} />
																	<div className="input-label">{"To"}</div>
																	<input value={model.faker_params.to}
																		type="date"
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'to', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "future" || model.faker_subcategory === "past" ?
																<div>
																	<div className="input-label">{"Number of years"}</div>
																	<input value={model.faker_params.years}
																		onChange={(e) => {
																			let value = parseInt(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'years', value);
																		}} />
																	<div className="input-label">{"From date"}</div>
																	<input value={model.faker_params.refDate}
																		type="date"
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'refDate', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "recent" ?
																<div>
																	<div className="input-label">{"Number of days"}</div>
																	<input value={model.faker_params.days}
																		onChange={(e) => {
																			let value = parseInt(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'days', value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "amount" ?
																<div>
																	<div className="input-label">{"Min value"}</div>
																	<input value={model.faker_params.min}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'min', value);
																		}} />
																	<div className="input-label">{"Max value"}</div>
																	<input value={model.faker_params.max}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'max', value);
																		}} />
																	<div className="input-label">{"Decimal places"}</div>
																	<input value={model.faker_params.dec}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'dec', value);
																		}} />
																	<div className="input-label">{"Symbol"}</div>
																	<input value={model.faker_params.symbol}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'symbol', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "mask" ?
																<div>
																	<div className="input-label">{"Length of number"}</div>
																	<input value={model.faker_params.length}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'length', value);
																		}} />
																	<div className="input-label">{"Wrap in parenthesis?"}</div>
																	<select value={model.faker_params.parens}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'parens', eval(e.target.value));
																		}}>
																		<option value={false}>{"No"}</option>
																		<option value={true}>{"Yes"}</option>
																	</select>
																	<div className="input-label">{"Include an ellipsis?"}</div>
																	<select value={model.faker_params.ellipsis}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'ellipsis', eval(e.target.value));
																		}}>
																		<option value={false}>{"No"}</option>
																		<option value={true}>{"Yes"}</option>
																	</select>
																</div>
																: null
															}
															{model.faker_category === "image" && model.faker_subcategory !== "avatar" ?
																<div>
																	<div className="input-label">{"Width"}</div>
																	<input value={model.faker_params.width}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'width', value);
																		}} />
																	<div className="input-label">{"Height"}</div>
																	<input value={model.faker_params.height}
																		onChange={(e) => {
																			let value = parseFloat(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'height', value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "email" ?
																<div>
																	<div className="input-label">{"First name"}</div>
																	<input value={model.faker_params.firstName}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'firstName', e.target.value);
																		}} />
																	<div className="input-label">{"Last name"}</div>
																	<input value={model.faker_params.lastName}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'lastName', e.target.value);
																		}} />
																	<div className="input-label">{"Provider"}</div>
																	<input value={model.faker_params.provider}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'provider', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "exampleEmail" ?
																<div>
																	<div className="input-label">{"First name"}</div>
																	<input value={model.faker_params.firstName}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'firstName', e.target.value);
																		}} />
																	<div className="input-label">{"Last name"}</div>
																	<input value={model.faker_params.lastName}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'lastName', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "password" ?
																<div>
																	<div className="input-label">{"Length of password"}</div>
																	<input value={model.faker_params.length}
																		onChange={(e) => {
																			let value = parseInt(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'length', value);
																		}} />
																	<div className="input-label">{"Memorable password?"}</div>
																	<select value={model.faker_params.memorable}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'memorable', eval(e.target.value));
																		}}>
																		<option value={false}>{"No"}</option>
																		<option value={true}>{"Yes"}</option>
																	</select>
																</div>
																: null
															}
															{model.faker_subcategory === "userName" ?
																<div>
																	<div className="input-label">{"First name"}</div>
																	<input value={model.faker_params.firstName}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'firstName', e.target.value);
																		}} />
																	<div className="input-label">{"Last name"}</div>
																	<input value={model.faker_params.lastName}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'lastName', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "lines" ?
																<div>
																	<div className="input-label">{"Number of lines"}</div>
																	<input value={model.faker_params.lines}
																		onChange={(e) => {
																			let value = parseInt(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'lines', value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "paragraphs" ?
																<div>
																	<div className="input-label">{"Number of paragraphs"}</div>
																	<input value={model.faker_params.paragraphCount}
																		onChange={(e) => {
																			let value = parseInt(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'paragraphCount', value);
																		}} />
																	<div className="input-label">{"Separator"}</div>
																	<input value={model.faker_params.seperator}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'seperator', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "sentence" ?
																<div>
																	<div className="input-label">{"Number of words"}</div>
																	<input value={model.faker_params.wordCount}
																		onChange={(e) => {
																			let value = parseInt(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'wordCount', value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "sentences" ?
																<div>
																	<div className="input-label">{"Number of sentences"}</div>
																	<input value={model.faker_params.sentenceCount}
																		onChange={(e) => {
																			let value = parseInt(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'sentenceCount', value);
																		}} />
																	<div className="input-label">{"Separator"}</div>
																	<input value={model.faker_params.seperator}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'seperator', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "text" ?
																<div>
																	<div className="input-label">{"Number of times"}</div>
																	<input value={model.faker_params.times}
																		onChange={(e) => {
																			let value = parseInt(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'times', value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "words" ?
																<div>
																	<div className="input-label">{"Number of words"}</div>
																	<input value={model.faker_params.words}
																		onChange={(e) => {
																			let value = parseInt(e.target.value) || 0;
																			this.handleModelParamsChange(model, 'words', value);
																		}} />
																</div>
																: null
															}
															{model.faker_subcategory === "firstName" || model.faker_subcategory === 'lastName' || model.faker_subcategory === 'prefix' ?
																<div>
																	<div className="input-label">{"Gender"}</div>
																	<select value={model.gender}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'gender', e.target.value);
																		}}>
																		<option value={""}>
																			{"Either"}
																		</option>
																		<option value={"male"}>
																			{"Male"}
																		</option>
																		<option value={"female"}>
																			{"Female"}
																		</option>
																	</select>
																</div>
																: null
															}
															{model.faker_subcategory === "arrayElement" ?
																<div>
																	<div className="input-label">{"Array"}</div>
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
																	    value={model.faker_params.json}
																	    name={`model-${i}`}
																	  />
																	</div>
																</div>
																: null
															}
															{model.faker_subcategory === "objectElement" ?
																<div>
																	<div className="input-label">{"Object"}</div>
																	<textarea value={model.faker_params.json}
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
									<div className="flex-0 input-label">{"Required?"}</div>
									<select value={model.required}
										onChange={(e) => {
											this.handleModelChange(model, 'required', eval(e.target.value));
										}}>
										<option value={false}>{"No"}</option>
										<option value={true}>{"Yes"}</option>
									</select>
									<div className="input-label flex-0">{"Documentation description"}</div>
									<textarea className="flex-1"
										value={model.documentation_description}
										onChange={(e) => {
											this.handleModelChange(model, 'documentation_description', e.target.value);
										}}>
									</textarea>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		)
		return null
	}
}

export default ResourceForm