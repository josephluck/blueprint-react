import test from 'ava'
import TodosList from './TodosList'

test('TodosList should render', t => {
	const TodosListComponent = TodosList({
		todos: [
			{
				description: 'Hey',
				done: false
			},
			{
				description: 'Ho',
				done: false
			}
		]
	})
	document.body.appendChild(TodosListComponent)
	const TodosListNode = document.querySelectorAll('.TodosList');
	const TodosListTodosNodes = document.querySelectorAll('.TodosListItem')
	t.plan(2)
	t.true(TodosListNode.length === 1)
	t.true(TodosListTodosNodes.length === 2)
})
