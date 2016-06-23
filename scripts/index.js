import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

// App/Login
import App from './App';
import ResourcesList from 'containers/ResourcesList';
import Resource from 'containers/Resource';
import ResourceEdit from 'containers/ResourceEdit';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
  		<Route component={Resource}>
    		<Route path=":resource_name" component={ResourceEdit}></Route>
    	</Route>
    </Route>
  </Router>
), document.getElementById('root'))