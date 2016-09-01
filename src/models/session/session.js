export default {
  namespace: 'session',
  state: {
    user: {},
    token: null
  },
  reducers: {
    loginSuccess: (payload, state) => {
      return state;
    },
    loginError: (payload, state) => {
      return state;
    }
  },
  effects: {
    attemptLogin: (payload, state, send, done) => {
      send('session:loginSuccess', {
        username: 'Cool dude'
      }, (err) => {
        if (err) return done(err)
      })
    }
  },
  subscriptions: []
}

