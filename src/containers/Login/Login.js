const React = require('react')
const connect = require('react-redux').connect
const Field = require('redux-form').Field
const reduxForm = require('redux-form').reduxForm

function SimpleForm ({
  handleSubmit,
  pristine,
  submitting
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <div>
          <Field name='email' component='input' type='text' placeholder='Email' />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field name='password' component='input' type='password' placeholder='Password' />
        </div>
      </div>
      <div>
        <button type='submit' disabled={pristine || submitting}>
          {'Login'}
        </button>
      </div>
    </form>
  )
}

SimpleForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool
}

const form = reduxForm({
  form: 'login'
})(SimpleForm)

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  const actions = require('./actions')
  return {
    handleSubmit (e) {
      e.preventDefault()
      console.log('handleSubmit')
      dispatch(actions.submitLogin)
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(form)
