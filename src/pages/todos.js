import h from 'choo/html'
import TodosList from '../elements/TodosList'

export default (state, prev, send) => h`
  <main>
    <h1>Todos list</h1>
    ${TodosList({
      todos: state.todos
    })}
  </main>
`
