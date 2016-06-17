import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

// App/Login
import App from './App';
import ResourcesList from 'containers/ResourcesList';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={ResourcesList}></IndexRoute>
    </Route>
  </Router>
), document.getElementById('root'))