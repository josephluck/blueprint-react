import Test from 'ava'
import Sinon from 'sinon'
import Simulate from 'simulant'
import AddNewTodoComponent from './add-new-todo'


Test('AddNewTodo should render', t => {
	const props = {}
	document.body.innerHTML = ''
	document.body.appendChild(AddNewTodoComponent(props))
	const AddNewTodoNode = document.querySelectorAll('.AddNewTodo')
	t.true(AddNewTodoNode.length === 1)
})


Test('AddNewTodo button should be disabled based on the input value\'s length', t => {
	t.plan(2)
	while (document.body.firstChild) {
		document.body.removeChild(document.body.firstChild)
	}
	document.body.appendChild(AddNewTodoComponent({
		inputValue: ''
	}))
	let AddNewTodoButton = document.querySelector('.AddNewTodo button')
	t.is(AddNewTodoButton.disabled, true)

	document.body.innerHTML = ''
	document.body.appendChild(AddNewTodoComponent({
		inputValue: 'Example value'
	}))
	AddNewTodoButton = document.querySelector('.AddNewTodo button')
	t.is(AddNewTodoButton.disabled, false)
})


Test('AddNewTodo should accept a callback when the input is filled out and the form is submitted', t => {
	const onAddNewTodoSpy = Sinon.spy()
	document.body.innerHTML = ''
	document.body.appendChild(AddNewTodoComponent({
		inputValue: 'Example input value',
		onAddNewTodo: onAddNewTodoSpy
	}))
	const AddNewTodoFormNode = document.querySelector('.AddNewTodo')
	Simulate.fire(AddNewTodoFormNode, 'submit')
	t.is(onAddNewTodoSpy.callCount, 1)
})


Test('AddNewTodo should accept a callback the input is changed', t => {
	t.plan(2)
	const onInputTypeSpy = Sinon.spy()
	document.body.innerHTML = ''
	document.body.appendChild(AddNewTodoComponent({
		inputValue: 'Example input value',
		onInputType: onInputTypeSpy
	}))
	const AddNewTodoInputNode = document.querySelector('.AddNewTodo input')
	AddNewTodoInputNode.value = "Changed value"
	Simulate.fire(AddNewTodoInputNode, 'input')
	t.is(onInputTypeSpy.callCount, 1)
	t.true(onInputTypeSpy.calledWith("Changed value"))
})