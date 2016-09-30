const combineReducers = require('redux').combineReducers
const formReducer = require('redux-form').reducer

module.exports = combineReducers({
  form: formReducer,
  counter: require('../containers/Counter/reducers'),
  login: require('../containers/Login/reducers')
})
