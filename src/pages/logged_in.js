const Html = require('choo/html')

module.exports = (state, prev, send) => {
  return Html `
    <main>
      <h1>Logged in!</h1>
      <p>If you are seeing this, then the generator works!</p>
      <h2>Demo</h2>
      <h3>${state.title}</h3>
      <input
        type="text"
        oninput=${(e) => send('update', { value: e.target.value })}
      />
    </main>
  `
}
