import getConfig from './get_config'
import validateConfig from './validate_config'
import assignConfig from './assign_config'

export default function buildOptions(optionBuilders, argv) {
  const config = getConfig(argv.config)
  validateConfig(config)

  assignConfig(argv, config)

  for (const optionBuilder of optionBuilders) {
    const result = optionBuilder(argv, process.env, config)
    if (result !== true) {
      return result
    }
  }

  return true
}
