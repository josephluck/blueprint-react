import render from 'choo/html'

export default (state, prev, send) => {
	const onSubmit = (e) => {
		e.preventDefault();
		send('session:attemptLogin', state)
	}
	const component = render `
	  <form class="LoginPage"
	  	onsubmit=${onSubmit}>
	    <h1>Login</h1>
	    <label>
	    	Email
	    </label>
	    <input type="email" />
	    <label>
	    	Password
	    </label>
	    <input type="password" />
	    <button type="submit">
	    	Login
	    </button>
	  </form>
	`

	return component
}
