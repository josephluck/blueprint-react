import Choo from 'choo'
import Log from 'choo-log'

// Middleware
const App = Choo()
App.use(Log())

// Models
import AppModel from './models/app'
App.model(AppModel)
import LocationModel from './models/location'
App.model(LocationModel)
import TodosModel from './models/todos'
App.model(TodosModel)
import SessionModel from './models/session'
App.model(SessionModel)
import LoginModel from './models/login'
App.model(LoginModel)

// Views
import RequireLogin from './pages/require_login'
import Home from './pages/home'
import Login from './pages/login'
import Todos from './pages/todos/todos'
import LoggedIn from './pages/logged_in'

App.router((route) => [
  route('/', Home, [
  	route('/logged_in', RequireLogin.bind(arguments, LoggedIn))
  ]),
  route('/todos', Todos),
  route('/login', Login)
])

document.body.appendChild(App.start())
