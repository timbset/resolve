const appConfig = {
  apiHandlers: [
    {
      path: '/:page*',
      method: 'GET',
      controller: 'common/api-handlers/client.js'
    }
  ]
}

export default appConfig
