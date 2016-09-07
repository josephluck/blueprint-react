const Http = require('choo/http')
const Api = require('../../utils/api')

module.exports = {
  namespace: 'resources',
  state: {
    resources: [],
    loading: false
  },
  reducers: {
    resourcesLoading: (payload, state) => {
      let newState = state
      newState.loading = true
      return newState
    },
    receiveResources: (payload, state) => {
      let newState = state
      newState.loading = false
      newState.resources = payload
      return newState
    }
  },
  effects: {
    get: (payload, state, send, done) => {
      send('resources:resourcesLoading', {}, (err) => {
        if (err) return done(err)
      })
      Http({
        uri: Api.getUrl('resources'),
        method: 'get',
        json: true,
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      }, (err, resp, body) => {
        if (err) {
          return
        }
        if (resp.statusCode === 401) {
          send('session:removeToken', {}, (err) => {
            if (err) return done(err)
          })
          send('session:removeUserId', {}, (err) => {
            if (err) return done(err)
          })
          send('location:redirect', {
            uri: 'login'
          }, (err) => {
            if (err) return done(err)
          })
        } else {
          let resources = body.data
          send('resources:receiveResources', resources, (err) => {
            if (err) return done(err)
          })
        }
      })
    }
  },
  subscriptions: []
}

