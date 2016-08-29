import render from 'choo/html'
import AddNewTodo from '../../elements/add-new-todo'
import TodosList from '../../elements/todos-list'

export default (state, prev, send) => {
	const AddNewTodoComponent = AddNewTodo({
		inputValue: state.todos.newTodoValue,
		onInputType: (value) => send('todos:storeNewTodoInputValue', {value}),
		onAddNewTodo: (todoDescription) => send('todos:addNewTodo', {todoDescription})
	})

	const TodosListComponent = TodosList({
	  todos: state.todos.todos,
	  onTodoClick: (todoIndex) => send('todos:toggleTodoDone', {todoIndex})
	})

	return render `
	  <main>
	    <h1>Todos list</h1>
	    ${AddNewTodoComponent}
	    ${TodosListComponent}
	  </main>
	`
}
