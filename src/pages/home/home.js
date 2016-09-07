const render = require('choo/html')
const sheetify = require('sheetify')
const TopBar = require('../../elements/top_bar')

module.exports = (state, prev, send) => {
  console.log(state.resources.resources)
  const loadResources = () => {
    send('resources:get', {

    })
  }
  const HomePageStyles = sheetify `
    div {
    }
  `
  return render `
    <div onload=${loadResources}
      class=${HomePageStyles}>
      ${TopBar(state, prev, send)}

      List of resources here
    </div>
  `
}
