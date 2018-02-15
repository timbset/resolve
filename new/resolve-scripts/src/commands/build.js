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
    .option('inspect', options.inspect)
    .option('config', options.config)
    .conflicts('dev', 'prod')
    .check(
      argv =>
        validators.mode(argv) &&
        validators.inspect(argv) &&
        validators.start(argv) &&
        validators.watch(argv) &&
        validators.config(argv)
    )

export const handler = argv => {
  // eslint-disable-next-line
  console.log(JSON.stringify(argv, null, 3))
}
