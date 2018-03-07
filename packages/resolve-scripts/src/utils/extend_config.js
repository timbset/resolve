import path from 'path'
import { isV4Format } from 'ip'

import defaultConfig from '../configs/resolve.config'
import resolveFile from './resolve_file'

export const extenders = []

extenders.push(mode)
export function mode(config, options, env) {
  if (
    env.NODE_ENV &&
    ['development', 'production', 'test'].indexOf(env.NODE_ENV) !== -1
  ) {
    config.mode = env.NODE_ENV
  } else if (env.NODE_ENV) {
    throw new Error(
      'Invalid environment variables: \n' +
        `NODE_ENV, Given: "${
          env.NODE_ENV
        }", Choices: "development", "production", "test"`
    )
  }
  if (options.dev) {
    config.mode = 'development'
  } else if (options.prod) {
    config.mode = 'production'
  }
  env.NODE_ENV = config.mode
}

extenders.push(inspect)
export function inspect(config, options, env) {
  if (env.INSPECT_PORT && !Number.isInteger(+env.INSPECT_PORT)) {
    return new Error(
      'Invalid environment variables: \n' +
        `INSPECT_PORT, Given: "${env.INSPECT_PORT}", Value must be an integer`
    )
  } else if (env.INSPECT_PORT) {
    config.inspectPort = env.INSPECT_PORT
  }
  if (env.INSPECT_HOST && !isV4Format(env.INSPECT_HOST)) {
    throw new Error(
      'Invalid environment variables: \n' +
        `INSPECT_HOST, Given: "${env.INSPECT_HOST}", Value must be an IP v4"`
    )
  } else if (env.INSPECT_HOST) {
    config.inspectHost = env.INSPECT_HOST
  }

  if ((options.inspect === '' || options.inspect) && !options.start) {
    throw new Error('Implications failed:\ninspect -> start')
  }

  if (options.inspect !== undefined) {
    const inspectArgs = options.inspect.split(':')
    if (inspectArgs.length === 1) {
      inspectArgs[1] =
        inspectArgs[0] || env.INSPECT_PORT || defaultConfig.inspectPort
      inspectArgs[0] = env.INSPECT_HOST || defaultConfig.inspectHost
    }
    const [ip, port] = inspectArgs
    config.inspectHost = ip
    config.inspectPort = +port
    if (
      !Number.isInteger(config.inspectPort) ||
      !isV4Format(config.inspectHost)
    ) {
      throw new Error(
        'Invalid options: \n' +
          `inspect, Given: "${options.inspect}", Value must be "[[IP v4:]PORT]"`
      )
    }
  }
  env.INSPECT_HOST = config.inspectHost
  env.INSPECT_PORT = config.inspectPort
}

extenders.push(host)
export function host(config, options, env) {
  if (env.HOST) {
    config.host = env.HOST
  }
  if (options.host) {
    config.host = options.host
  }
  env.HOST = config.host

  // config.port
  if (env.PORT) {
    config.port = +env.PORT
  }
  if (options.port) {
    config.port = +options.port
  }
  if (!Number.isInteger(config.port)) {
    throw new Error(
      'Invalid options: \n' +
        `port, Given: "${options.port}", Value must be an integer`
    )
  }
  env.PORT = config.port
}

extenders.push(watch)
export function watch(config, options, env) {
  if (env.WATCH && ['false', 'true'].indexOf(env.WATCH) === -1) {
    return new Error(
      'Invalid environment variables: \n' +
        `WATCH, Given: "${env.WATCH}", Choices: "false", "true"`
    )
  } else if (env.WATCH) {
    config.watch = env.WATCH == 'true'
  }
  if (options.watch) {
    config.watch = options.watch
  }
  env.WATCH = config.watch
}

extenders.push(start)
export function start(config, options, env) {
  if (env.START && ['false', 'true'].indexOf(env.START) === -1) {
    return new Error(
      'Invalid environment variables: \n' +
        `START, Given: "${env.START}", Choices: "false", "true"`
    )
  } else if (env.START) {
    config.start = env.START == 'true'
  }
  if (options.start) {
    config.start = options.start
  }
  env.START = config.start
}

extenders.push(build)
export function build(config, options, env) {
  if (env.BUILD && ['false', 'true'].indexOf(env.BUILD) === -1) {
    return new Error(
      'Invalid environment variables: \n' +
        `START, Given: "${env.BUILD}", Choices: "false", "true"`
    )
  } else if (env.BUILD) {
    config.build = env.BUILD == 'true'
  }
  if (options.build) {
    config.build = options.build
  }
  env.BUILD = config.build
}

extenders.push(rootPath)
export function rootPath(config, options, env) {
  if (env.ROOT_PATH) {
    config.rootPath = env.ROOT_PATH
  }
  if (options.rootPath) {
    config.rootPath = options.rootPath
  }
  env.ROOT_PATH = config.rootPath
}

extenders.push(index)
export function index(config, options, env) {
  if (env.INDEX_PATH) {
    config.index = env.INDEX_PATH
  }
  if (options.index) {
    config.index = options.index
  }
  if (config.index === defaultConfig.index) {
    try {
      resolveFile(config.index)
    } catch (e) {
      config.index = path.resolve(__dirname, '../client/index.js')
    }
  }
  env.INDEX_PATH = config.index
}

extenders.push(env)
export function env(config, options, env) {
  if (config.env && config.env[config.mode]) {
    const configEnv = config.env[config.mode]
    Object.assign(config, configEnv)
  }
  delete config.env
}

extenders.push(config)
export function config(config, options, env) {
  if (env.CONFIG_PATH) {
    config.config = env.CONFIG_PATH
  }
  if (options.config) {
    config.config = options.config
  }
  env.CONFIG_PATH = config.config
  delete config.config
}

export default function extendConfig(config, options, env) {
  for (const extender of extenders) {
    extender(config, options, env)
  }
}
