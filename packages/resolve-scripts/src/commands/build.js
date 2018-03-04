import table from '../table'
import webpack from '../webpack'

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
          ['watch', 'false'],
          ['start', 'false'],
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
    .option('dev', options.dev)
    .option('prod', options.prod)
    .option('watch', options.watch)
    .option('start', options.start)
    .option('host', options.host)
    .option('port', options.port)
    .option('inspect', options.inspect)
    .option('config', options.config)
    .option('print-config', options.printConfig)
    .option('root-path', options.rootPath)
    .implies('host', 'start')
    .implies('port', 'start')
    .implies('inspect', 'start')
    .conflicts('dev', 'prod')
    .check(argv => {
      process.env.BUILD = argv.build = true
      return buildOptions(
        [
          optionBuilders.mode,
          optionBuilders.start,
          optionBuilders.watch,
          optionBuilders.config,
          optionBuilders.inspect,
          optionBuilders.host,
          optionBuilders.port,
          optionBuilders.rootPath
        ],
        argv
      )
    })

export const handler = options => webpack(options)
