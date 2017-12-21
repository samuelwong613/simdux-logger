export default {
  colors: {
    title: '#00f',
    key: '#333',
    time: '#777',
    prevState: '#9E9E9E',
    nextState: '#4CAF50',
  },
  logger: console,
  collapsed: true,
  timestamp: true,
  level: 'log',
  title: 'Simdux',
  stateTransformer: s => s,
  blacklist: [],
  whitelist: [],
}