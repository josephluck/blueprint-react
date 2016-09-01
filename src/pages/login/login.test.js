import Test from 'ava'
import LoginPageComponent from './login'


Test('LoginPage should render', t => {
	document.body.innerHTML = ''
	document.body.appendChild(LoginPageComponent({}, {}, () => {}))
	const LoginPageNode = document.querySelectorAll('.LoginPage')
	t.true(LoginPageNode.length === 1)
})
