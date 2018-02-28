import fs from 'fs'
import path from 'path'
import respawn from 'respawn'
import webpack from 'webpack'

import webpackClientConfig from '../configs/webpack.client.config'
import webpackServerConfig from '../configs/webpack.server.config'
import showBuildInfo from './show_build_info'
import getRespawnConfig from './get_respawn_config'

export default options => {
  const serverIndexPath = path.resolve(__dirname, '../server/index.js')
  const clientIndexPath = fs.existsSync(options.index)
    ? path.resolve(options.index)
    : path.resolve(__dirname, '../client/index.js')

  webpackServerConfig.entry = serverIndexPath
  webpackClientConfig.entry = clientIndexPath

  const compiler = webpack([webpackClientConfig, webpackServerConfig])

  const server =
    options.start &&
    respawn(getRespawnConfig(/* TODO */), {
      maxRestarts: 0,
      kill: 5000,
      stdio: 'inherit'
    })

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
        aggregateTimeout: 300,
        poll: 1000
      },
      (err, { stats: [clientStats, serverStats] }) => {
        if (options.run) {
          if (serverStats.hasErrors() || clientStats.hasErrors()) {
            server.stop()
          } else {
            if (server) {
              server.stop(() => server.start())
            } else {
              server.start()
            }
          }
        }
        showBuildInfo(webpackClientConfig.name, err, clientStats)
        showBuildInfo(webpackServerConfig.name, err, serverStats)
      }
    )
  } else {
    compiler.run((err, { stats: [clientStats, serverStats] }) => {
      if (options.run) {
        if (!serverStats.hasErrors() && !clientStats.hasErrors()) {
          server.start()
        }
      }
      showBuildInfo(webpackClientConfig.name, err, clientStats)
      showBuildInfo(webpackServerConfig.name, err, serverStats)
    })
  }
}
