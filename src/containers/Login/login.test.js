const test = require('tape')
const reducers = require('../../reducers')

test('counter reducers increment should return count + 1', function(t) {
  t.plan();
  let state;
  state = reducers({counter:{count:0}}, {type:'increment'});
  t.deepEqual(state.counter.count, 1);
  t.end();
})

test('counter reducers decremement should return count - 1', function(t) {
  t.plan();
  let state;
  state = reducers({counter:{count:1}}, {type:'decrement'});
  t.deepEqual(state.counter.count, 0);
  t.end();
})