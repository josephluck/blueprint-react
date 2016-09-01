import render from 'choo/html'
import AddNewTodo from '../../elements/add-new-todo'
import TodosList from '../../elements/todos-list'

export default (state, prev, send) => {
	const onInputType = value => send('todos:storeNewTodoInputValue', {value})
	const onAddNewTodo = todoDescription => send('todos:addNewTodo', {todoDescription})
	const AddNewTodoComponent = AddNewTodo({
		inputValue: state.todos.newTodoValue,
		onInputType,
		onAddNewTodo
	})

	const onTodoClick = todoIndex => send('todos:toggleTodoDone', {todoIndex})
	const TodosListComponent = TodosList({
	  todos: state.todos.todos,
	  onTodoClick
	})

	const component = render `
	  <div class="TodosPage">
	    <h1>Todos list</h1>
	    ${AddNewTodoComponent}
	    ${TodosListComponent}
	  </div>
	`

	return component
}
