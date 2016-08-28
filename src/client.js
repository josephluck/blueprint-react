import Choo from 'choo'
const App = Choo()

import AppModel from './models/app'
import todos from './models/todos'
App.model(AppModel)
App.model(todos)

import Home from './pages/home'
import Todos from './pages/todos'

App.router((route) => [
  route('/', Home),
  route('/todos', Todos)
])

document.body.appendChild(App.start())
