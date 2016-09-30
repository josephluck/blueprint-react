const React = require('react')
const Router = require('react-router').Router
const Route = require('react-router').Route
const IndexRoute = require('react-router').IndexRoute
const browserHistory = require('react-router').browserHistory
const render = require('react-dom').render

const Reducers = require('./reducers')
const CreateStore = require('redux').createStore
const ApplyMiddleware = require('redux').applyMiddleware
const Provider = require('react-redux').Provider
const ThunkMiddleware = require('redux-thunk').default
const Store = CreateStore(
  Reducers,
  window.devToolsExtension && window.devToolsExtension(),
  ApplyMiddleware(
    ThunkMiddleware
  )
)

const ConnectedApp = (props) => {
  return (
    <Provider store={Store}>
      <App {...props} />
    </Provider>
  )
}

const App = require('./containers/App')
const Login = require('./containers/Login')

render((
  <Router history={browserHistory}>
    <Route path='/' component={ConnectedApp}>
      <Route path='login' component={Login} />
      <IndexRoute component={Login} />
    </Route>
  </Router>
), document.getElementById('root'))
