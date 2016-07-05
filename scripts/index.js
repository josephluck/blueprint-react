import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

// App/Login
import App from './App';
import ResourcesList from 'containers/ResourcesList';
import Resource from 'containers/Resource';
import ResourceEdit from 'containers/ResourceEdit';
import NestedResourceNavigation from 'containers/NestedResourceNavigation';
import NestedResource from 'containers/NestedResource';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
  		<Route component={Resource}>
    		<Route path=":resourceId" component={ResourceEdit}>
    			<Route path="**" component={NestedResourceNavigation}></Route>
    		</Route>
    	</Route>
    </Route>
  </Router>
), document.getElementById('root'))