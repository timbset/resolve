import validateConfig from '../utils/validate_config'

export const files = []
export const filesOrModules = []

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
  @file('routes') routes: 'client/routes.js',
  @file('aggregates') aggregates: 'common/aggregates/index.js',
  @file('readModels') readModels: 'common/read-models/index.js',
  @file('viewModels') viewModels: 'common/view-models/index.js',
  @file('index') index: 'client/index.js',
  @file('auth') auth: 'auth/index.js',
  redux: {
    @file('redux.store') store: 'client/store/index.js',
    @file('redux.reducers') reducers: 'client/reducers/index.js',
    @file('redux.middlewares') middlewares: 'client/middlewares/index.js'
  },
  // Adapters
  storage: {
    @fileOrModule('storage.adapter') adapter: 'resolve-storage-lite',
    options: {
      pathToFile: 'storage.txt'
    }
  },
  bus: {
    @fileOrModule('bus.adapter') adapter: 'resolve-bus-memory'
  },
  subscribe: {
    @fileOrModule('subscribe.adapter')
    adapter: 'resolve-redux/dist/subscribe_adapter'
  },
  registry: 'https://registry.resolve.coming.soon',
  // Config extensions
  env: {
    test: {
      storage: {
        adapter: 'resolve-storage-lite'
      }
    }
  }
}

validateConfig(config)

export default config

function file(name) {
  files.push(name)
  return obj => obj
}

function fileOrModule(name) {
  filesOrModules.push(name)
  return obj => obj
}

export const decorators = {
  file,
  fileOrModule
}
