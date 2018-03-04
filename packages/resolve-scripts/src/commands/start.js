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

export const command = 'start'
export const desc = commands.build
export const builder = yargs =>
  yargs
    .help('help')
    .epilogue(
      `${envTitle}:\n` +
        `${table([env.HOST, env.PORT, env.INSPECT_HOST, env.INSPECT_PORT])}\n` +
        `${customEnvTitle}:\n` +
        `  ${customEnvText}\n\n` +
        `${defaultsTitle}:\n` +
        `${table([
          defaults.host,
          defaults.port,
          defaults.inspectHost,
          defaults.inspectPort
        ])}`
    )
    .option('inspect', options.inspect)
    .option('print-config', options.printConfig)
    .check(argv => {
      process.env.BUILD = argv.build = false
      process.env.START = argv.start = true
      process.env.WATCH = argv.watch = false
      return buildOptions([optionBuilders.inspect], argv)
    })

export const handler = options => webpack(options)
