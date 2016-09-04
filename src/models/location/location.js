module.exports = {
  namespace: 'location',
  state: {
    user: {},
    token: null
  },
  reducers: {
    redirect (payload, state) {
      let newState = state
      newState.pathname = `${window.location.origin}/${payload.uri}`
      return newState
    }
  },
  effects: {},
  subscriptions: []
}

