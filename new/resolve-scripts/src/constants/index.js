module.exports = {
  commands: {
    build: 'Builds the app to the build directory',
    dev: 'Runs the app in the development mode',
    start: 'Runs the app from the build directory',
    lint: 'Check the source code for syntax errors and potential issues',
    printConfig: 'Print the full configuration',
    testFunctional: 'Runs unit tests with TestCafe',
    testUnit: 'Runs unit tests with Jest',
    update:
      'Updates all resolve packages to the latest version according to semver'
  },
  options: {
    dev: {
      default: undefined,
      describe: "Sets process.env.NODE_ENV to 'development'",
      type: 'boolean'
    },
    prod: {
      default: undefined,
      describe: "Sets process.env.NODE_ENV to 'production'",
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
      default: 'resolve.config.json',
      describe: 'Path to the resolve config',
      type: 'string'
    },
    printConfig: {
      default: undefined,
      describe: 'Print the full configuration',
      type: 'boolean'
    }
  },
  envTitle: 'Environment variables',
  env: {
    NODE_ENV: [
      'NODE_ENV',
      'Sets production/development mode',
      '[default: "development"]'
    ],
    WATCH: ['WATCH', 'Watch the filesystem for changes', '[default: "false"]'],
    START: [
      'START',
      `Automatically start your server once Webpack's build completes`,
      '[default: "false"]'
    ],
    ROOT_PATH: [
      'ROOT_PATH',
      "Sets the application's root path",
      '[default: ""]'
    ],
    ENTRY_POINT: [
      'ENTRY_POINT',
      'Sets the path to the static route configuration or the root component)',
      '[default: "client/entryPoint.js"]'
    ],
    INDEX_PATH: [
      'INDEX_PATH',
      'Sets the path to the application entry file',
      '[default: "client/index.js"]'
    ],
    HOST: ['HOST', 'Sets the IP address', '[default: "127.0.0.1"]'],
    PORT: ['PORT', 'Sets the port', '[default: "3000"]'],
    CONFIG_PATH: [
      'CONFIG_PATH',
      'Path to the resolve config',
      '[default: "resolve.config.json"]'
    ],
    DIST_DIR: ['DIST_DIR', 'Sets the dist directory', '[default: "dist"]'],
    STATIC_DIR: [
      'STATIC_DIR',
      'Sets the static directory',
      '[default: "static"]'
    ],
    STATIC_PATH: [
      'STATIC_PATH',
      'Sets the static path',
      '[default: "$ROOT_PATH/static"]'
    ],
    AGGREGATES_DIR: [
      'AGGREGATES_DIR',
      'Sets the aggregates directory',
      '[default: "common/aggregates"]'
    ],
    VIEW_MODELS_DIR: [
      'VIEW_MODELS_DIR',
      'Sets the view models directory',
      '[default: "common/read-models"]'
    ],
    READ_MODELS_DIR: [
      'READ_MODELS_DIR',
      'Sets the read models directory',
      '[default: "common/view-models"]'
    ],
    INSPECT_HOST: [
      'INSPECT_HOST',
      'Sets the inspector host',
      '[default: "127.0.0.1"]'
    ],
    INSPECT_PORT: [
      'INSPECT_PORT',
      'Sets the inspector port',
      '[default: 9229]'
    ],
    REGISTRY: [
      'REGISTRY',
      'Sets the resolve registry',
      '[default: "https://registry.resolve.com"]'
    ],
    TOKEN: ['  TOKEN', 'Sets the authorization token']
  },
  customEnvTitle: 'Custom Environment Variables',
  customEnvText:
    'You can pass custom env variables to the client side. ' +
    'To do this, use the RESOLVE_ prefix when naming a variable. ' +
    'After that, this variable is available on the client and ' +
    'server side via the process.env object'
}
