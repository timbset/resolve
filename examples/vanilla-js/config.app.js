const appConfig = {
  apiHandlers: [
    {
      path: '/:page*',
      controller: 'common/api-handlers/client.js',
      method: 'GET'
    }
  ]
}

export default appConfig
