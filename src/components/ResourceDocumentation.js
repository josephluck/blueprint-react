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

		responseExample.id = 1;

		return (
			<div className="flex">
				<div className="flex-1 overflow-hidden flex-vertical">
					{this.props.resource.supportedMethods.post ?
						<div className="flex-1 flex">
							<div className="flex-1 extra-large-bottom-padding border-bottom">
								<div className="section-title">
									{`Create ${this.props.resource.name}`}
								</div>
								<div className="box">
									<div>
										{this.props.resource.model.map((parameter, i) => {
											return (
												<div key={i}
													className="flex flex-1 large-bottom-margin">
													<div className="flex-2 overflow-hidden text-align-right">
														<div className="wrap-text monospace bottom-padding">
															{parameter.key}
														</div>
													</div>
													<div className="flex-3 large-left-margin">
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
							<div className="flex-1 overflow-hidden documentation-code-examples extra-large-bottom-padding">
								<div className="section-title invisible">
									{`Create ${this.props.resource.name}`}
								</div>
								<div className="box">
									<div className="bottom-margin">
										{"Request method & url"}
									</div>
									<div className="large-bottom-margin">
										<code>
											{`POST /${this.props.resource.name}`}
										</code>
									</div>

									<div className="bottom-margin">
										{"Request body"}
									</div>
									<div className="large-bottom-margin">
										<Highlight className="javascript">
											{JSON.stringify(requestExample, null, 2)}
										</Highlight>
									</div>

									<div className="bottom-margin">
										{"Response body"}
									</div>
									<div className="large-bottom-margin">
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
