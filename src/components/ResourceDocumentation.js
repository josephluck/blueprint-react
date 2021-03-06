import React, {Component} from 'react';
import Highlight from 'react-highlight';
import ResourceUtils from '../../backend/ResourceUtils.js';

class ResourceDocumentation extends Component {
	constructor(props) {
		super(props);
	}

	truncateArrayOfRecords(records) {
		return records.slice(0, 2);
	}

	getSingleRecordFromResponse(model) {
		if (this.props.resource.type === 'array') {
			return model[0];
		}
		return model;
	}

	getRequestExample(models) {
		return ResourceUtils.generateModel(models);
	}

	getModelParameterType(parameter) {
		return typeof (ResourceUtils.generatePropertyValue(parameter));
	}

	getModelParameterConstraints(parameter) {
		let constraints = parameter.required ? 'Required ' : 'Optional ';
		let validation = ResourceUtils.getSingleRequestParameterValidationRequirements(parameter);

		constraints = constraints + this.getModelParameterType(parameter) + '. ';

		if (validation.numericality) {
			constraints = constraints + 'Must be a number. ';
		}
		if (validation.email) {
			constraints = constraints + 'Must be a valid e-mail address. ';
		}
		if (validation.datetime) {
			constraints = constraints + 'Must be a valid date';
			if (validation.datetime.earliest && validation.datetime.latest) {
				constraints = constraints + ` between ${validation.datetime.earliest} and ${validation.datetime.latest}. `;
			} else if (validation.datetime.earliest) {
				constraints = constraints + ` later than ${validation.datetime.earliest}. `;
			} else if (validation.datetime.latest) {
				constraints = constraints + ` before ${validation.datetime.latest}. `;
			} else {
				constraints = constraints + '. ';
			}
		}
		if (validation.inclusion) {
			constraints = constraints + 'Must be a valid list item. ';
		}
		if (validation.boolean) {
			constraints = constraints + 'Must be either true or false. ';
		}

		return constraints;
	}

	render() {
		let requestExample = this.getRequestExample(this.props.resource.model);
		let responseExample = requestExample;

		return (
			<div className="flex">
				<div className="flex-1 overflow-hidden flex-column">
					{this.props.resource.supportedMethods.post ?
						<div className="flex-1 flex">
							<div className="flex-1 pb6">
								<div className="section-title">
									{`Create ${this.props.resource.name}`}
								</div>
								<div className="pa3">
									<div>
										{this.props.resource.model.map((parameter, i) => {
											return (
												<div key={i}
													className="flex flex-1 mb3">
													<div className="flex-2 overflow-hidden tr">
														<div className="ww-break-word monospace mb3">
															{parameter.key}
														</div>
													</div>
													<div className="flex-3 ml3">
														{this.getModelParameterConstraints(parameter)}
														{" "}
														{parameter.documentationDescription}
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
							<div className="flex-1 overflow-hidden documentation-code-examples pb6">
								<div className="section-title invisible">
									{`Create ${this.props.resource.name}`}
								</div>
								<div className="pa3">
									<div className="pb2">
										{"Request method & url"}
									</div>
									<div className="mb3">
										<code>
											{`POST /${this.props.resource.name}`}
										</code>
									</div>

									<div className="pb2">
										{"Request body"}
									</div>
									<div className="mb3">
										<Highlight className="javascript">
											{JSON.stringify(requestExample, null, 2)}
										</Highlight>
									</div>

									<div className="pb2">
										{"Response body"}
									</div>
									<div className="mb3">
										<Highlight className="javascript">
											{JSON.stringify(responseExample, null, 2)}
										</Highlight>
									</div>
								</div>
							</div>
						</div>
						: null
					}
				</div>
			</div>
		);
	}
}

ResourceDocumentation.propTypes = {
	resource: React.PropTypes.object,
	resources: React.PropTypes.array
};

export default ResourceDocumentation;
