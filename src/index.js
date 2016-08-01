import React from 'react';
import {render} from 'react-dom';
import {browserHistory, Router, Route} from 'react-router';

// App/Login
import App from 'App';
import Resource from 'containers/Resource';
import ResourceEdit from 'containers/ResourceEdit';
import NestedResourceNavigation from 'containers/NestedResourceNavigation';

render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route component={Resource}>
				<Route path=":resourceId" component={ResourceEdit}>
					<Route path="**" component={NestedResourceNavigation} />
				</Route>
			</Route>
		</Route>
	</Router>
), document.getElementById('root'));
