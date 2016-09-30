const Api = require('../../utils/Api')

module.exports = {
  submitLogin (dispatch, getState) {
    const state = getState()
    console.log(state)
    Api.post({
      url: 'login'
    }).then((resp) => {
      console.log(resp)
    })
  }
}
