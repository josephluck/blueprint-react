import Http from 'choo/http'
import Api from '../../utils/api'

export default {
  namespace: 'login',
  state: {
    form: {
      email: 'joseph.luck@local.co',
      password: '12345678'
    },
    errors: {},
    loading: false,
    user: {},
    token: null
  },
  reducers: {
    onInputChange: (payload, state) => {
      let newState = state
      newState.form[payload.key] = payload.value
      return newState
    },
    loginSubmitted: (payload, state) => {
      let newState = state
      newState.errors = {}
      newState.loading = true
      return newState
    },
    loginSuccess: (payload, state) => {
      let newState = state
      newState.user = payload.data
      newState.errors = {}
      newState.loading = false
      return state
    },
    loginError: (payload, state) => {
      let newState = state
      newState.errors = {
        general: payload.message
      }
      newState.loading = false
      return newState
    }
  },
  effects: {
    attemptLogin: (payload, state, send, done) => {
      send('login:loginSubmitted', {}, (err) => {
        if (err) return done(err)
      })
      Http({
        uri: Api.getUrl('login'),
        method: 'post',
        json: state.form
      }, (err, resp, body) => {
        if (resp.statusCode === 401) {
          send('login:loginError', body, (err) => {
            if (err) return done(err)
          })
          send('session:removeToken', {}, (err) => {
            if (err) return done(err)
          })
          send('session:removeUserId', {}, (err) => {
            if (err) return done(err)
          })
        } else {
          send('session:setToken', {
            token: body.token
          }, (err) => {
            if (err) return done(err)
          })
          send('session:setUserId', {
            userId: body.data._id
          }, (err) => {
            if (err) return done(err)
          })
          send('login:loginSuccess', body, (err) => {
            if (err) return done(err)
          })
        }
      })
    }
  },
  subscriptions: []
}

