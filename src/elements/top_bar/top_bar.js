const render = require('choo/html')
const sheetify = require('sheetify')

module.exports = (state, prev, send) => {
  const onLogoutClick = (e) => {
    e.preventDefault()
    send('session:logout')
  }
  const TopBarStyles = sheetify `
    div {

    }
  `
  return render `
    <div class=${TopBarStyles}>
      <div class="p1 mb1 flex border-bottom">
        <span class="flex-auto">
          Top bar
        </span>

        <a onclick=${onLogoutClick}>
          Logout
        </a>
      </div>
    </div>
  `
}
