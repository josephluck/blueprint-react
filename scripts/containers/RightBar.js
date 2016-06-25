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

/*=============================================================================
	Render office tasks
=============================================================================*/
	render() {
		let get_code_example = {};

		if (Object.keys(this.props.edited_resource.toJS()).length) {
			get_code_example = ResourceUtils.generateResource(this.props.edited_resource.toJS(), this.props.resources.toJS());
		}

		return (
			<div>
				<div className="section-title flex">
					<span className="flex-1">
						{`GET /${this.props.edited_resource.name}`}
					</span>
				</div>
				<div className="box">
					<Highlight className="javascript">
					  {JSON.stringify(get_code_example, null, 2)}
					</Highlight>
				</div>
				<div className="section-title with-top-border flex">
					<span className="flex-1">
						{`GET /${this.props.edited_resource.name}/1`}
					</span>
				</div>
				<div className="box">
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