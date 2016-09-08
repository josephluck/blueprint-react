const React = require('react')
const connect = require('react-redux').connect
const styles = require('./counter.css')

class Counter extends React.Component {
  render () {
    return (
      <div className={styles.counter}>
        <button
          className={styles.button}
          onClick={this.props.increment}
        >
          {'Increment'}
        </button>
        <h1>
          {this.props.count}
        </h1>
        <button
          onClick={this.props.decrement}
        >
          {'Decrement'}
        </button>
      </div>
    )
  }
}

Counter.propTypes = {
  increment: React.PropTypes.func,
  decrement: React.PropTypes.func,
  count: React.PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    count: state.counter.count
  }
}

const mapDispatchToProps = (dispatch) => {
  const actions = require('./actions')
  return {
    increment () {
      return dispatch(actions.increment)
    },
    decrement () {
      return dispatch(actions.decrement)
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Counter)
