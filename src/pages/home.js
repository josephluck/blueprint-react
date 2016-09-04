const render = require('choo/html')
const sheetify = require('sheetify')

const TopBar = (state, prev, send) => {
  const onLogoutClick = (e) => {
    e.preventDefault()
    send('session:logout')
  }
  const TopBarStyles = sheetify `
    div {
      text-align: center;
    }
  `
  return render `
    <div class=${TopBarStyles}>
      Top bar

      <a onclick=${onLogoutClick}>
        Logout
      </a>
    </div>
  `
}

module.exports = (state, prev, send) => {
  const HomePageStyles = sheetify `
    div {
      text-align: center;
    }
  `
  return render `
    <div class=${HomePageStyles}>
      ${TopBar(state, prev, send)}
    </div>
  `
}
