import Test from 'ava'
import TodosModel from './todos'

const {
	storeNewTodoInputValue,
	addNewTodo,
	toggleTodoDone,
	removeAllDoneTodos
} = TodosModel.reducers


Test('storeNewTodoInputValue should store the inputted value', t => {
	const currentState = {
		newTodoValue: 'Initial value'
	}
	const payload = {
		value: 'New value'
	}
	const expectedNewState = {
		newTodoValue: 'New value'
	}
	const actualNewState = storeNewTodoInputValue(payload, currentState)
	t.deepEqual(actualNewState, expectedNewState)
})


Test('addNewTodo should prepend the new todo with done set to false', t => {
	t.plan(2)
	const currentState = {
		todos: [
			{
				description: 'Todo one',
				done: true
			}
		]
	}
	const payload = {
		todoDescription: 'New todo'
	}
	const expectedNewState = {
		todos: [
			{
				description: 'New todo',
				done: false
			},
			{
				description: 'Todo one',
				done: true
			}
		]
	}
	const actualNewState = addNewTodo(payload, currentState)
	t.is(actualNewState.todos.length, 2)
	t.deepEqual(actualNewState.todos, expectedNewState.todos)
})


Test('toggleTodoDone should switch the done flag of the given todo index', t => {
	t.plan(1)
	const currentState = {
		todos: [
			{
				description: 'Todo one',
				done: false
			}
		]
	}
	const payload = {
		todoIndex: 0
	}
	const expectedNewState = {
		todos: [
			{
				description: 'Todo one',
				done: true
			}
		]
	}
	const actualNewState = toggleTodoDone(payload, currentState)
	t.is(actualNewState.todos[0].done, true)
})


Test('removeAllDoneTodos should delete all the done todos', t => {
	t.plan(2)
	const currentState = {
		todos: [
			{
				description: 'Todo one',
				done: true
			},
			{
				description: 'Todo two',
				done: false
			}
		]
	}
	const expectedNewState = {
		todos: [
			{
				description: 'Todo two',
				done: true
			}
		]
	}
	const actualNewState = removeAllDoneTodos({}, currentState)
	t.is(actualNewState.todos.length, 1)
	t.is(actualNewState.todos[0].description, "Todo two")
})