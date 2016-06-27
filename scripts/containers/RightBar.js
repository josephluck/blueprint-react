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
		this.state = {
			open: false
		}
	}

	toggleVisibility() {
		this.state.open = !this.state.open;
		this.forceUpdate();
	}

	shouldComponentUpdate() {
		return this.props.edited_resource !== this.props.resource && this.state.open === true
	}

/*=============================================================================
	Render right bar

	NOTE: Might be worth refactoring this so it doesn't generate resource
	on render -- check perf for large resources
=============================================================================*/
	render() {
		let get_code_example = {};

		if (Object.keys(this.props.edited_resource.toJS()).length) {
			get_code_example = ResourceUtils.generateResource(this.props.edited_resource.toJS(), this.props.resources.toJS());
		}

		var icon_class = "";
		var right_bar_class = "";
		var box_class = "right-bar-content"

		if (this.state.open === true) {
			icon_class = "--rotated";
			right_bar_class = "--open"
			box_class = "--showing";
		}

		return (
			<div className={`right-bar flex flex-vertical ${right_bar_class}`}>
				<div className="section-title flex flex-0">
					<span className="flex-1">
						<div className={`icon ${icon_class}`}
							onClick={() => {
								this.toggleVisibility();
							}}>
							<a className="ss-left"></a>
						</div>
						{`GET /${this.props.edited_resource.name}`}
					</span>
				</div>
				<div className={`box right-bar-content ${box_class}`}>
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
	'edited_resource'
])