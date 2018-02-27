import constants from '../constants'

const config = {}

Object.keys(constants.defaults).forEach(option => {
  const [key, value] = constants.defaults[option]
  if (key.indexOf('.') === -1) {
    config[key] = JSON.parse(value)
  } else {
    const path = key.split('.')
    let pointer = config
    for (let index = 0; index < path.length - 1; index++) {
      pointer[path[index]] = {}
      pointer = pointer[path[index]]
    }
    pointer[path[path.length - 1]] = JSON.parse(value)
  }
})

export default config
