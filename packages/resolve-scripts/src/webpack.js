import fs from 'fs'
import path from 'path'
import respawn from 'respawn'
import webpack from 'webpack'

import webpackClientConfig from './configs/webpack.client.config'
import webpackServerConfig from './configs/webpack.server.config'
import showBuildInfo from './show_build_info'
import getRespawnConfig from './get_respawn_config'
import createMockServer from './create_mock_server'
import pathResolve from './path_resolve'

export default options => {
  if (options.printConfig) {
    // eslint-disable-next-line
    console.log(JSON.stringify(options, null, 3))
    return
  }

  const serverIndexPath = path.resolve(__dirname, './server/index.js')
  const clientIndexPath = fs.existsSync(options.index)
    ? path.resolve(process.cwd(), options.index)
    : path.resolve(__dirname, './client/index.js')

  const clientDistDir = path.resolve(process.cwd(), options.distDir, 'client')
  const serverDistDir = path.resolve(process.cwd(), options.distDir, 'server')

  webpackClientConfig.entry = [clientIndexPath]
  webpackClientConfig.output.path = clientDistDir
  webpackClientConfig.mode = options.mode

  webpackServerConfig.entry = [serverIndexPath]
  webpackServerConfig.output.path = serverDistDir
  webpackServerConfig.mode = options.mode

  const definePlugin = new webpack.DefinePlugin({
    '$resolve.routes': JSON.stringify(pathResolve(options.routes)),
    '$resolve.redux.store': JSON.stringify(pathResolve(options.redux.store)),
    '$resolve.redux.reducers': JSON.stringify(
      pathResolve(options.redux.reducers)
    ),
    '$resolve.redux.middlewares': JSON.stringify(
      pathResolve(options.redux.middlewares)
    ),
    '$resolve.staticDir': JSON.stringify(pathResolve(options.staticDir)),
    '$resolve.distDir': JSON.stringify(pathResolve(options.distDir)),
    '$resolve.viewModels': JSON.stringify(pathResolve(options.viewModels)),
    '$resolve.readModels': JSON.stringify(pathResolve(options.readModels)),
    '$resolve.aggregates': JSON.stringify(pathResolve(options.aggregates)),
    '$resolve.subscribe.adapter': JSON.stringify(
      pathResolve(options.subscribe.adapter)
    ),
    '$resolve.rootPath': JSON.stringify(options.rootPath),
    '$resolve.staticPath': JSON.stringify(options.staticPath)
  })
  webpackClientConfig.plugins.push(definePlugin)
  webpackServerConfig.plugins.push(definePlugin)

  const compiler = webpack([webpackClientConfig, webpackServerConfig])

  const server = options.start
    ? respawn(
        getRespawnConfig(
          `${webpackServerConfig.output.path}/${
            webpackServerConfig.output.filename
          }`
        ),
        {
          maxRestarts: 0,
          kill: 5000,
          stdio: 'inherit'
        }
      )
    : createMockServer()

  process.on('exit', () => {
    server.stop()
  })

  if (options.watch) {
    const stdin = process.openStdin()
    stdin.addListener('data', data => {
      if (data.toString().indexOf('rs') !== -1) {
        server.stop(() => server.start())
      }
    })
    compiler.watch(
      {
        aggregateTimeout: 1000,
        poll: 1000
      },
      (err, { stats: [clientStats, serverStats] }) => {
        showBuildInfo(webpackClientConfig, err, clientStats)
        showBuildInfo(webpackServerConfig, err, serverStats)
        if (options.start) {
          if (
            (serverStats && serverStats.hasErrors()) ||
            (clientStats && clientStats.hasErrors())
          ) {
            server.stop()
          } else {
            if (server.status === 'running') {
              server.stop(() => server.start())
            } else {
              server.start()
            }
          }
        }
      }
    )
  } else {
    compiler.run((err, { stats: [clientStats, serverStats] }) => {
      showBuildInfo(webpackClientConfig, err, clientStats)
      showBuildInfo(webpackServerConfig, err, serverStats)
      if (options.start) {
        if (
          serverStats &&
          clientStats &&
          !serverStats.hasErrors() &&
          !clientStats.hasErrors()
        ) {
          server.start()
        }
      }
    })
  }
}
