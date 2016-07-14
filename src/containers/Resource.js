import {Component} from 'react';

// Stores
import ResourceStore from 'stores/ResourceStore';

class Resource extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.getResource(this.props.params);
	}

	/*=============================================================================
		If the user clicks between resources using the left nav
	=============================================================================*/
	componentWillReceiveProps(props) {
		if (this.props.params.resourceId !== props.params.resourceId) {
			this.getResource(props.params);
		}
	}

	/*=============================================================================
		Get the resource from the server
	=============================================================================*/
	getResource(params) {
		ResourceStore.getResource({
			...params
		});
	}

	render() {
		return this.props.children;
	}
}

export default Resource;
