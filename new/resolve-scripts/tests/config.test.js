import fs from 'fs'
import path from 'path'
import exec from './exec'
import getConfig from '../src/helpers/get_config'
import validateСonfig from '../src/helpers/validate_config'

describe('validate schema', () => {
  it('empty', () => {
    expect(validateСonfig({})).toBeTruthy()
  })

  it('custom storage adapter', () => {
    expect(
      validateСonfig({
        storage: {
          adapter: 'resolve-storage-mongo',
          options: {
            collectionName: 'MyEvents'
          }
        }
      })
    ).toBeTruthy()
  })

  it('custom bus adapter', () => {
    expect(
      validateСonfig({
        storage: {
          adapter: 'resolve-bus-rabbitmq'
        }
      })
    ).toBeTruthy()
  })

  it('custom subscribe adapter', () => {
    expect(
      validateСonfig({
        subscribe: {
          adapter: 'resolve-subscribe-mqtt'
        }
      })
    ).toBeTruthy()
  })

  it('custom root path', () => {
    expect(
      validateСonfig({
        rootPath: '/my-app'
      })
    ).toBeTruthy()
  })

  it('custom static path', () => {
    expect(
      validateСonfig({
        staticPath: 'https://my-cdn'
      })
    ).toBeTruthy()
  })

  it('custom routes path', () => {
    expect(
      validateСonfig({
        routes: 'src/client/entryPoint.js'
      })
    ).toBeTruthy()
  })

  it('custom index path', () => {
    expect(
      validateСonfig({
        index: 'src/client/index.js'
      })
    ).toBeTruthy()
  })

  it('custom aggregates dir', () => {
    expect(
      validateСonfig({
        aggregates: 'my-aggregates'
      })
    ).toBeTruthy()
  })

  it('custom view models dir', () => {
    expect(
      validateСonfig({
        viewModels: 'my-view-models'
      })
    ).toBeTruthy()
  })

  it('custom read models dir', () => {
    expect(
      validateСonfig({
        readModels: 'my-read-models'
      })
    ).toBeTruthy()
  })

  it('custom static dir', () => {
    expect(
      validateСonfig({
        staticDir: 'my-static-dir'
      })
    ).toBeTruthy()
  })

  it('custom auth', () => {
    expect(
      validateСonfig({
        auth: [
          {
            adapter: 'resolve-auth-local',
            options: {
              hash: 'sha1024'
            }
          },
          {
            adapter: 'resolve-auth-google'
          }
        ]
      })
    ).toBeTruthy()
  })

  it('custom jwt', () => {
    expect(
      validateСonfig({
        jwt: {
          cookieName: 'authToken',
          secret: 'some-secret',
          options: {
            maxAge: 1000 * 60 * 60 * 24 * 365
          }
        }
      })
    ).toBeTruthy()
  })

  it('custom env', () => {
    expect(
      validateСonfig({
        subscribe: {
          adapter: 'resolve-subscribe-socket-io'
        },
        env: {
          production: {
            subscribe: {
              adapter: 'resolve-subscribe-mqtt'
            }
          }
        }
      })
    ).toBeTruthy()
  })
})

describe('validate schema (fail)', () => {
  it('incorrect storage adapter', () => {
    expect(() =>
      validateСonfig({
        storage: {
          adapter: 123,
          options: {
            collectionName: 'MyEvents'
          }
        }
      })
    ).toThrow()
  })

  it('incorrect bus adapter', () => {
    expect(() =>
      validateСonfig({
        storage: {
          adapter: 123
        }
      })
    ).toThrow()
  })

  it('incorrect subscribe adapter', () => {
    expect(() =>
      validateСonfig({
        subscribe: {
          adapter: 123
        }
      })
    ).toThrow()
  })

  it('incorrect root path', () => {
    expect(() =>
      validateСonfig({
        rootPath: 123
      })
    ).toThrow()
  })

  it('incorrect static path', () => {
    expect(() =>
      validateСonfig({
        staticPath: 123
      })
    ).toThrow()
  })

  it('incorrect routes path', () => {
    expect(() =>
      validateСonfig({
        routes: 123
      })
    ).toThrow()
  })

  it('incorrect aggregates dir', () => {
    expect(() =>
      validateСonfig({
        aggregates: 123
      })
    ).toThrow()
  })

  it('incorrect view models dir', () => {
    expect(() =>
      validateСonfig({
        viewModels: 123
      })
    ).toThrow()
  })

  it('incorrect read models dir', () => {
    expect(() =>
      validateСonfig({
        readModels: 123
      })
    ).toThrow()
  })

  it('incorrect static dir', () => {
    expect(() =>
      validateСonfig({
        staticDir: 123
      })
    ).toThrow()
  })

  it('incorrect auth', () => {
    expect(() =>
      validateСonfig({
        auth: [
          {
            adapter: 123,
            options: {
              hash: 'sha1024'
            }
          },
          {
            adapter: 'resolve-auth-google'
          }
        ]
      })
    ).toThrow()
  })

  it('incorrect jwt', () => {
    expect(() =>
      validateСonfig({
        jwt: {
          cookieName: 123,
          secret: 'some-secret',
          options: {
            maxAge: 1000 * 60 * 60 * 24 * 365
          }
        }
      })
    ).toThrow()
  })
})

describe('resolve-scripts build --config=resolve-test-config.json', () => {
  const resolveConfigPath = path.resolve(__dirname, 'resolve-test-config.json')

  const resolveTestConfig = {
    index: 'client/custom-index.js',
    viewModels: 'common/customViewModels',
    readModels: 'common/customReadModels',
    storage: {
      adapter: 'custom-storage'
    },
    bus: {
      adapter: 'custom-bus'
    },
    env: {
      development: {
        bus: {
          adapter: 'custom-development-bus'
        }
      },
      production: {
        subscribe: {
          adapter: 'custom-subscribe-adapter'
        }
      }
    }
  }

  beforeEach(() => {
    fs.writeFileSync(
      resolveConfigPath,
      JSON.stringify(resolveTestConfig, null, 3),
      { flag: 'w+' }
    )
  })

  afterEach(() => {
    fs.unlinkSync(resolveConfigPath)
  })

  test('getConfig("resolve-test-config.json") should works correctly', () => {
    expect(getConfig(resolveConfigPath)).toMatchObject(resolveTestConfig)
  })

  test(
    'merge options should work correctly ' +
      '[{} <- defaults <- resolve.config.json <- cli] (mode=development)',
    async () => {
      const json = await exec(
        `resolve-scripts build --config=${resolveConfigPath} --start`
      )

      expect(json).toMatchObject({
        index: 'client/custom-index.js',
        viewModels: 'common/customViewModels',
        readModels: 'common/customReadModels',
        storage: {
          adapter: 'custom-storage'
        },
        bus: {
          adapter: 'custom-development-bus'
        },
        start: true
      })
    }
  )

  test(
    'merge options should work correctly ' +
      '[{} <- defaults <- resolve.config.json <- cli] (mode=production)',
    async () => {
      const json = await exec(
        `resolve-scripts build --config=${resolveConfigPath} --start --prod`
      )

      expect(json).toMatchObject({
        index: 'client/custom-index.js',
        viewModels: 'common/customViewModels',
        readModels: 'common/customReadModels',
        storage: {
          adapter: 'custom-storage'
        },
        bus: {
          adapter: 'custom-bus'
        },
        subscribe: {
          adapter: 'custom-subscribe-adapter'
        },
        start: true
      })
    }
  )
})
