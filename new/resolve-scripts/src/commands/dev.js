import table from '../helpers/table'

import {
  commands,
  options,
  env,
  envTitle,
  customEnvText,
  customEnvTitle,
  defaults,
  defaultsTitle
} from '../constants/'
import validators from '../validators/'

export const command = 'dev'
export const desc = commands.dev
export const builder = yargs =>
  yargs
    .help('help')
    .epilogue(
      `${envTitle}:\n` +
        `${table([
          env.CONFIG_PATH,
          env.ENTRY_POINT,
          env.INDEX_PATH,
          env.ROOT_PATH,
          env.DIST_DIR,
          env.STATIC_DIR,
          env.STATIC_PATH,
          env.AGGREGATES_DIR,
          env.VIEW_MODELS_DIR,
          env.READ_MODELS_DIR,
          env.HOST,
          env.PORT,
          env.INSPECT_HOST,
          env.INSPECT_PORT
        ])}\n` +
        `${customEnvTitle}:\n` +
        `  ${customEnvText}\n\n` +
        `${defaultsTitle}:\n` +
        `${table([
          defaults.mode,
          ['watch', 'true'],
          ['start', 'true'],
          defaults.config,
          defaults.entryPoint,
          defaults.index,
          defaults.rootPath,
          defaults.distDir,
          defaults.staticDir,
          defaults.staticPath,
          defaults.aggregates,
          defaults.viewModels,
          defaults.readModels,
          defaults.host,
          defaults.port,
          defaults.inspectHost,
          defaults.inspectPort,
          defaults.storageAdapter,
          defaults.busAdapter,
          defaults.subscribeAdapter,
          defaults.registry
        ])}`
    )
    .option('host', options.host)
    .option('port', options.port)
    .option('inspect', options.inspect)
    .option('config', options.config)
    .option('print-config', options.printConfig)
    .check(argv => {
      argv.build = true
      argv.watch = true
      argv.dev = true
      argv.start = true
      return (
        validators.mode(argv) &&
        validators.inspect(argv) &&
        validators.start(argv) &&
        validators.watch(argv) &&
        validators.config(argv)
      )
    })

export const handler = argv => {
  // eslint-disable-next-line
  console.log(JSON.stringify(argv, null, 3))
}
