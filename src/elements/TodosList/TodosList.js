import h from 'choo/html'

export default ({
	todos
}) => h`
	<div class="TodosList">
		${todos.map(todo => h`
			<div className="TodosListItem">
				${todo.description}
			</div>
		`)}
	</div>
`
