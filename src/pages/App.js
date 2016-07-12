import html from 'choo/html'

const App = (state, prev, send) => {
  return html `
    <main class="app">
      <h1>${state.App.title}</h1>
      <label>Set the title</label>
      <input
        type="text"
        placeholder=${state.App.title}
        oninput=${(e) => send('App:updateText', {
          payload: e.target.value
        })}>
    </main>
  `
}

export default App
