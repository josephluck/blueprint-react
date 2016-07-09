import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';
import ResourceUtils from '../../resource_utils.js';

// Stores
import ResourcesStore from 'stores/ResourcesStore';

// Components
import Highlight from 'react-highlight'

class RightBar extends Component {
	constructor(props) {
		super(props);
	}

	toggleRightBar() {
		ResourcesStore.toggleRightBar();
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

/*=============================================================================
	Render right bar

	NOTE: Might be worth refactoring this so it doesn't generate resource
	on render -- check perf for large resources
=============================================================================*/
	render() {
		let example_response = {};

		if (Object.keys(this.props.resource.toJS()).length) {
			example_response = ResourceUtils.generateResource(this.props.resource.toJS(), this.props.resources.toJS());
		}

		var right_bar_class = "";

		if (this.props.right_bar_open === true) {
			right_bar_class = "--open"
		}

		return (
			<div className={`right-bar flex flex-vertical ${right_bar_class}`}>
				<div className="section-title flex flex-0">
					<span className="flex-1">
						{`Documentation examples for ${this.props.resource.name}`}
					</span>
					<a href=""
						onClick={(e) => {
							e.preventDefault();
						}}>
						{"Open full documentation"}
					</a>
					<a className="large-left-margin"
						href=""
						onClick={(e) => {
							e.preventDefault();
							this.toggleRightBar();
						}}>
						{"Close examples"}
					</a>
				</div>
				<div className={`flex-1 overflow-auto`}>
					<div className="box with-bottom-border">
						{this.props.resource.documentation_description}
					</div>
					{this.props.resource.supported_methods.get ?
						<div>
							<div className="section-title">
								{`Get a list of ${this.props.resource.name}`}
							</div>
							<div className="box flex with-bottom-border">
								<div className="flex-1">
									<div className="input-label">
										{"Method"}
									</div>
									<code className="large-bottom-margin">
										{"GET"}
									</code>
									<div className="input-label">
										{"Request URL"}
									</div>
									<code className="large-bottom-margin">
										{`/${this.props.resource.name}`}
									</code>
								</div>
								<div className="flex-1">
									<div className="input-label">
										{"Example response"}
									</div>
									<Highlight className="javascript">
									  {JSON.stringify(this.truncateArrayOfRecords(example_response), null, 2)}
									</Highlight>
								</div>
							</div>
							<div className="section-title">
								{`Get a single ${this.props.resource.name}`}
							</div>
							<div className="box flex with-bottom-border">
								<div className="flex-1">
									<div className="input-label">
										{"Method"}
									</div>
									<code className="large-bottom-margin">
										{"GET"}
									</code>
									<div className="input-label">
										{"Request URL"}
									</div>
									<code className="large-bottom-margin">
										{`/${this.props.resource.name}/:id`}
									</code>
								</div>
								<div className="flex-1">
									<div className="input-label">
										{"Example response"}
									</div>
									<Highlight className="javascript">
									  {JSON.stringify(this.getSingleRecordFromResponse(example_response), null, 2)}
									</Highlight>
								</div>
							</div>
						</div>
						: null
					}
					{this.props.resource.supported_methods.post ?
						<div>
							<div className="section-title">
								{`Create a ${this.props.resource.name}`}
							</div>
							<div className="box flex with-bottom-border">
								<div className="flex-1">
									<div className="input-label">
										{"Method"}
									</div>
									<code className="large-bottom-margin">
										{"POST"}
									</code>
									<div className="input-label">
										{"Request URL"}
									</div>
									<code className="large-bottom-margin">
										{`/${this.props.resource.name}`}
									</code>

									<div className="input-label">
										{"Arguments"}
									</div>
									{this.props.resource.model.map((model, i) => {
										return (
											<div className="large-bottom-margin flex">
												<code key={i}
													className="flex-1">
													{model.key}
												</code>
												<p className="flex-1">
													{model.documentation_description}
												</p>
											</div>
										)
									})}
								</div>
								<div className="flex-1">
									<div className="input-label">
										{"Example request"}
									</div>
									<div className="large-bottom-margin">
										<Highlight className="javascript">
										  {JSON.stringify(this.getSingleRecordFromResponse(example_response), null, 2)}
										</Highlight>
									</div>
									<div className="input-label">
										{"Example response"}
									</div>
									<div className="large-bottom-margin">
										<Highlight className="javascript">
										  {JSON.stringify(this.getSingleRecordFromResponse(example_response), null, 2)}
										</Highlight>
									</div>
								</div>
							</div>
						</div>
						: null
					}
					{this.props.resource.supported_methods.put ?
						<div>
							<div className="section-title">
								{"PUT"}
							</div>
							<div className="box with-bottom-border">
								<Highlight className="javascript">
								  {JSON.stringify(example_response, null, 2)}
								</Highlight>
							</div>
						</div>
						: null
					}
					{this.props.resource.supported_methods.delete ?
						<div>
							<div className="section-title">
								{"DELETE"}
							</div>
							<div className="box with-bottom-border">
								<Highlight className="javascript">
								  {JSON.stringify(example_response, null, 2)}
								</Highlight>
							</div>
						</div>
						: null
					}
				</div>
			</div>
		)
	}
}

export default Provide(RightBar, [
	'resources',
	'resource',
	'right_bar_open'
])