export default {
  namespace: 'App',
  state: {
    title: 'my demo app'
  },
  reducers: {
    actuallyDoUpdate: (data, state) => {
      console.log(data)
      return {
        title: data.payload
      }
    }
  },
  effects: {
    updateText: function (data, state, send, done) {
      console.log(data.payload)
      send('App:actuallyDoUpdate', data, done)
    }
  }
}
