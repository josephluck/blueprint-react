export default {
  namespace: 'input',
  state: {
    title: 'my demo app'
  },
  reducers: {
    update: (data, state) => ({ title: data.payload })
  },
  effects: {
    update: (data, state, send) => (document.title = data.payload)
  }
}
