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
import webpack from '../webpack'

export const command = 'start'
export const desc = commands.build
export const builder = yargs =>
  yargs
    .help('help')
    .epilogue(
      `${envTitle}:\n` +
        `${table([env.INSPECT_HOST, env.INSPECT_PORT])}\n` +
        `${customEnvTitle}:\n` +
        `  ${customEnvText}\n\n` +
        `${defaultsTitle}:\n` +
        `  ${defaults}`
    )
    .option('inspect', options.inspect)
    .option('print-config', options.printConfig)

export const handler = options => webpack({
  ...options,
  build: false,
  start: true,
  watch: false
})
