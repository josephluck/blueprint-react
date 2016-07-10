import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';

// Stores
import ResourcesStore from 'stores/ResourcesStore';

// Components
import ResourceDocumentation from 'components/ResourceDocumentation';

class RightBar extends Component {
	constructor(props) {
		super(props);
	}

	toggleRightBar() {
		ResourcesStore.toggleRightBar();
	}

	shouldComponentUpdate(props) {
		return props.right_bar_open !== this.props.right_bar_open;
	}

/*=============================================================================
	Render right bar

	NOTE: Might be worth refactoring this so it doesn't generate resource
	on render -- check perf for large resources
=============================================================================*/
	render() {
		var right_bar_class = "";

		if (this.props.right_bar_open === true) {
			right_bar_class = "--open"
		}

		return (
			<div className={`right-bar flex ${right_bar_class}`}>
				<div className="documentation-left-nav flex flex-vertical">
					<div className="section-title flex flex-0">
						<span className="flex-1">
							{"Documentaton"}
						</span>
						<a className="large-left-margin"
							href=""
							onClick={(e) => {
								e.preventDefault();
								this.toggleRightBar();
							}}>
							{"Close"}
						</a>
					</div>
					<div className="flex flex-vertical">
						<div className="flex-1 overflow-auto">
							<div className="list-item">
								<div>{`Create ${this.props.resource.name}`}</div>
							</div>
						</div>
					</div>
					<div className="list flex flex-0">
						<div className="list-item with-bottom-padding flex text-align-center">
							<a href=""
								className="button flex-1"
								onClick={(e) => {
									e.preventDefault();
								}}>
								{"Open full docs"}
							</a>
						</div>
					</div>
				</div>
				<div className={`flex-3 overflow-auto`}>
					<ResourceDocumentation resource={this.props.resource.toJS()}
						resources={this.props.resources.toJS()}>
					</ResourceDocumentation>
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