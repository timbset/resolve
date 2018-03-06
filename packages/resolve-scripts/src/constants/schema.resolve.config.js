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
    jwt: {
      type: 'object',
      properties: {
        cookieName: {
          type: 'string'
        },
        secret: {
          type: 'string'
        },
        options: {
          type: 'object',
          properties: {
            maxAge: {
              type: 'integer'
            }
          }
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
        mode: {
          type: 'string',
          enum: ['development', 'production', 'test']
        },
        build: {
          type: 'boolean'
        },
        start: {
          type: 'boolean'
        },
        watch: {
          type: 'boolean'
        },
        inspectHost: {
          type: 'string'
        },
        inspectPort: {
          type: 'integer'
        },
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
          type: 'array',
          items: {
            $ref: '#/definitions/adapter'
          }
        },
        jwt: {
          $ref: '#/definitions/jwt'
        },
        registry: {
          type: 'string'
        }
      }
      //additionalProperties: false
    }
  },
  $ref: '#/definitions/config',
  additionalProperties: {
    env: {
      type: 'object',
      properties: {
        development: { $ref: '#/definitions/config' },
        production: { $ref: '#/definitions/config' },
        test: { $ref: '#/definitions/config' }
      },
      additionalProperties: false
    }
  }
}
