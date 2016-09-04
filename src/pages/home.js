const Html = require('choo/html')
const Sheetify = require('sheetify')

const classes = Sheetify `
  h1 {
    text-align: center;
  }
`

module.exports = (state, prev, send) => {
  return Html `
    <div class=${classes}>
      <h1>Hello, World!</h1>
      <p>If you are seeing this, then the generator works!</p>
      <h2>Demo</h2>
      <h3>${state.title}</h3>
      <input
        type="text"
        oninput=${(e) => send('update', { value: e.target.value })} />
    </div>
  `
}
