const appConfig = {
  apiHandlers: [
    {
      path: '/:page*',
      method: 'GET',
      controller: 'common/api-handlers/client.js'
    }
  ],
  aggregates: [
    {
      name: 'counter',
      commands: 'common/aggregates/counter.commands.js'
    }
  ],
  viewModels: [
    {
      name: 'counterViewModel',
      projection: 'common/view-models/counter.projection.js'
    }
  ],
  readModels: [
    {
      name: 'counterReadModel',
      connectorName: 'default',
      projection: 'common/read-models/counter.projection.js',
      resolvers: 'common/read-models/counter.resolvers.js'
    }
  ]
}

export default appConfig
