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
      default: '127.0.0.1:9229',
      describe: 'Activate inspector on [host:]port',
      type: 'string'
    },
    config: {
      default: 'resolve.config.json',
      describe: 'Path to the resolve config',
      type: 'string'
    }
  },
  envTitle: 'Environment variables',
  env: {
    NODE_ENV: [
      'NODE_ENV',
      'Sets production/development mode',
      '[default: "development"]'
    ],
    ROOT_PATH: [
      'ROOT_PATH',
      "Sets the application's root path",
      '[default: ""]'
    ],
    HOST: ['HOST', 'Sets the IP address', '[default: "127.0.0.1"]'],
    PORT: ['PORT', 'Sets the port', '[default: "3000"]'],
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
