import path from 'path'
import defaultConfig from '../configs/resolve.config'
import getArgs from './getArgs'

export default function getConfig() {
  const args = getArgs()

  const resolveConfigPath =
    args.config || process.env.CONFIG_PATH || 'resolve.config.json'

  let localConfig = '{}'
  try {
    localConfig = path.resolve(process.cwd(), resolveConfigPath)
  } catch (e) {}
  localConfig = JSON.parse(localConfig)

  return {
    ...defaultConfig,
    ...localConfig
  }
}
