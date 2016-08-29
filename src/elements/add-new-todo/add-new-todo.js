import render from 'choo/html'

export default ({
	inputValue = '',
	onInputType,
	onAddNewTodo
}) => render `
	<form class="AddNewTodo"
		onsubmit=${(e) => {
			e.preventDefault()
			onAddNewTodo(inputValue)}
		}}>
		<input value=${inputValue}
			oninput=${(e) => onInputType(e.target.value)} />
		<button type="submit"
			disabled=${inputValue.length === 0}>
			Add todo
		</button>
	</form>
`
