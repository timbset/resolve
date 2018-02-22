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
      }
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
      }
    },
    config: {
      type: 'object',
      properties: {
        index: {
          type: 'string'
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
        }
      }
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
      }
    }
  }
}
