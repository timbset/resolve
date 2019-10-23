import {
  defaultResolveConfig,
  build,
  start,
  watch,
  runTestcafe,
  merge,
  stop,
  reset,
  importEventStore,
  exportEventStore
} from 'resolve-scripts'

// import resolveModuleComments from 'resolve-module-comments';
import resolveModuleAuth from 'resolve-module-auth';
import path from 'path'
import fs from 'fs-extra'

import appConfig from './config.app'
import cloudConfig from './config.cloud'
import devConfig from './config.dev'
import prodConfig from './config.prod'
import testFunctionalConfig from './config.test_functional'

const launchMode = process.argv[2]

void (async () => {
  try {
    // const moduleComments = resolveModuleComments({
    //   aggregateName: 'Comment',
    //   readModelName: 'Comments',
    //   readModelConnectorName: 'comments',
    //   reducerName: 'comments'
    // })

    const moduleAuth = resolveModuleAuth([
      {
        name: 'local-strategy',
        createStrategy: 'auth/create_strategy.js',
        logoutRoute: {
          path: 'logout',
          method: 'POST'
        },
        routes: [
          {
            path: 'register',
            method: 'POST',
            callback: 'auth/route_register_callback.js'
          },
          {
            path: 'login',
            method: 'POST',
            callback: 'auth/route_login_callback.js'
          }
        ]
      }
    ])

    const baseConfig = merge(
      defaultResolveConfig,
      appConfig,
      // moduleComments,
      moduleAuth
    )

    switch (launchMode) {
      case 'dev': {
        const resolveConfig = merge(baseConfig, devConfig)

        // await reset(resolveConfig, {
        //   dropEventStore: false,
        //   dropSnapshots: true,
        //   dropReadModels: true,
        //   dropSagas: true
        // })

        await watch(resolveConfig)
        break
      }

      case 'build': {
        await build(merge(baseConfig, prodConfig))

        await fs.copy(
          path.join(__dirname, 'static/_next'),
          path.join(__dirname, 'dist/common/local-entry/static/_next')
        )

        break
      }

      case 'cloud': {
        await build(merge(baseConfig, cloudConfig))

        await fs.copy(
          path.join(__dirname, 'static/_next'),
          path.join(__dirname, 'dist/common/cloud-entry/static/_next')
        )

        break
      }

      case 'start': {
        await start(merge(baseConfig, prodConfig))
        break
      }

      case 'import-event-store': {
        const resolveConfig = merge(baseConfig, devConfig)

        const importFile = process.argv[3]

        await importEventStore(resolveConfig, { importFile })
        break
      }

      case 'export-event-store': {
        const resolveConfig = merge(baseConfig, devConfig)

        const exportFile = process.argv[3]

        await exportEventStore(resolveConfig, { exportFile })
        break
      }

      case 'test:functional': {
        const resolveConfig = merge(
          defaultResolveConfig,
          appConfig,
          testFunctionalConfig
        )

        await reset(resolveConfig, {
          dropEventStore: true,
          dropSnapshots: true,
          dropReadModels: true,
          dropSagas: true
        })

        await runTestcafe({
          resolveConfig,
          functionalTestsDir: 'test/functional',
          browser: process.argv[3]
        })
        break
      }

      default: {
        throw new Error('Unknown option')
      }
    }
    await stop()
  } catch (error) {
    await stop(error)
  }
})()
