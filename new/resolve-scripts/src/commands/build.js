import table from '../helpers/table'

import {
  commands,
  options,
  env,
  envTitle,
  customEnvText,
  customEnvTitle
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
          env.DIST_DIR,
          env.STATIC_DIR,
          env.STATIC_PATH,
          env.AGGREGATES_DIR,
          env.VIEW_MODELS_DIR,
          env.READ_MODELS_DIR,
          env.INSPECT_HOST,
          env.INSPECT_PORT
        ])}\n` +
        `${customEnvTitle}:\n` +
        `  ${customEnvText}`
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
    .conflicts('dev', 'prod')
    .check(argv => {
      argv.build = true
      return validate(
        [
          validators.mode,
          validators.start,
          validators.watch,
          validators.config,
          validators.inspect,
          validators.host,
          validators.port
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
