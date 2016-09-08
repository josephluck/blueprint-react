const test = require('tape')
const reducer = require('./reducers')

test('counter reducer increment should return count + 1', function(t) {
  t.plan(1)
  const expected = {
    count: 1
  }
  const actual = reducer({
    count: 0
  }, {
    type: 'increment'
  })
  t.deepEqual(expected, actual)
})