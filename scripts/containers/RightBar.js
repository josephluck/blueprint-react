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