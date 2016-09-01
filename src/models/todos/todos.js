export const storeNewTodoInputValue = (payload, state) => {
  let newState = state
  newState.newTodoValue = payload.value
  return newState
}

export const addNewTodo = (payload, state) => {
  let newState = state
  newState.newTodoValue = ''
  newState.todos = [{
    description: payload.todoDescription,
    done: false
  }].concat(newState.todos)
  return newState
}

export const toggleTodoDone = (payload, state) => {
  let newState = state
  let todoBeingToggled = newState.todos[payload.todoIndex]
  todoBeingToggled.done = !todoBeingToggled.done
  return newState
}

export const removeAllDoneTodos = (payload, state) => {
  let newState = state
  newState.todos = newState.todos.filter(todo => !todo.done)
  return newState
}

export default {
  namespace: 'todos',
  state: {
    newTodoValue: '',
    todos: [
      {
        description: 'Learn Choo',
        done: false
      },
      {
        description: 'Get awesome at it',
        done: false
      },
      {
        description: 'Realise that React + Freezer is better',
        done: false
      }
    ]
  },
  reducers: {
    storeNewTodoInputValue,
    addNewTodo,
    toggleTodoDone,
    removeAllDoneTodos
  },
  effects: {},
  subscriptions: []
}

