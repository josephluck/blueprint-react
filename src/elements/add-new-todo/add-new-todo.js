import render from 'choo/html'

export default ({
	inputValue = '',
	onInputType,
	onAddNewTodo
}) => {
	const onInputChange = e => {
		onInputType(e.target.value)
	}
	const onFormSubmit = e => {
		e.preventDefault()
		onAddNewTodo(inputValue)
	}
	const buttonIsDisabled = inputValue.length === 0

	return render `
		<form class="AddNewTodo"
			onsubmit=${onFormSubmit}>
			<input value=${inputValue}
				oninput=${onInputChange} />
			<button type="submit"
				disabled=${buttonIsDisabled}>
				Add todo
			</button>
		</form>
	`
}
