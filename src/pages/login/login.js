import render from 'choo/html'

export default (state, prev, send) => {
	const onSubmit = (e) => {
		e.preventDefault();
		send('session:attemptLogin', state)
	}
	const component = render `
		<div>
			${state.session.errors.general ?
				render `
					<div>
						${state.session.errors.general}
					</div>
				`
				:
				null
			}
		  <form
		  	class="LoginPage"
		  	onsubmit=${onSubmit}
		  >
		    <h1>
		    	Login
		    </h1>
		    <label>
		    	Email
		    </label>
		    <input
		    	name="email"
		    	value=${state.session.form.email}
		    	onchange=${(e) => {
		    		send('session:onInputChange', {
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
		    	value=${state.session.form.password}
		    	onchange=${(e) => {
		    		send('session:onInputChange', {
		    			key: 'password',
		    			value: e.target.value
		    		})
		    	}}
		    	type="password"
		    />
		    <button
		    	type="submit"
		    	disabled=${state.session.loading}
		    >
		    	Login
		    </button>
		  </form>
		</div>
	`

	return component
}
