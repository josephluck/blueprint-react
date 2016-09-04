const Choo = require('choo')
const Log = require('choo-log')

// Middleware
const App = Choo()
App.use(Log())

// Models
const AppModel = require('./models/app')
App.model(AppModel)
const LocationModel = require('./models/location')
App.model(LocationModel)
const SessionModel = require('./models/session')
App.model(SessionModel)
const LoginModel = require('./models/login')
App.model(LoginModel)

// Views
const RequireLogin = require('./pages/require_login')
const Home = require('./pages/home')
const Login = require('./pages/login')
const LoggedIn = require('./pages/logged_in')

App.router((route) => [
  route('/', RequireLogin.bind(arguments, Home), [
    route('/logged_in', RequireLogin.bind(arguments, LoggedIn))
  ]),
  route('/login', Login)
])

document.body.appendChild(App.start())
