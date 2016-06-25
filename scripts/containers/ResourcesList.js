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
				<div className="list flex-1">
					<div className="list-item">
						<div className="input-with-icon">
							<span className="ss-search"></span>
							<input className="without-bottom-margin"
								onChange={(e) => {
									this.handleSearchingResources(e.target.value);
								}} />
						</div>
					</div>
					{this.props.resources.filter((resource, i) => {
						return resource.name.toLowerCase().includes(this.state.search.toLowerCase());
					}).map((resource, i) => {
						let class_name = "list-item";

						if (resource.name == this.props.params.resource_name) {
							class_name += " active";
						}

						return (
							<div key={i} className={class_name}>
								<Link to={`/${resource.name}`}>{resource.name}</Link>
							</div>
						)
					})}
				</div>
				<div className="list">
					<div className="list-item with-bottom-padding">
						<a href=""
							className="button"
							onClick={(e) => {
								e.preventDefault();
								ResourcesStore.createNewResource();
							}}>
							{"New resource"}
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default Provide(Resources, [
	'resources',
	'resources_loading',
	'params'
])