import React, {Component} from 'react';
import Provide from 'hoc/Provide';
import {Link} from 'react-router';

// Stores
import ResourcesStore from 'stores/ResourcesStore';

class Resources extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ""
		}
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
			<div className="flex flex-vertical">
				<div className="section-title flex flex-0">
					<span className="flex-1">
						{"Resources"}
					</span>
					<a href=""
						onClick={(e) => {
							e.preventDefault();
							ResourcesStore.createNewResource();
						}}>
						{"New"}
					</a>
				</div>
				<div className="flex flex-vertical">
					<div className="flex-0 list-item without-bottom-padding">
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
						{this.props.resources.filter((resource, i) => {
							return resource.name.toLowerCase().includes(this.state.search.toLowerCase());
						}).map((resource, i) => {
							if (resource.id == this.props.resource.id) {
								return (
									<div key={i} className="list-item active">
										<span>{this.props.resource.name}</span>
									</div>
								)
							} else {
								return (
									<div key={i} className="list-item">
										<Link to={`/${resource.id}`}>{resource.name}</Link>
									</div>
								)
							}
						})}
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
		)
	}
}

export default Provide(Resources, [
	'resources',
	'resource',
	'resources_loading'
])