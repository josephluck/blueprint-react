import React, {Component} from 'react';
import { warmUp } from 'react-freezer-js';

/*=============================================================================
	Given a component and prop paths, give the component props from the store

	Prop paths must be an array of strings, with each string corresponding to
	a key on the store. For example

	Provide(<Application />, ['application_loading']);

	This will provide the <Application /> component with the prop
	'application_loading'. When the 'application_loading' prop is changed, the
	<Application /> component will automatically re-render.
=============================================================================*/

export default function Provide(ComponentToBeProvided, requested_props) {
	/*=============================================================================
		Convert the requested props in to an array of arrays that warmUp needs.
	=============================================================================*/
  var decorated_props = requested_props.map((prop) => {
    return [prop, prop];
  });

	const ProvidedComponent = React.createClass({
		/*=============================================================================
			Perf.
		=============================================================================*/
		shouldComponentUpdate(props) {
			let should_update = false;
			for (var i = 0, x = requested_props.length; i < x; i++) {
				if (props[requested_props[i]] != this.props[requested_props[i]]) {
					should_update = true;
				}
			}

			return should_update;
		},
		render() {
			return <ComponentToBeProvided {...this.props} />
		}
	})

  return warmUp(ProvidedComponent, decorated_props);
}