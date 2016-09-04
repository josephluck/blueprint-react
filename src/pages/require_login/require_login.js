const Html = require('choo/html')

module.exports = (view, state, prev, send) => {
  if (state.session.token && state.session.userId) {
    return view(state, prev, send)
  } else {
    send('location:redirect', {
      uri: 'login'
    })
    return Html `<div></div>`
  }
}
