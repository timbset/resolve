const appConfig = {
  // apiHandlers: [
  //   {
  //     path: '/:page*',
  //     method: 'GET',
  //     controller: 'common/api-handlers/client.js'
  //   }
  // ],
  aggregates: [
    {
      name: 'Story',
      commands: 'common/aggregates/story.commands.js',
      projection: 'common/aggregates/story.projection.js'
    },
    {
      name: 'User',
      commands: 'common/aggregates/user.commands.js',
      projection: 'common/aggregates/user.projection.js'
    }
  ],
  readModels: [
    {
      name: 'HackerNews',
      projection: 'common/read-models/hacker-news.projection.js',
      resolvers: 'common/read-models/hacker-news.resolvers.js',
      connectorName: 'hackerNews'
    },
    {
      name: 'Search',
      projection: 'common/read-models/search.projection.js',
      resolvers: 'common/read-models/search.resolvers.js',
      connectorName: 'elasticSearch'
    }
  ],
  sagas: [
    {
      name: 'UserConfirmation',
      source: 'common/sagas/user-confirmation.saga.js',
      connectorName: 'default',
      schedulerName: 'scheduler'
    }
  ]
}

export default appConfig