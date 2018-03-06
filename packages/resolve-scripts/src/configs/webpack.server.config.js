import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import babelConfig from './babelrc'
import modulesDirs from '../constants/modules_dirs'

export default {
  name: 'Server',
  devtool: 'source-map',
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  resolve: {
    modules: modulesDirs
  },
  output: {
    filename: 'server.js',
    devtoolModuleFilenameTemplate: '[resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[resource-path]?[hash]'
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
        exclude: modulesDirs
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
    })
  ],
  externals: modulesDirs.map(modulesDir => nodeExternals({ modulesDir }))
}
