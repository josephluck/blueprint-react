import h from 'choo/html'

export default ({
	todos
}) => h`
	${todos.map(todo => h`
		<div>
			${todo.description}
		</div>
	`)}
`
