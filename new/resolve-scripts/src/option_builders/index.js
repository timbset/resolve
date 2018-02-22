import fs from 'fs'
import path from 'path'
import { isV4Format } from 'ip'

export default {
  mode(argv) {
    if (
      process.env.NODE_ENV &&
      ['development', 'production', 'test'].indexOf(process.env.NODE_ENV) === -1
    ) {
      return new Error(
        'Invalid environment variables: \n' +
          `NODE_ENV, Given: "${
            process.env.NODE_ENV
          }", Choices: "development", "production", "test"`
      )
    }
    process.env.NODE_ENV =
      process.env.NODE_ENV === 'production' ? 'production' : 'development'
    argv.mode = argv.prod ? 'production' : process.env.NODE_ENV
    process.env.NODE_ENV = argv.mode
    return true
  },

  inspect(argv) {
    if (
      process.env.INSPECT_PORT &&
      !Number.isInteger(+process.env.INSPECT_PORT)
    ) {
      return new Error(
        'Invalid environment variables: \n' +
          `INSPECT_PORT, Given: "${
            process.env.INSPECT_PORT
          }", Value must be an integer`
      )
    }
    if (process.env.INSPECT_HOST && !isV4Format(process.env.INSPECT_HOST)) {
      return new Error(
        'Invalid environment variables: \n' +
          `INSPECT_HOST, Given: "${
            process.env.INSPECT_HOST
          }", Value must be an IP v4"`
      )
    }

    if (argv.inspect === undefined) {
      if (process.env.INSPECT_PORT || process.env.INSPECT_HOST) {
        argv.inspect = ''
      } else {
        delete argv.inspect
        return true
      }
    }

    const inspectArgs = argv.inspect.split(':')
    if (inspectArgs.length === 1) {
      inspectArgs[1] = inspectArgs[0] || process.env.INSPECT_PORT || 9229
      inspectArgs[0] = process.env.INSPECT_HOST || '127.0.0.1'
    }
    const [ip, port] = inspectArgs

    delete argv.inspect
    argv.inspectHost = ip
    argv.inspectPort = +port
    process.env.INSPECT_HOST = argv.inspectHost
    process.env.INSPECT_PORT = argv.inspectPort

    if (!argv.start) {
      return new Error('Implications failed:\nhost -> start')
    }

    return isV4Format(ip) && Number.isInteger(+port)
  },

  watch(argv) {
    if (
      process.env.WATCH &&
      ['false', 'true'].indexOf(process.env.WATCH) === -1
    ) {
      return new Error(
        'Invalid environment variables: \n' +
          `WATCH, Given: "${process.env.WATCH}", Choices: "false", "true"`
      )
    }
    argv.watch = argv.watch || process.env.WATCH === 'true'
    process.env.WATCH = argv.watch

    return true
  },

  start(argv) {
    if (
      process.env.START &&
      ['false', 'true'].indexOf(process.env.START) === -1
    ) {
      return new Error(
        'Invalid environment variables: \n' +
          `START, Given: "${process.env.START}", Choices: "false", "true"`
      )
    }
    argv.start = argv.start || process.env.START === 'true'
    process.env.START = argv.start

    return true
  },

  config(argv) {
    if (argv.config === undefined) {
      argv.config = 'resolve.config.json'
    }
    if (argv.config === 'resolve.config.json' || fs.existsSync(argv.config)) {
      process.env.CONFIG_PATH = argv.config
      return true
    }

    return new Error(
      `File does not exist: ${path.resolve(process.cwd(), argv.config)}`
    )
  }
}
