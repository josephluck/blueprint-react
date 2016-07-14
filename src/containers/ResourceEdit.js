import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import ResourceForm from 'components/ResourceForm';
import ResourcesStore from 'stores/ResourcesStore';
import ResourceStore from 'stores/ResourceStore';

class ResourceEdit extends Component {
	constructor(props) {
		super(props);
	}

	saveResource() {
		ResourceStore.saveResource(this.props.resource);
	}

	deleteResource() {
		ResourceStore.deleteResource(this.props.resource);
	}

	toggleRightBar() {
		ResourcesStore.toggleRightBar();
	}

/*=============================================================================
	Render office tasks
=============================================================================*/
	render() {
		return (
			<div className="flex flex-vertical">
				<div className="section-title flex flex-0">
					<span className="flex-1">
						{this.props.resource.name}
					</span>
					<a className="large-right-margin"
						href=""
						onClick={(e) => {
							e.preventDefault();
							this.toggleRightBar();
						}}>
						{"Docs"}
					</a>
					<a className="large-right-margin"
						href=""
						onClick={(e) => {
							e.preventDefault();
							this.deleteResource();
						}}>
						{"Delete"}
					</a>
					<a href=""
						onClick={(e) => {
							e.preventDefault();
							this.saveResource();
						}}>
						{"Save"}
					</a>
				</div>
				<ResourceForm
					resource={this.props.resource}
					resources={this.props.resources}
					nested={false}
				/>
				{this.props.children}
			</div>
		);
	}
}

ResourceEdit.propTypes = {
	children: React.PropTypes.node,
	resource: React.PropTypes.object,
	resources: React.PropTypes.array
};

export default Provide(ResourceEdit, [
	'resource',
	'resources'
]);
