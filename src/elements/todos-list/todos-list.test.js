import Test from 'ava'
import Sinon from 'sinon'

import TodosListComponent from './todos-list'


Test('TodosList should render', t => {
	t.plan(2)
	const props = {
		todos: [
			{
				description: 'Hey',
				done: false
			},
			{
				description: 'Ho',
				done: false
			},
			{
				description: 'Let \'s go',
				done: false
			}
		]
	}
	while (document.body.firstChild) {
		document.body.removeChild(document.body.firstChild)
	}
	document.body.appendChild(TodosListComponent(props))
	const TodosListNode = document.querySelectorAll('.TodosList')
	const TodosListTodosNodes = document.querySelectorAll('.TodosListItem')
	t.true(TodosListNode.length === 1)
	t.true(TodosListTodosNodes.length === 3)
})


Test('TodosList should accept a callback when a todo is clicked', t => {
	t.plan(3)
	const onTodoClickSpy = Sinon.spy()
	const props = {
		todos: [
			{
				description: 'Hey',
				done: false
			},
			{
				description: 'Ho',
				done: false
			},
			{
				description: 'Let \'s go',
				done: false
			}
		],
		onTodoClick: onTodoClickSpy
	}
	while (document.body.firstChild) {
		document.body.removeChild(document.body.firstChild)
	}
	document.body.appendChild(TodosListComponent(props))
	const TodosListTodosNodes = document.querySelectorAll('.TodosListItem')
	t.true(onTodoClickSpy.callCount === 0)
	TodosListTodosNodes[1].click()
	t.true(onTodoClickSpy.callCount === 1)
	t.true(onTodoClickSpy.calledWith(1), 'Expected the second todo\'s index to be passed back to the onTodoClick callback')
})