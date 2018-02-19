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
import validate from '../helpers/validate'

export const command = 'build'
export const desc = commands.build
export const builder = yargs =>
  yargs
    .help('help')
    .epilogue(
      `${envTitle}:\n` +
        `${table([
          env.NODE_ENV,
          env.WATCH,
          env.START,
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
          ['watch', 'false'],
          ['start', 'false'],
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
          defaults.subscribeAdapter
        ])}`
    )
    .option('dev', options.dev)
    .option('prod', options.prod)
    .option('watch', options.watch)
    .option('start', options.start)
    .option('host', options.host)
    .option('port', options.port)
    .option('inspect', options.inspect)
    .option('config', options.config)
    .option('print-config', options.printConfig)
    .implies('host', 'start')
    .implies('port', 'start')
    .implies('inspect', 'start')
    .conflicts('dev', 'prod')
    .check(argv => {
      argv.build = true
      return validate(
        [
          validators.mode,
          validators.start,
          validators.watch,
          validators.config,
          validators.inspect
        ],
        argv
      )
    })

export const handler = argv => {
  if (argv.printConfig) {
    // eslint-disable-next-line
    console.log(JSON.stringify(argv, null, 3))
    return
  }
}
