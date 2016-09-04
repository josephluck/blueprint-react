const render = require('choo/html')

module.exports = (state, prev, send) => {
  const onSubmit = (e) => {
    e.preventDefault()
    send('login:submitLoginForm', state)
  }
  const component = render `
    <div>
      ${state.login.errors.general
        ? render `
          <div>
            ${state.login.errors.general}
          </div>
        ` : null
      }
      <form
        class="LoginPage"
        onsubmit=${onSubmit}>
        <h1>
          Login
        </h1>
        <label>
          Email
        </label>
        <input
          name="email"
          value=${state.login.form.email}
          onchange=${(e) => {
            send('login:onInputChange', {
              key: 'email',
              value: e.target.value
            })
          }}
          type="text"
        />
        <label>
          Password
        </label>
        <input
          name="password"
          value=${state.login.form.password}
          onchange=${(e) => {
            send('login:onInputChange', {
              key: 'password',
              value: e.target.value
            })
          }}
          type="password"
        />
        <button
          type="submit"
          disabled=${state.login.loading}
        >
          Login
        </button>
      </form>
    </div>
  `

  return component
}

