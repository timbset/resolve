import fs from 'fs'
import path from 'path'
import { isV4Format } from 'ip'

export default {
  mode(argv, env, config) {
    if (
      env.NODE_ENV &&
      ['development', 'production', 'test'].indexOf(env.NODE_ENV) === -1
    ) {
      return new Error(
        'Invalid environment variables: \n' +
          `NODE_ENV, Given: "${
            env.NODE_ENV
          }", Choices: "development", "production", "test"`
      )
    }
    env.NODE_ENV = env.NODE_ENV === 'production' ? 'production' : 'development'
    argv.mode = argv.prod ? 'production' : env.NODE_ENV
    env.NODE_ENV = argv.mode
    return true
  },

  inspect(argv, env, config) {
    if (env.INSPECT_PORT && !Number.isInteger(+env.INSPECT_PORT)) {
      return new Error(
        'Invalid environment variables: \n' +
          `INSPECT_PORT, Given: "${env.INSPECT_PORT}", Value must be an integer`
      )
    }
    if (env.INSPECT_HOST && !isV4Format(env.INSPECT_HOST)) {
      return new Error(
        'Invalid environment variables: \n' +
          `INSPECT_HOST, Given: "${env.INSPECT_HOST}", Value must be an IP v4"`
      )
    }

    if (argv.inspect === undefined) {
      if (env.INSPECT_PORT || env.INSPECT_HOST) {
        argv.inspect = ''
      } else {
        delete argv.inspect
        return true
      }
    }

    const inspectArgs = argv.inspect.split(':')
    if (inspectArgs.length === 1) {
      inspectArgs[1] = inspectArgs[0] || env.INSPECT_PORT || 9229
      inspectArgs[0] = env.INSPECT_HOST || '127.0.0.1'
    }
    const [ip, port] = inspectArgs

    delete argv.inspect
    argv.inspectHost = ip
    argv.inspectPort = +port
    env.INSPECT_HOST = argv.inspectHost
    env.INSPECT_PORT = argv.inspectPort

    if (!argv.start) {
      return new Error('Implications failed:\nhost -> start')
    }

    return isV4Format(ip) && Number.isInteger(+port)
  },

  host(argv, env, config) {
    if (!argv.start) {
      return true
    }
    argv.host = env.HOST = argv.host || env.HOST

    return true
  },

  port(argv, env, config) {
    if (!argv.start) {
      return true
    }
    if (env.PORT && !Number.isInteger(+env.PORT)) {
      return new Error(
        'Invalid environment variables: \n' +
          `PORT, Given: "${env.PORT}", Value must be an integer`
      )
    }

    if (argv.port && !Number.isInteger(+argv.port)) {
      return new Error(
        'Invalid arguments: \n' +
          `port, Given: "${argv.port}", Value must be an integer`
      )
    }

    argv.port = env.PORT = +(argv.port || env.PORT) || 3000

    return true
  },

  watch(argv, env, config) {
    if (env.WATCH && ['false', 'true'].indexOf(env.WATCH) === -1) {
      return new Error(
        'Invalid environment variables: \n' +
          `WATCH, Given: "${env.WATCH}", Choices: "false", "true"`
      )
    }
    argv.watch = argv.watch || env.WATCH === 'true'
    env.WATCH = argv.watch

    return true
  },

  start(argv, env, config) {
    if (env.START && ['false', 'true'].indexOf(env.START) === -1) {
      return new Error(
        'Invalid environment variables: \n' +
          `START, Given: "${env.START}", Choices: "false", "true"`
      )
    }
    argv.start = argv.start || env.START === 'true'
    env.START = argv.start

    return true
  },

  config(argv, env, config) {
    if (argv.config === undefined) {
      argv.config = 'resolve.config.json'
    }
    if (argv.config === 'resolve.config.json' || fs.existsSync(argv.config)) {
      env.CONFIG_PATH = argv.config
      return true
    }

    return new Error(
      `File does not exist: ${path.resolve(process.cwd(), argv.config)}`
    )
  },

  rootPath(argv, env, config) {
    if (argv.rootPath) {
      env.ROOT_PATH = argv.rootPath
    }

    env.ROOT_PATH = env.ROOT_PATH || ''

    if (/^https?:\/\//.test(env.ROOT_PATH)) {
      return new Error('Incorrect env.ROOT_PATH or argv.rootPath')
    }

    if (env.ROOT_PATH && !/\/$/.test(env.ROOT_PATH)) {
      env.ROOT_PATH = `${env.ROOT_PATH}/`
    }

    if (env.ROOT_PATH && !/^\//.test(env.ROOT_PATH)) {
      env.ROOT_PATH = `/${env.ROOT_PATH}`
    }

    argv.rootPath = env.ROOT_PATH

    return true
  }
}
