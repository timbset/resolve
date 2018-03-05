module.exports = {
  commands: {
    build: 'Builds the app to the build directory',
    dev: 'Runs the app in the development mode',
    start: 'Runs the app from the build directory',
    lint: 'Check the source code for syntax errors and potential issues',
    testFunctional: 'Runs unit tests with TestCafe',
    testUnit: 'Runs unit tests with Jest',
    update:
      'Updates all resolve packages to the latest version according to semver'
  },
  options: {
    dev: {
      default: undefined,
      describe: "Sets options.mode and process.env.NODE_ENV to 'development'",
      type: 'boolean'
    },
    prod: {
      default: undefined,
      describe: "Sets options.mode and process.env.NODE_ENV to 'production'",
      type: 'boolean'
    },
    watch: {
      default: undefined,
      describe: 'Watch the filesystem for changes',
      type: 'boolean'
    },
    start: {
      default: undefined,
      describe:
        "Automatically start your server once Webpack's build completes",
      type: 'boolean'
    },
    inspect: {
      default: undefined,
      describe: 'Activate inspector on [host:]port',
      type: 'string'
    },
    host: {
      default: undefined,
      describe: `Sets the application's hostname`,
      type: 'string'
    },
    port: {
      default: undefined,
      describe: `Sets the application's port`,
      type: 'number'
    },
    config: {
      default: undefined,
      describe: 'Sets the path to resolve config',
      type: 'string'
    },
    rootPath: {
      default: undefined,
      describe: `Sets the application's root path`,
      type: 'string'
    },
    printConfig: {
      default: undefined,
      describe: 'Print the full configuration',
      type: 'boolean'
    }
  },
  defaultsTitle: 'Defaults',
  defaults: {
    mode: ['mode', '"development"'],
    config: ['config', '"resolve.config.json"'],
    rootPath: ['rootPath', '""'],
    staticDir: ['staticDir', '"static"'],
    staticPath: ['staticPath', '""'],
    distDir: ['distDir', '"dist"'],
    host: ['host', '"127.0.0.1"'],
    port: ['port', 3000],
    inspectHost: ['inspectHost', '"127.0.0.1"'],
    inspectPort: ['inspectPort', 9229],
    aggregates: ['aggregates', '"common/aggregates/index.js"'],
    readModels: ['readModels', '"common/read-models/index.js"'],
    viewModels: ['viewModels', '"common/view-models/index.js"'],
    index: ['index', '"client/index.js"'],
    reduxStore: ['redux.store', '"client/store/index.js"'],
    reduxReducers: ['redux.reducers', '"client/reducers/index.js"'],
    reduxMiddlewares: ['redux.middlewares', '"client/middlewares/index.js"'],
    routes: ['routes', '"client/routes.js"'],
    storage: [
      'storage',
      '{"adapter":"resolve-storage-lite","params":{"pathToFile":"storage.txt"}}'
    ],
    bus: ['bus', '{"adapter":"resolve-bus-memory"}'],
    subscribe: [
      'subscribe',
      '{"adapter":"resolve-redux/dist/subscribe_adapter"}'
    ],
    env: ['env', '{"test":{"storage":{"adapter":"resolve-storage-lite"}}}'],
    registry: ['registry', '"https://registry.resolve.coming.soon"']
  },
  envTitle: 'Environment variables',
  env: {
    NODE_ENV: ['NODE_ENV', 'Sets production/development mode'],
    WATCH: ['WATCH', 'Watch the filesystem for changes'],
    START: [
      'START',
      `Automatically start your server once Webpack's build completes`
    ],
    ROOT_PATH: ['ROOT_PATH', "Sets the application's root path"],
    ROUTES_PATH: [
      'ROUTES_PATH',
      'Sets the path to the static route configuration)'
    ],
    INDEX_PATH: ['INDEX_PATH', 'Sets the path to the application entry file'],
    HOST: ['HOST', 'Sets the IP address'],
    PORT: ['PORT', 'Sets the port'],
    CONFIG_PATH: ['CONFIG_PATH', 'Path to the resolve config'],
    DIST_DIR: ['DIST_DIR', 'Sets the dist directory'],
    STATIC_DIR: ['STATIC_DIR', 'Sets the static directory'],
    STATIC_PATH: ['STATIC_PATH', 'Sets the static path'],
    AGGREGATES_DIR: ['AGGREGATES_DIR', 'Sets the aggregates directory'],
    VIEW_MODELS_DIR: ['VIEW_MODELS_DIR', 'Sets the view models directory'],
    READ_MODELS_DIR: ['READ_MODELS_DIR', 'Sets the read models directory'],
    INSPECT_HOST: ['INSPECT_HOST', 'Sets the inspector host'],
    INSPECT_PORT: ['INSPECT_PORT', 'Sets the inspector port'],
    REGISTRY: ['REGISTRY', 'Sets the resolve registry'],
    TOKEN: ['TOKEN', 'Sets the authorization token']
  },
  customEnvTitle: 'Custom Environment Variables',
  customEnvText:
    'You can pass custom env variables to the client side. ' +
    'To do this, use the RESOLVE_ prefix when naming a variable. ' +
    'After that, this variable is available on the client and ' +
    'server side via the process.env object'
}
