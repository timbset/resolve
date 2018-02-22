import getConfig from './get_config'
import validateConfig from './validate_config'

export default function buildOptions(optionBuilders, argv) {
  const config = getConfig(argv.config)

  try {
    validateConfig(config)
  } catch (error) {
    return error
  }

  for (const optionBuilder of optionBuilders) {
    const result = optionBuilder(argv, config)
    if (result !== true) {
      return result
    }
  }

  return true
}
