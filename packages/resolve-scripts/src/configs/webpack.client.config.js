import webpack from 'webpack'
import path from 'path'
import babelConfig from '../constants/babelrc'
import getMonorepoNodeModules from '../get_monorepo_node_modules'

export default {
  name: 'Client',
  devtool: 'source-map',
  target: 'web',
  output: {
    filename: 'client.js',
    devtoolModuleFilenameTemplate: '[resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[resource-path]?[hash]'
  },
  resolve: {
    modules: [
      ...getMonorepoNodeModules(),
      path.resolve(process.cwd(), 'node_modules'),
      path.resolve(__dirname, '../../node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: babelConfig
          }
        ],
        exclude: [
          ...getMonorepoNodeModules(),
          path.resolve(process.cwd(), 'node_modules'),
          path.resolve(__dirname, '../../node_modules')
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      'process.env': 'window.__PROCESS_ENV__'
    })
  ]
}
