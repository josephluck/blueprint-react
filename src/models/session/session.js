import Http from 'choo/http'
import Api from '../../utils/api'

export default {
  namespace: 'session',
  state: {
    user: {},
    token: null
  },
  reducers: {
    setToken(payload, state) {
      let newState = state
      newState.token = payload.token
      localStorage.setItem('token', payload.token)
      return newState
    },
    setUserId(payload, state) {
      let newState = state
      newState.userId = payload.userId
      localStorage.setItem('userId', payload.userId)
      return newState
    },
    removeToken(payload, state) {
      let newState = state
      newState.token = null
      localStorage.removeItem('token')
      return newState
    },
    removeUserId(payload, state) {
      let newState = state
      newState.userId = null
      localStorage.removeItem('userId')
      return newState
    }
  },
  effects: {
  },
  subscriptions: []
}

