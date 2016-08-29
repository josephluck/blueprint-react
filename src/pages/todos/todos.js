import render from 'choo/html'
import AddNewTodoComponent from '../../elements/add-new-todo'
import TodosListComponent from '../../elements/todos-list'

export default (state, prev, send) => {
	const AddNewTodo = AddNewTodoComponent({
		inputValue: state.todos.newTodoValue,
		onInputType: (value) => send('todos:storeNewTodoInputValue', {value}),
		onAddNewTodo: (todoDescription) => send('todos:addNewTodo', {todoDescription})
	})

	const TodosList = TodosListComponent({
	  todos: state.todos.todos,
	  onTodoClick: (todoIndex) => send('todos:toggleTodoDone', {todoIndex})
	})

	return render `
	  <main>
	    <h1>Todos list</h1>
	    ${AddNewTodo}
	    ${TodosList}
	  </main>
	`
}
