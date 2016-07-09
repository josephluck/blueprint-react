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

	render() {
		let example_response = {};

		if (Object.keys(this.props.resource).length) {
			example_response = ResourceUtils.generateResource(this.props.resource, this.props.resources);
		}

		let response_example = this.getSingleRecordFromResponse(example_response);
		let request_example = this.getRequestExample(this.props.resource.model);
		return (
			<div>
				<div className="box with-bottom-border">
					{this.props.resource.documentation_description}
				</div>
				{this.props.resource.supported_methods.post ?
					<div>
						<div className="section-title">
							{`Create ${this.props.resource.name}`}
						</div>
						<div className="box flex with-bottom-border">
							<div className="flex-1">
								<div className="input-label">
									{"Method & url"}
								</div>
								<code className="large-bottom-margin">
									{`POST /${this.props.resource.name}`}
								</code>

								<div className="input-label">
									{"Arguments"}
								</div>
								{this.props.resource.model.map((model, i) => {
									let box_class = "";
									if (i === 0) {
										box_class = "with-top-border";
									}

									let model_type = typeof(response_example[model.key]);
									if (model_type === "object") {
										// Check it's a date
										if (response_example[model.key] instanceof Date) {
											model_type = "date";
										}
									}

									return (
										<div className={`box flex ${box_class}`}>
											<div className="flex-1 text-align-right">
												<div className="bottom-margin">{model.key}</div>
												<small className="bottom-margin">
													{model.required ?
														"required " : "optional "
													}
													{model_type}
												</small>
											</div>
											<div className="flex-2 large-left-margin">
												{model.documentation_description}
											</div>
										</div>
									)
								})}
							</div>
							<div className="flex-1 large-left-margin overflow-hidden">
								<div className="input-label">
									{"Example request"}
								</div>
								<div className="large-bottom-margin">
									<Highlight className="javascript">
									  {JSON.stringify(request_example, null, 2)}
									</Highlight>
								</div>
								<div className="input-label">
									{"Example response"}
								</div>
								<div className="large-bottom-margin">
									<Highlight className="javascript">
									  {JSON.stringify(response_example, null, 2)}
									</Highlight>
								</div>
							</div>
						</div>
					</div>
					: null
				}
			</div>
		)
	}
}

export default ResourceDocumentation;
