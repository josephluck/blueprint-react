import React, {Component} from 'react';
import Highlight from 'react-highlight';
import ResourceUtils from '../../resource_utils.js';

class ResourceDocumentation extends Component {
	constructor(props) {
		super(props);
	}

	truncateArrayOfRecords(records) {
		return records.slice(0, 2);
	}

	getSingleRecordFromResponse(model) {
		if (this.props.resource.type === "array") {
			return model[0];
		} else {
			return model;
		}
	}

	getRequestExample(models) {
		return ResourceUtils.generateModel(models);
	}

	getModelParameterType(parameter) {
		return typeof(ResourceUtils.generatePropertyValue(parameter));
	}

	render() {
		let example_response = {};

		if (Object.keys(this.props.resource).length) {
			example_response = ResourceUtils.generateResource(this.props.resource, this.props.resources);
		}

		let response_example = this.getSingleRecordFromResponse(example_response);
		let request_example = this.getRequestExample(this.props.resource.model);
		return (
			<div>
				<div className="flex">
					<div className="box documentation-left-nav">
						{this.props.resource.supported_methods.get ?
							<div>{"Get a list of users"}</div>
							: null
						}
						{this.props.resource.supported_methods.get ?
							<div>{"Get an individual user"}</div>
							: null
						}
					</div>
					<div className="flex-1 flex-vertical">
						{this.props.resource.supported_methods.post ?
							<div className="flex-1 flex">
								<div className="box extra-large-bottom-padding">
									<div className="border-bottom bottom-padding bottom-margin">
										{"Parameters"}
									</div>
									<div>
										{this.props.resource.model.map((parameter, i) => {
											return (
												<div className="flex flex-1 large-bottom-margin">
													<div className="flex-1">
														<div>
															{parameter.key}
														</div>
														<small>
															{parameter.required ?
																"required " : "optional "
															}
															{this.getModelParameterType(parameter)}
														</small>
													</div>
													<div className="flex-2">
														{parameter.documentation_description}
													</div>
												</div>
											)
										})}
									</div>
								</div>
								<div className="flex-1 documentation-code-examples box extra-large-bottom-padding">
									<div className="bottom-margin">
										{"Request example"}
									</div>
									<div className="large-bottom-margin">
										<Highlight className="javascript">
										  {JSON.stringify(request_example, null, 2)}
										</Highlight>
									</div>

									<div className="bottom-margin">
										{"Response example"}
									</div>
									<div className="large-bottom-margin">
										<Highlight className="javascript">
										  {JSON.stringify(response_example, null, 2)}
										</Highlight>
									</div>
								</div>
							</div>
							: null
						}
						{this.props.resource.supported_methods.post ?
							<div className="flex-1 flex">
								<div className="box extra-large-bottom-padding">
									<div className="border-bottom bottom-padding bottom-margin">
										{"Parameters"}
									</div>
									<div>
										{this.props.resource.model.map((parameter, i) => {
											return (
												<div className="flex flex-1 large-bottom-margin">
													<div className="flex-1">
														<div>
															{parameter.key}
														</div>
														<small>
															{parameter.required ?
																"required " : "optional "
															}
															{this.getModelParameterType(parameter)}
														</small>
													</div>
													<div className="flex-2">
														{parameter.documentation_description}
													</div>
												</div>
											)
										})}
									</div>
								</div>
								<div className="flex-1 documentation-code-examples box extra-large-bottom-padding">
									<div className="bottom-margin">
										{"Request example"}
									</div>
									<div className="large-bottom-margin">
										<Highlight className="javascript">
										  {JSON.stringify(request_example, null, 2)}
										</Highlight>
									</div>

									<div className="bottom-margin">
										{"Response example"}
									</div>
									<div className="large-bottom-margin">
										<Highlight className="javascript">
										  {JSON.stringify(response_example, null, 2)}
										</Highlight>
									</div>
								</div>
							</div>
							: null
						}
					</div>
				</div>
			</div>
		)
	}
}

export default ResourceDocumentation;
