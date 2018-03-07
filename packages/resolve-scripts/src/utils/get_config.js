import fs from 'fs'

import defaultConfig from '../configs/resolve.config'
import extendConfig from './extend_config'
import resolveFile from './resolve_file'
import validateConfig from './validate_config'

export default function getConfig(options, env) {
  let localConfig = '{}'

  if (options.config) {
    localConfig = fs.readFileSync(
      resolveFile(
        options.config
      )
    )
  }

  localConfig = JSON.parse(localConfig)

  const config = {
    ...JSON.parse(JSON.stringify(defaultConfig)),
    ...localConfig
  }

  extendConfig(config, options, env)

  validateConfig(config)

  return config
}
