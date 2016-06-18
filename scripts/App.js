import React, {Component} from 'react';
import { cool } from 'react-freezer-js';

import Store from 'stores/Store';

import ResourcesList from 'containers/ResourcesList';

function App({
	children
}) {
  return (
  	<div>
	  	<ResourcesList></ResourcesList>
	  	{children}
	  </div>
	)
}

export default cool(App, Store);
