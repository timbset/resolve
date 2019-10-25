import { declareRuntimeEnv } from 'resolve-scripts'

const devConfig = {
  target: 'local',
  port: declareRuntimeEnv('PORT', '3000'),
  // polyfills: ['@babel/polyfill'],
  mode: 'development',
  readModelConnectors: {
    default: {
      module: 'resolve-readmodel-lite',
      options: {
        databaseFile: 'data/read-model-default.db'
      }
    },
    hackerNews: {
      module: 'resolve-readmodel-lite',
      options: {
        databaseFile: 'data/read-model-hackerNews.db'
      }
    },
    // comments: {
    //   module: 'resolve-readmodel-lite',
    //   options: {
    //     databaseFile: 'data/read-model-comments.db'
    //   }
    // },
    elasticSearch: {
      module: 'common/read-models/elastic-search-connector.js',
      options: {
        /*
        host: 'localhost:9200'
        */
      }
    }
  },
  schedulers: {
    scheduler: {
      adapter: {
        module: 'resolve-scheduler-local',
        options: {}
      },
      connectorName: 'default'
    }
  }
}

export default devConfig
