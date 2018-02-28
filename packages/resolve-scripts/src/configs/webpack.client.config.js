import webpack from 'webpack'
import path from 'path'
import babelConfig from '../../../../.babelrc'

export default {
  name: 'client',
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
          path.join(__dirname, '../../node_modules'),
          path.join(process.cwd(), 'node_modules')
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      'process.env': 'window.__PROCESS_ENV__'
    })
  ],
  performance: {
    hints: false
  }
}
