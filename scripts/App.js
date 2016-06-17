import React, {Component} from 'react';
import { cool } from 'react-freezer-js';

import Store from 'stores/Store';

function App({
	children
}) {
  return children
}

export default cool(App, Store);
