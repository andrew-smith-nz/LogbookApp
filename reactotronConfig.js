import Reactotron, { asyncStorage } from 'reactotron-react-native'

Reactotron
  .configure({ host: '192.168.0.2' }) // controls connection & communication settings
  .use(asyncStorage())
  .connect() // let's connect!