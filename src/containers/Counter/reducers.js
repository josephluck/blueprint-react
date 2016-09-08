function counter (state = {
  count: 0
}, action) {
  const type = action.type

  if (type === 'increment') {
    return {
      ...state,
      count: state.count + 1
    }
  } else if (type === 'decrement') {
    return {
      ...state,
      count: state.count - 1
    }
  }
  return state
}

module.exports = counter
