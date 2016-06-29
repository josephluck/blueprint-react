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
			return this.props.resource.model[indicie].toJS();
		});

		let child_resource = models[models.length - 1];
		this.setState({
			child_models: models,
			child_resource: child_resource
		});
	}

	saveValue(name, value) {
		this.state.resource[name] = value;
		this.updateCurrentlyEditingResource();
	}

	handleModelChange(model, name, value) {
		model[name] = value;
		this.updateCurrentlyEditingResource();
	}

	handleSelectedChildResource(model, resource_name) {
		let resource = this.props.resources.find((resource) => {
			return resource.name === resource_name
		});

		model.child_resource_name = resource.name;
		model.child_resource_type = resource.type;
		this.updateCurrentlyEditingResource();
	}

	handleModelParamsChange(model, name, value) {
		model.params[name] = value;
		this.updateCurrentlyEditingResource();
	}

	addAnotherKey() {
		this.state.child_resource.resource.model.unshift({
			type: "predefined",
			params: {}
		});
		this.updateCurrentlyEditingResource();
	}

	removeModelKey(model, index) {
		this.state.child_resource.resource.model.splice(index, 1);
		this.updateCurrentlyEditingResource();
	}

	updateCurrentlyEditingResource() {
		var indicies = this.props.params.splat.split('/').map(Number);


		// var model_to_replace = this.state.resource;
		// for (var i = 0, x = indicies.length; i < x; i++) {
		// 	model_to_replace = model_to_replace.model[indicies[i]];
		// }
		// model_to_replace is not property refering to this.state.resource

		// This'll only support one nested model
		this.state.resource.model[indicies[0]] = this.state.child_resource;
		ResourceStore.updateCurrentlyEditingResource(this.state.resource);

		this.forceUpdate();
	}

	persistEditedResourceToResource() {
		ResourceStore.persistEditedResourceToResource(this.state.resource);
	}

/*=============================================================================
	Render office tasks
=============================================================================*/
	render() {
		console.log(this.state.child_resource);
		return (
			<div className="modal flex flex-vertical">
				<div className="flex-1 overflow-auto">
					<div className="section-title with-top-border flex">
						<span className="flex-1">
							{`${this.state.child_resource.key} model description`}
						</span>
						<Link className="large-right-margin"
							to={`/${this.props.resource.name}`}
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
						<div className="box without-bottom-padding">
							{this.state.child_resource.resource.model.map((model, i) => {
								return (
									<div key={i}
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
													if (e.target.value === 'resource') {
														model.child_resource = {};
													} else {
														model.child_resource === undefined;
													}
													this.handleModelChange(model, 'type', e.target.value);
												}}>
												<option value={"random"}>
													{"Random"}
												</option>
												<option value={"predefined"}>
													{"Pre-defined"}
												</option>
												<option value={"child_resource"}>
													{"From another resource"}
												</option>
												<option value={"object"}>
													{"Object / array of objects"}
												</option>
											</select>

											{model.type === 'child_resource' ?
												<div>
													<div className="input-label">{"Resource"}</div>
													<select defaultValue={"pleasechoose"}
														value={model.child_resource_name}
														onChange={(e) => {
															this.handleSelectedChildResource(model, e.target.value);
														}}>
														<option disabled value="pleasechoose">{"Please choose"}</option>
														{this.props.resources.map((resource, i) => {
															if (resource.id !== this.props.resource.id) {
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
															<select defaultValue={"pleasechoose"}
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

											{model.type === 'random' ?
												<div>
													<div className="input-label">{"Random category"}</div>
													<select defaultValue={"pleasechoose"}
														value={model.faker_category}
														onChange={(e) => {
															this.handleModelChange(model, 'faker_category', e.target.value);
														}}>
														<option disabled value="pleasechoose">{"Please choose"}</option>
														{this.state.faker_categories.map((category, i) => {
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
															<select defaultValue={"pleasechoose"}
																value={model.faker_type}
																onChange={(e) => {
																	this.handleModelChange(model, 'faker_type', e.target.value);
																}}>
																<option disabled value="pleasechoose">{"Please choose"}</option>
																{this.state.faker_sub_categories[model.faker_category].map((type, i) => {
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
																					this.handleModelChange(model, 'gender', e.target.value);
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