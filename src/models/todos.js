export default {
  state: {
    /* initial values of state inside the model */
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
    /* synchronous operations that modify state. Triggered by actions. Signature of (data, state). */
    update: (action, state) => ({ title: action.value })
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
