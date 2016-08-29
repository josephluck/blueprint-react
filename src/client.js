import Choo from 'choo'
const App = Choo()

import AppModel from './models/app'
import TodosModel from './models/todos'
App.model(AppModel)
App.model(TodosModel)

import Home from './pages/home'
import Todos from './pages/todos/todos'

App.router((route) => [
  route('/', Home),
  route('/todos', Todos)
])

document.body.appendChild(App.start())
