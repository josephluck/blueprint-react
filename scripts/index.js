import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

// App/Login
import App from './App';
import ResourcesList from 'containers/ResourcesList';
import Resource from 'containers/Resource';
import ResourceView from 'containers/ResourceView';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<Route path="resources">
	    	<Route path=":resourceId" component={Resource}>
	    		<Route path="view" component={ResourceView}></Route>
	    	</Route>
	    </Route>
    </Route>
  </Router>
), document.getElementById('root'))