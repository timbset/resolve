import constants from '../constants'

const config = {}

Object.keys(constants.defaults).forEach(option => {
  const [key, value] = constants.defaults[option]
  config[key] = JSON.parse(value)
})

export default config
