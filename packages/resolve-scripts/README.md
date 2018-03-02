# resolve-scripts

## Configuration File
The resolve.config.json file contains information for your application. 

```ts
type ConfigSchema = {
    index?: Path, // Template react.render() or reactNative.render() [default: 'client/index.js'],
    createStore?: Path, // Path to the redux store
    routes?: Path, // Path to the static route configuration [default: 'client/routes.js']
    distDir?: Path, // Path to the dist directory [default: 'dist']
    rootPath?: Path, // Path to the root directory [default: '']
    staticDir?: Path, // Path to the static directory [default: 'static']
    staticPath?: Path', // Path to the static [default: '/static']
    aggregates?: Path, // Path to the aggregates directory [default: 'common/aggregates']
    viewModels?: Path, // Path to the view models directory [default: 'common/view-models']
    readModels?: Path, // Path to the read models directory [default: 'common/read-models']
    bus?: AdapterSchema, // [default: { adapter: 'resolve-bus-memory' }]
    storage?: AdapterSchema, // [default: { adapter: 'resolve-storage-lite' }]
    subscribe?: AdapterSchema, // [default: { adapter: 'resolve-subscribe-socket-io' }],
    auth?: Array<AdapterSchema>, // [default: { adapter: 'resolve-auth-local' }]
    jwt?: JWTSchema, // [default: { cookieName: 'authenticationToken', secret: 'auth-secret', options: { maxAge: 1000 * 60 * 60 * 24 * 365 } }]
    env?: Map<EnvKey, ConfigSchema> // [default: {}]
};

type AdapterSchema = {
    adapter: String, // find node_modules/${adapter} or absolute path to file
    options: Object // [default: {}]
};

type JWTSchema = {
    cookieName? : String, // [default: 'authenticationToken'] 
    secret?: String, // [default: 'auth-secret']
    options: {
        maxAge?: Integer, // [default: 1000 * 60 * 60 * 24 * 365] // 1 year
    }
}

type Path = String;

type EnvKey = String;
```
