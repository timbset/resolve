import path from 'path'
import exec from './exec'
import getConfig from '../src/utils/get_config'
import validateСonfig from '../src/utils/validate_config'
import defaultСonfig from '../src/configs/resolve.config'

describe('validate schema', () => {
  it('empty', () => {
    expect(validateСonfig(defaultСonfig)).toBeTruthy()
  })

  it('custom storage adapter', () => {
    expect(
      validateСonfig({
        ...defaultСonfig,
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
        ...defaultСonfig,
        storage: {
          adapter: 'resolve-bus-rabbitmq'
        }
      })
    ).toBeTruthy()
  })

  it('custom subscribe adapter', () => {
    expect(
      validateСonfig({
        ...defaultСonfig,
        subscribe: {
          adapter: 'resolve-subscribe-mqtt'
        }
      })
    ).toBeTruthy()
  })

  it('custom root path', () => {
    expect(
      validateСonfig({
        ...defaultСonfig,
        rootPath: '/my-app'
      })
    ).toBeTruthy()
  })

  it('custom static path', () => {
    expect(
      validateСonfig({
        ...defaultСonfig,
        staticPath: 'https://my-cdn'
      })
    ).toBeTruthy()
  })

  it('custom routes path', () => {
    expect(
      validateСonfig({
        ...defaultСonfig,
        routes: 'src/client/entryPoint.js'
      })
    ).toBeTruthy()
  })

  it('custom index path', () => {
    expect(
      validateСonfig({
        ...defaultСonfig,
        index: 'src/client/index.js'
      })
    ).toBeTruthy()
  })

  it('custom aggregates dir', () => {
    expect(
      validateСonfig({
        ...defaultСonfig,
        aggregates: 'my-aggregates'
      })
    ).toBeTruthy()
  })

  it('custom view models dir', () => {
    expect(
      validateСonfig({
        ...defaultСonfig,
        viewModels: 'my-view-models'
      })
    ).toBeTruthy()
  })

  it('custom read models dir', () => {
    expect(
      validateСonfig({
        ...defaultСonfig,
        readModels: 'my-read-models'
      })
    ).toBeTruthy()
  })

  it('custom static dir', () => {
    expect(
      validateСonfig({
        ...defaultСonfig,
        staticDir: 'my-static-dir'
      })
    ).toBeTruthy()
  })

  it('custom auth', () => {
    expect(
      validateСonfig({
        ...defaultСonfig,
        auth: 'custom-auth/index.js'
      })
    ).toBeTruthy()
  })

  it('custom jwt', () => {
    expect(
      validateСonfig({
        ...defaultСonfig,
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
        ...defaultСonfig,
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
        ...defaultСonfig,
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
        ...defaultСonfig,
        storage: {
          adapter: 123
        }
      })
    ).toThrow()
  })

  it('incorrect subscribe adapter', () => {
    expect(() =>
      validateСonfig({
        ...defaultСonfig,
        subscribe: {
          adapter: 123
        }
      })
    ).toThrow()
  })

  it('incorrect root path', () => {
    expect(() =>
      validateСonfig({
        ...defaultСonfig,
        rootPath: 123
      })
    ).toThrow()
  })

  it('incorrect static path', () => {
    expect(() =>
      validateСonfig({
        ...defaultСonfig,
        staticPath: 123
      })
    ).toThrow()
  })

  it('incorrect routes path', () => {
    expect(() =>
      validateСonfig({
        ...defaultСonfig,
        routes: 123
      })
    ).toThrow()
  })

  it('incorrect aggregates dir', () => {
    expect(() =>
      validateСonfig({
        ...defaultСonfig,
        aggregates: 123
      })
    ).toThrow()
  })

  it('incorrect view models dir', () => {
    expect(() =>
      validateСonfig({
        ...defaultСonfig,
        viewModels: 123
      })
    ).toThrow()
  })

  it('incorrect read models dir', () => {
    expect(() =>
      validateСonfig({
        ...defaultСonfig,
        readModels: 123
      })
    ).toThrow()
  })

  it('incorrect static dir', () => {
    expect(() =>
      validateСonfig({
        ...defaultСonfig,
        staticDir: 123
      })
    ).toThrow()
  })

  it('incorrect auth', () => {
    expect(() =>
      validateСonfig({
        ...defaultСonfig,
        auth: 123
      })
    ).toThrow()
  })

  it('incorrect jwt', () => {
    expect(() =>
      validateСonfig({
        ...defaultСonfig,
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

describe('resolve-scripts build --config=resolve.test.config.json', () => {
  const resolveConfigPath = path.resolve(__dirname, 'resolve.test.config.json')
  const { env, config } = require(resolveConfigPath)

  test('getConfig("resolve-test-config.json") should works correctly', () => {
    expect(getConfig({ config: resolveConfigPath }, {})).toMatchObject({
      ...config,
      ...env.development
    })
  })

  test('getConfig() should return default config', () => {
    expect(getConfig({}, {})).toMatchSnapshot()
  })

  test(
    'merge options should work correctly ' +
      '[{} <- defaults <- resolve.config.json <- cli] (mode=development)',
    async () => {
      const json = await exec(
        `resolve-scripts build --config=${resolveConfigPath} --start`
      )

      expect(json).toMatchObject({
        ...config,
        ...env.development
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
        ...config,
        ...env.production
      })
    }
  )
})
