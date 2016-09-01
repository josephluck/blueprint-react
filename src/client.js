import Choo from 'choo'
import Log from 'choo-log'
const App = Choo()
App.use(Log())

import AppModel from './models/app'
App.model(AppModel)
import TodosModel from './models/todos'
App.model(TodosModel)
import SessionModel from './models/session'
App.model(SessionModel)

import Home from './pages/home'
import Login from './pages/login'
import Todos from './pages/todos/todos'

App.router((route) => [
  route('/', Home),
  route('/todos', Todos),
  route('/login', Login)
])

document.body.appendChild(App.start())
