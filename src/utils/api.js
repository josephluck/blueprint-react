const ApiRoot = 'http://localhost:3030'

module.exports = {
  getUrl: (key, options) => {
    switch (key) {
      case 'login':
        return `${ApiRoot}/auth/local`
    }
    console.error(`Couldn't find the key ${key} in the URL configuration`)
  }
}
