import webpack from 'webpack'
import path from 'path'
import babelConfig from '../constants/babelrc'

export default {
  name: 'Client',
  devtool: 'source-map',
  target: 'web',
  output: {
    filename: 'client.js',
    devtoolModuleFilenameTemplate: '[resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[resource-path]?[hash]'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: babelConfig
          }
        ],
        exclude: [
          path.resolve(__dirname, '../../node_modules'),
          path.resolve(process.cwd(), 'node_modules')
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
