import constants from '../constants'

const config = {}

Object.keys(constants.defaults).forEach(option => {
  const [key, value] = constants.defaults[option]
  const keys = key.split('.')
  let pointer = config
  for (let index = 0; index < keys.length - 1; index++) {
    if (!(keys[index] in pointer)) {
      pointer[keys[index]] = {}
    }
    pointer = pointer[keys[index]]
  }
  pointer[keys[keys.length - 1]] = JSON.parse(value)
})

export default config
