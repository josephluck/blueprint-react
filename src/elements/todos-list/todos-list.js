import h from 'choo/html'

export default ({
	todos = [],
	onTodoClick = () => {}
}) => h`
	<div class="TodosList">
		${todos.map((todo, todoIndex) => h`
			<div className="TodosListItem"
				onclick=${() => onTodoClick(todoIndex)}>
				${todo.description}
				${todo.done === true}
			</div>
		`)}
	</div>
`
