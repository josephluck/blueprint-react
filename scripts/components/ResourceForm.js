import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

import FakerCategories from 'data/FakerCategories';
import FakerSubCategories from 'data/FakerSubCategories';
import Faker from 'faker';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/tomorrow';

class ResourceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resource: props.resource
		};
	}

	shouldComponentUpdate(props) {
		return this.props.resource !== props.resource
	}

	componentWillReceiveProps(props) {
		if (this.props.resource !== props.resource) {
			this.state.resource = props.resource;
			this.forceUpdate();
		}
	}

	addAnotherKey() {
		this.state.resource.model.unshift({
	  	uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
	      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	      return v.toString(16);
	  	}),
	  	type: "predefined",
	  	faker_type: "",
	  	faker_category: "",
	  	params: {},
	  	resource: {},
			predefined_type: "string",
			predefined_value: ""
		});
		this.forceUpdate();
	}

	removeModelKey(model, index) {
		this.state.resource.model.splice(index, 1);
		this.forceUpdate();
	}

	saveValue(name, value) {
		this.state.resource.set(name, value);
		this.forceUpdate();
	}

	handleModelChange(model, name, value) {
		model.set(name, value);
		this.forceUpdate();
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
				  	faker_type: "",
				  	faker_category: "",
				  	params: {},
				  	resource: {},
						predefined_type: "string",
						predefined_value: ""
					}
				]
			});
		} else {
			model.set("resource", undefined);
		}
		this.forceUpdate();
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
		this.forceUpdate();
	}

	handleModelParamsChange(model, name, value) {
		model.params.set(name, value);
		this.forceUpdate();
	}

	render() {
		return (
			<div className="flex-1 overflow-auto">
				<div className="flex box without-bottom-padding">
					<div className="flex-1 large-right-margin">
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
					<div className="flex-2">
						<div className="input-label">{"Supported methods"}</div>
						<label className="checkbox-wrap">
							<input type="checkbox" />
							{"GET"}
						</label>
						<label className="checkbox-wrap">
							<input type="checkbox" />
							{"POST"}
						</label>
						<label className="checkbox-wrap">
							<input type="checkbox" />
							{"PUT"}
						</label>
						<label className="checkbox-wrap">
							<input type="checkbox" />
							{"DELETE"}
						</label>
					</div>
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
				<div className="box without-bottom-padding">
					{this.state.resource.model.map((model, i) => {
						return (
							<div key={model.id || model.uuid}
								className="flex model-input-group">
								<div className="flex-1 large-right-margin">
									<div className="input-label">{"Key name"}</div>
									<input value={model.key}
										onChange={(e) => {
											var value = e.target.value.replace(/\W+/g, " ").replace(/ /g,"_");
											this.handleModelChange(model, 'key', value);
										}} />
								</div>
								<div className="flex-2 overflow-hidden">
									<div className="flex">
										<div className="input-label flex-1">
											<span className="flex-1">{"Type"}</span>
										</div>
										<a href=""
											className="--small"
											onClick={(e) => {
												e.preventDefault();
												this.removeModelKey(model, i);
											}}>
											{"Remove key"}
										</a>
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
																	<label className="checkbox-wrap">
																		<input value={model.predefined_value}
																			type="checkbox"
																			onChange={(e) => {
																				this.handleModelChange(model, 'predefined_value', e.target.value);
																			}} />
																		{"True / false"}
																	</label>
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
													this.handleModelChange(model, 'faker_category', e.target.value);
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
														value={model.faker_type}
														onChange={(e) => {
															this.handleModelChange(model, 'faker_type', e.target.value);
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
													{model.faker_type ?
														<div>
															{model.faker_type === "streetAddress" ?
																<label className="checkbox-wrap">
																	<input type="checkbox"
																		checked={model.params.useFullAddress === true}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'useFullAddress', e.target.checked);
																		}} />
																	{"Use full address?"} {model.params.useFullAddress}
																</label>
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
															{model.faker_type === "amount" ?
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
															{model.faker_type === "mask" ?
																<div>
																	<div className="input-label">{"Length of number"}</div>
																	<input value={model.params.length}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'length', e.target.value);
																		}} />
																	<div className="checkbox-wrap">
																		<input type="checkbox"
																			checked={model.params.parens === true}
																			onChange={(e) => {
																				this.handleModelParamsChange(model, 'parens', e.target.checked);
																			}} />
																		<span className="checkbox-label">{"Wrap in parenthesis?"}</span>
																	</div>
																	<div className="checkbox-wrap">
																		<input type="checkbox"
																			checked={model.params.ellipsis === true}
																			onChange={(e) => {
																				this.handleModelParamsChange(model, 'ellipsis', e.target.checked);
																			}} />
																		<span className="checkbox-label">{"Include an ellipsis?"}</span>
																	</div>
																</div>
																: null
															}
															{model.faker_category === "image" && model.faker_type !== "avatar" ?
																<div>
																	<div className="input-label">{"Width"}</div>
																	<input value={model.params.width}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'width', e.target.value);
																		}} />
																	<div className="input-label">{"Height"}</div>
																	<input value={model.params.height}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'height', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_type === "email" ?
																<div>
																	<div className="input-label">{"First name"}</div>
																	<input value={model.params.firstName}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'firstName', e.target.value);
																		}} />
																	<div className="input-label">{"Last name"}</div>
																	<input value={model.params.lastName}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'lastName', e.target.value);
																		}} />
																	<div className="input-label">{"Provider"}</div>
																	<input value={model.params.provider}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'provider', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_type === "exampleEmail" ?
																<div>
																	<div className="input-label">{"First name"}</div>
																	<input value={model.params.firstName}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'firstName', e.target.value);
																		}} />
																	<div className="input-label">{"Last name"}</div>
																	<input value={model.params.lastName}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'lastName', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_type === "password" ?
																<div>
																	<div className="input-label">{"Length of password"}</div>
																	<input value={model.params.length}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'length', e.target.value);
																		}} />
																	<div className="checkbox-wrap">
																		<input type="checkbox"
																			checked={model.params.memorable === true}
																			onChange={(e) => {
																				this.handleModelParamsChange(model, 'memorable', e.target.checked);
																			}} />
																		<span className="checkbox-label">{"Memorable password?"}</span>
																	</div>
																</div>
																: null
															}
															{model.faker_type === "userName" ?
																<div>
																	<div className="input-label">{"First name"}</div>
																	<input value={model.params.firstName}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'firstName', e.target.value);
																		}} />
																	<div className="input-label">{"Last name"}</div>
																	<input value={model.params.lastName}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'lastName', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_type === "lines" ?
																<div>
																	<div className="input-label">{"Number of lines"}</div>
																	<input value={model.params.lines}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'lines', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_type === "paragraphs" ?
																<div>
																	<div className="input-label">{"Number of paragraphs"}</div>
																	<input value={model.params.paragraphCount}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'paragraphCount', e.target.value);
																		}} />
																	<div className="input-label">{"Separator"}</div>
																	<input value={model.params.seperator}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'seperator', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_type === "sentence" ?
																<div>
																	<div className="input-label">{"Number of words"}</div>
																	<input value={model.params.wordCount}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'wordCount', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_type === "sentences" ?
																<div>
																	<div className="input-label">{"Number of sentences"}</div>
																	<input value={model.params.sentenceCount}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'sentenceCount', e.target.value);
																		}} />
																	<div className="input-label">{"Separator"}</div>
																	<input value={model.params.seperator}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'seperator', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_type === "text" ?
																<div>
																	<div className="input-label">{"Number of times"}</div>
																	<input value={model.params.times}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'times', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_type === "words" ?
																<div>
																	<div className="input-label">{"Number of words"}</div>
																	<input value={model.params.words}
																		onChange={(e) => {
																			this.handleModelParamsChange(model, 'words', e.target.value);
																		}} />
																</div>
																: null
															}
															{model.faker_type === "firstName" || model.faker_type === 'lastName' || model.faker_type === 'prefix' ?
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
															{model.faker_type === "arrayElement" ?
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
																	    value={model.params.json}
																	    name={`model-${i}`}
																	  />
																	</div>
																</div>
																: null
															}
															{model.faker_type === "objectElement" ?
																<div>
																	<div className="input-label">{"Object"}</div>
																	<textarea value={model.params.json}
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
							</div>
						)
					})}
				</div>
			</div>
		)
		return null
	}
}

export default ResourceForm
