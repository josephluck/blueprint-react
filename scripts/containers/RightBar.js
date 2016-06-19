import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';

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
		let get_code_example = [
		  {
		    "first_name": "Mozell",
		    "last_name": "Don",
		    "address_line_1": null,
		    "address_line_2": "Darryl Motorway",
		    "town": "Cambridgeshire",
		    "county": "California",
		    "postcode": "64983-3682",
		    "country": "Mexico",
		    "date_of_birth": "2015-07-04T10:17:54.320Z",
		    "deleted": false,
		    "favourite_programming_language": "python",
		    "id": 1
		  }
		];

		return (
			<div>
				<div className="section-title flex">
					<span className="flex-1">
						{`GET /${this.props.resource.name}`}
					</span>
				</div>
				<div className="box">
					<Highlight className='javascript'>
					  {JSON.stringify(get_code_example, null, 2)}
					</Highlight>
				</div>
			</div>
		)
	}
}

export default Provide(RightBar, [
	'resource',
	'resource_loading'
])