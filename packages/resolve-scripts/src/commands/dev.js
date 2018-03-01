import table from '../table'

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
import optionBuilders from '../option_builders'
import buildOptions from '../build_options'
import webpack from '../webpack'

export const command = 'dev'
export const desc = commands.dev
export const builder = yargs =>
  yargs
    .help('help')
    .epilogue(
      `${envTitle}:\n` +
        `${table([
          env.CONFIG_PATH,
          env.ROUTES_PATH,
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
          defaults.routes,
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
          defaults.storage,
          defaults.bus,
          defaults.subscribe,
          defaults.env
        ])}`
    )
    .option('host', options.host)
    .option('port', options.port)
    .option('inspect', options.inspect)
    .option('config', options.config)
    .option('print-config', options.printConfig)
    .check(argv => {
      process.env.NODE_ENV = argv.mode = 'development'
      process.env.START = argv.start = true
      process.env.BUILD = argv.build = true
      process.env.WATCH = argv.watch = true
      return buildOptions(
        [
          optionBuilders.config,
          optionBuilders.inspect,
          optionBuilders.host,
          optionBuilders.port
        ],
        argv
      )
    })

export const handler = options => webpack(options)
