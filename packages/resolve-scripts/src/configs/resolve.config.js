import validateConfig from '../utils/validate_config'

const config = {
  // Webpack options
  mode: 'development',
  build: false,
  start: false,
  watch: false,
  // Subdirectory on HOST:PORT
  rootPath: '',
  host: '127.0.0.1',
  port: 3000,
  protocol: 'http',
  // CDN assets
  staticPath: '',
  // Debug Server
  inspectHost: '127.0.0.1',
  inspectPort: 9229,
  // Dirs
  staticDir: 'static',
  distDir: 'dist',
  // Files
  @file routes: 'client/routes.js',
  @file aggregates: 'common/aggregates/index.js',
  @file readModels: 'common/read-models/index.js',
  @file viewModels: 'common/view-models/index.js',
  @file index: 'client/index.js',
  @file auth: 'auth/index.js',
  redux: {
    @file store: 'client/store/index.js',
    @file reducers: 'client/reducers/index.js',
    @file middlewares: 'client/middlewares/index.js'
  },
  // Adapters
  storage: {
    @fileOrModule adapter: 'resolve-storage-lite',
    options: {
      pathToFile: 'storage.txt'
    }
  },
  bus: {
    @fileOrModule adapter: 'resolve-bus-memory',
    options: {}
  },
  subscribe: {
    @fileOrModule adapter: 'resolve-redux/dist/subscribe_adapter',
    options: {}
  },
  jwtCookie: {
    name: 'jwt',
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
  },
  registry: 'https://registry.resolve.coming.soon',
  // Config extensions
  env: {
    test: {
      storage: {
        adapter: 'resolve-storage-lite',
        options: {}
      }
    }
  },
  meta: {
    files: [],
    filesOrModules: []
  }
}

Object.defineProperty(config, 'meta', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: config.meta
})

validateConfig(config)

export default config

function file(obj, key, value) {
  obj[key] = value

  config.meta.files.push({ obj, key })

  return obj
}

function fileOrModule(obj, key, value) {
  obj[key] = value

  config.meta.filesOrModules.push({ obj, key })

  return obj
}

export const decorators = {
  file,
  fileOrModule
}
