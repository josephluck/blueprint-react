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
    storeNewTodoInputValue: (payload, state) => {
      let newState = state
      newState.newTodoValue = payload.value
      return newState
    },
    addNewTodo: (payload, state) => {
      let newState = state
      newState.newTodoValue = ''
      newState.todos = [{
        description: payload.todoDescription,
        done: false
      }].concat(newState.todos)
      return newState
    },
    toggleTodoDone: (payload, state) => {
      let newState = state
      let todoBeingToggled = newState.todos[payload.todoIndex]
      todoBeingToggled.done = !todoBeingToggled.done
      return newState
    }
  },
  effects: {
    // asynchronous operations that don't modify state directly.
    // Triggered by actions, can call actions. Signature of (data, state, send, done)
    /*
    myEffect: (data, state, send, done) => {
      // do stuff
    }
    */
  },
  subscriptions: [
    // asynchronous read-only operations that don't modify state directly.
    // Can call actions. Signature of (send, done).
    /*
    (send, done) => {
      // do stuff
    }
    */
  ]
}

