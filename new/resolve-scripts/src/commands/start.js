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
    .option('host', options.host)
    .option('port', options.port)
    .option('inspect', options.inspect)
    .option('print-config', options.printConfig)
    .check(argv => {
      argv.build = false
      return (
        validators.mode(argv) &&
        validators.inspect(argv) &&
        validators.watch(argv) &&
        validators.config(argv)
      )
    })

export const handler = argv => {
  if (argv.argv.printConfig) {
    // eslint-disable-next-line
    console.log(JSON.stringify(argv, null, 3))
    return
  }
}
