import fs from 'fs'
import path from 'path'
import defaultConfig from '../configs/resolve.config'

export default function getConfig(configPath) {
  let localConfig = '{}'
  if (configPath) {
    localConfig = fs.readFileSync(
      path.resolve(
        process.cwd(),
        configPath || process.env.CONFIG_PATH || 'resolve.config.json'
      )
    )
  }
  localConfig = JSON.parse(localConfig)

  return {
    ...defaultConfig,
    ...localConfig
  }
}
