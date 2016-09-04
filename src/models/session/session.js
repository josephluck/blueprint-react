module.exports = {
  namespace: 'session',
  state: {
    userId: window.localStorage.getItem('userId'),
    token: window.localStorage.getItem('token')
  },
  reducers: {
    setToken (payload, state) {
      let newState = state
      newState.token = payload.token
      window.localStorage.setItem('token', payload.token)
      return newState
    },
    setUserId (payload, state) {
      let newState = state
      newState.userId = payload.userId
      window.localStorage.setItem('userId', payload.userId)
      return newState
    },
    removeToken (payload, state) {
      let newState = state
      newState.token = null
      window.localStorage.removeItem('token')
      return newState
    },
    removeUserId (payload, state) {
      let newState = state
      newState.userId = null
      window.localStorage.removeItem('userId')
      return newState
    }
  },
  effects: {
    unauthenticated (payload, state, send, done) {
      send('session:removeToken', {}, (err) => {
        if (err) return done(err)
      })
      send('session:removeUserId', {}, (err) => {
        if (err) return done(err)
      })
      send('location:redirect', {
        url: 'login'
      }, (err) => {
        if (err) return done(err)
      })
    }
  },
  subscriptions: []
}

