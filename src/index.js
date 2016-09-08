const React = require('react')
const Router = require('react-router').Router
const Route = require('react-router').Route
const browserHistory = require('react-router').browserHistory
const render = require('react-dom').render

const Reducers = require('./reducers')
const CreateStore = require('redux').createStore
const Provider = require('react-redux').Provider
const Store = CreateStore(Reducers, window.devToolsExtension && window.devToolsExtension())

const App = require('./containers/App')

const ConnectedApp = (props) => {
  return (
    <Provider store={Store}>
      <App {...props} />
    </Provider>
  )
}

render((
  <Router history={browserHistory}>
    <Route path='/' component={ConnectedApp}>
      <Route path='/counter' component={require('./containers/Counter')} />
    </Route>
  </Router>
), document.getElementById('root'))
