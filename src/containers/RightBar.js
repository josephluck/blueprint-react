import React, {Component} from 'react';
import Provide from 'hoc/Provide';

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

	shouldComponentUpdate(props) {
		return props.rightBarOpen !== this.props.rightBarOpen;
	}

/*=============================================================================
	Render right bar

	NOTE: Might be worth refactoring this so it doesn't generate resource
	on render -- check perf for large resources
=============================================================================*/
	render() {
		let rightBarClass = '';

		if (this.props.rightBarOpen === true) {
			rightBarClass = '--open';
		}

		return (
			<div className={`flex right-bar ${rightBarClass}`}>
				<div className="documentation-left-nav flex flex-column">
					<div className="flex flex-0 pa3">
						<span className="flex-1">
							{'Documentaton'}
						</span>
						<a className="ml3"
							href=""
							onClick={(e) => {
								e.preventDefault();
								this.toggleRightBar();
							}}>
							{'Close'}
						</a>
					</div>
					<div className="flex flex-column">
						<div className="flex-1 overflow-auto">
							<div className="pa3">
								<div>{`Create ${this.props.resource.name}`}</div>
							</div>
						</div>
					</div>
					<div className="flex flex-0">
						<div className="flex pa3 text-align-center">
							<a href=""
								className="button flex-1"
								onClick={(e) => {
									e.preventDefault();
								}}>
								{'Open full docs'}
							</a>
						</div>
					</div>
				</div>
				<div className={`flex-3 overflow-auto`}>
					<ResourceDocumentation resource={this.props.resource.toJS()}
						resources={this.props.resources.toJS()} />
				</div>
			</div>
		);
	}
}

RightBar.propTypes = {
	resource: React.PropTypes.object,
	resources: React.PropTypes.array,
	rightBarOpen: React.PropTypes.bool
};

export default Provide(RightBar, [
	'resources',
	'resource',
	'rightBarOpen'
]);
