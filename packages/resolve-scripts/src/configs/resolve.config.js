export default {
  // Webpack mode
  mode: 'development',
  // Subdirectory on HOST:PORT
  rootPath: '',
  host: '127.0.0.1',
  port: 3000,
  // CDN assets
  staticPath: '',
  // Debug Server
  inspectHost: '127.0.0.1',
  inspectPort: 9229,
  // Path to client files
  staticDir: 'static',
  distDir: 'dist',
  routes: 'client/routes.js',
  aggregates: 'common/aggregates/index.js',
  readModels: 'common/read-models/index.js',
  viewModels: 'common/view-models/index.js',
  index: 'client/index.js',
  redux: {
    store: 'client/store/index.js',
    reducers: 'client/reducers/index.js',
    middlewares: 'client/middlewares/index.js'
  },
  // Adapters
  storage: {
    adapter: 'resolve-storage-lite',
    options: {
      pathToFile: 'storage.txt'
    }
  },
  bus: {
    adapter: 'resolve-bus-memory'
  },
  subscribe: {
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
