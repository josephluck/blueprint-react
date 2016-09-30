require('whatwg-fetch')
const apiRoot = 'http://localhost:3030'

const getApiUrl = function (url) {
  switch (url) {
    case 'login':
      return `${apiRoot}/auth/local`
    default :
      console.error(`
        Cannot find ${url} in URL config in Api.js
      `)
  }
}

module.exports = {
  get ({
    url
  }) {
    const apiUrl = getApiUrl(url)
    return new Promise((resolve, reject) => {
      fetch(apiUrl, {

      }).then((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    })
  },
  post ({
    url,
    body
  }) {
    const apiUrl = getApiUrl(url)
    return new Promise((resolve, reject) => {
      fetch(apiUrl, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((resp) => {
        resolve(resp)
      }, (err) => {
        reject(err)
      })
    })
  }
}
