import h from 'choo/html'

const TodosList = ({todos}) => h`
	${todos.map(todo => h`
		<div>
			${todo.description}
		</div>
	`)}
`

export default (state, prev, send) => h`
  <main>
    <h1>Todos list</h1>
    ${TodosList({
    	todos: state.todos
    })}
  </main>
`
