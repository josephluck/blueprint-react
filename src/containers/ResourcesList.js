import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';

// Stores
import ResourcesStore from 'stores/ResourcesStore';

class ResourcesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		};
	}

	handleSearchingResources(search) {
		this.state.search = search;
		this.forceUpdate();
	}

/*=============================================================================
	Render office tasks
=============================================================================*/
	render() {
		return (
			<div className="flex flex-1 flex-column">
				<div className="section-title flex flex-0">
					<span className="flex-1">
						{'Resources'}
					</span>
					<a href=""
						onClick={(e) => {
							e.preventDefault();
							ResourcesStore.createNewResource();
						}}>
						{'New'}
					</a>
				</div>
				<div className="flex flex-1 flex-column">
					<div className="flex-0 pa3 pb0">
						<div className="input-with-icon">
							<span className="ss-search"></span>
							<input className="without-bottom-margin"
								placeholder="Search"
								onChange={(e) => {
									this.handleSearchingResources(e.target.value);
								}} />
						</div>
					</div>
					<div className="flex-1 overflow-auto">
						{this.props.resources.filter((resource) => {
							return resource.name.toLowerCase().includes(this.state.search.toLowerCase());
						}).map((resource, i) => {
							if (resource.id === parseInt(this.props.resource.id, 10)) {
								return (
									<div key={i} className="pa3 active">
										<span>{this.props.resource.name}</span>
									</div>
								);
							}
							return (
								<div key={i} className="pa3">
									<Link to={`/${resource.id}`}>{resource.name}</Link>
								</div>
							);
						})}
					</div>
				</div>
				<div className="flex flex-0">
					<div className="flex flex-1 pa3 text-align-center">
						<a href=""
							className="button flex-1 tc"
							onClick={(e) => {
								e.preventDefault();
							}}>
							{'Open full docs'}
						</a>
					</div>
				</div>
			</div>
		);
	}
}

ResourcesList.propTypes = {
	resource: React.PropTypes.object,
	resources: React.PropTypes.array
};

export default Provide(ResourcesList, [
	'resources',
	'resource'
]);
