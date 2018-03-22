export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  definitions: {
    adapter: {
      type: 'object',
      properties: {
        adapter: {
          type: 'string'
        },
        options: {
          type: 'object'
        }
      },
      additionalProperties: false
    },
    jwtCookie: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        maxAge: {
          type: 'integer'
        }
      },
      additionalProperties: false
    },
    redux: {
      type: 'object',
      properties: {
        store: {
          type: 'string'
        },
        reducers: {
          type: 'string'
        },
        middlewares: {
          type: 'string'
        }
      },
      additionalProperties: false
    },
    config: {
      type: 'object',
      properties: {
        index: {
          type: 'string'
        },
        redux: {
          $ref: '#/definitions/redux'
        },
        routes: {
          type: 'string'
        },
        distDir: {
          type: 'string'
        },
        rootPath: {
          type: 'string'
        },
        staticDir: {
          type: 'string'
        },
        staticPath: {
          type: 'string'
        },
        aggregates: {
          type: 'string'
        },
        viewModels: {
          type: 'string'
        },
        readModels: {
          type: 'string'
        },
        sagas: {
          type: 'string'
        },
        bus: {
          $ref: '#/definitions/adapter'
        },
        storage: {
          $ref: '#/definitions/adapter'
        },
        subscribe: {
          $ref: '#/definitions/adapter'
        },
        auth: {
          type: 'string'
        },
        jwtCookie: {
          $ref: '#/definitions/jwtCookie'
        },
        registry: {
          type: 'string'
        },
        env: {
          type: 'object',
          properties: {
            development: { $ref: '#/definitions/config' },
            production: { $ref: '#/definitions/config' },
            test: { $ref: '#/definitions/config' }
          },
          additionalProperties: false
        }
      },
      additionalProperties: false
    }
  },
  $ref: '#/definitions/config'
}
