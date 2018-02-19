# resolve-scripts

## Config
```TypeScript
type ConfigSchema = {
    entryPoint: Path = 'client/entryPoint.js', // RootComponent or Routes
    index: Path = 'client/index.js', // Template react.render() or react-native.render()
    distDir: Path = 'dist', // Path to the dist directory
    staticDir: Path = 'static', // Path to the static directory
    staticPath: Path = 'static', // Path to the static
    aggregates: Path = 'common/aggregates', // Path to the aggregates directory
    viewModels: Path = 'common/view-models', // Path to the view models directory
    readModels: Path = 'common/read-models', // Path to the read models directory
    bus?: BusAdapter,
    storage?: StorageAdapter,
    subscribe?: SubscribeAdapter,
    auth?: Array<AuthAdapter>,
    env?: Map<String, ConfigSchema> = {}
}
```

```
type BusAdapter = {
    adapter: String = 'memory', // find node_modules/resolve-bus-${adapter} or absolute path to file
    options: Object = {}
}

type StorageAdapter = {
    adapter: String = 'lite', // find node_modules/resolve-storage-${adapter} or absolute path to file
    options: Object = {}
}

type SubscribeAdapter = {
    adapter: String = 'socket-io', // find node_modules/resolve-subscribe-${adapter} or absolute path to file
    options: Object = {}
}

type AuthAdapter = {
    adapter: String = 'local', // find node_modules/resolve-auth-${adapter} or absolute path to file
    options: Object = {}
}
```