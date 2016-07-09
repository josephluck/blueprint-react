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

/*=============================================================================
	Render right bar

	NOTE: Might be worth refactoring this so it doesn't generate resource
	on render -- check perf for large resources
=============================================================================*/
	render() {
		let get_code_example = {};

		if (Object.keys(this.props.resource.toJS()).length) {
			get_code_example = ResourceUtils.generateResource(this.props.resource.toJS(), this.props.resources.toJS());
		}

		var right_bar_class = "";
		var box_class = "right-bar-content"

		if (this.props.right_bar_open === true) {
			right_bar_class = "--open"
			box_class = "--showing";
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
				<div className={`box flex-1 overflow-auto right-bar-content ${box_class}`}>
					<div className="section-title">
						{`GET /${this.props.resource.name}`}
					</div>
					<Highlight className="javascript">
					  {JSON.stringify(get_code_example, null, 2)}
					</Highlight>
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