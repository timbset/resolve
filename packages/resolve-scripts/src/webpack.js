import path from 'path'
import respawn from 'respawn'
import webpack from 'webpack'
import flat from 'flat'

import webpackClientConfig from './configs/webpack.client.config'
import webpackServerConfig from './configs/webpack.server.config'
import showBuildInfo from './utils/show_build_info'
import getRespawnConfig from './utils/get_respawn_config'
import getConfig from './utils/get_config'
import createMockServer from './utils/create_mock_server'
import resolveFileOrModule from './utils/resolve_file_or_module'
import resolveFile from './utils/resolve_file'

import { files, filesOrModules } from './configs/resolve.config'

export default options => {
  const config = getConfig(options, process.env)

  if (options.printConfig) {
    // eslint-disable-next-line
    console.log(JSON.stringify(config, null, 3))
    return
  }

  const flatConfig = flat(config)

  for (const key of files) {
    flatConfig[key] = resolveFile(flatConfig[key])
  }
  for (const key of filesOrModules) {
    flatConfig[key] = resolveFileOrModule(flatConfig[key])
  }

  const serverIndexPath = path.resolve(__dirname, './server/index.js')
  const clientIndexPath = flatConfig.index
  const serverDistDir = path.resolve(
    process.cwd(),
    flatConfig.distDir,
    'server'
  )
  const clientDistDir = path.resolve(
    process.cwd(),
    flatConfig.distDir,
    'client'
  )

  webpackClientConfig.entry = clientIndexPath
  webpackClientConfig.output.path = clientDistDir
  webpackClientConfig.mode = flatConfig.mode

  webpackServerConfig.entry = serverIndexPath
  webpackServerConfig.output.path = serverDistDir
  webpackServerConfig.mode = flatConfig.mode

  const defineObject = {}
  for (const key of Object.keys(flatConfig)) {
    defineObject[`$resolve.${key}`] = JSON.stringify(flatConfig[key])
  }
  const definePlugin = new webpack.DefinePlugin(defineObject)

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
