const combineReducers = require('redux').combineReducers

module.exports = combineReducers({
  counter: require('../containers/Counter/reducers')
})
