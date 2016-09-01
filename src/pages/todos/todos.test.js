import Test from 'ava'
import TodosPageComponent from './todos'


Test('TodoPage should render', t => {
	document.body.innerHTML = ''
	document.body.appendChild(TodosPageComponent({
		todos: {
			todos: []
		}
	}, {}, () => {}))
	const TodoPageNode = document.querySelectorAll('.TodosPage')
	t.true(TodoPageNode.length === 1)
})
